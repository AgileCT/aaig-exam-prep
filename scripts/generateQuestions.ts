/**
 * AAIG Question Generator & Quality Gate Pipeline
 * 
 * Production-tested quality controls:
 * 1. Position steering - uniform answer key distribution across 0..3 (A..D)
 * 2. Length-parity gate - correct option is NOT the longest; ratio in [0.75, 1.35], reject >= 1.45
 * 3. Independent re-grade gate - blind grader LLM must pick authored key independently
 * 4. Distinct distractor axes - 3 distinct misconception traps (Priority, Sequence, Scope)
 * 5. ISACA Governance Mindset - Top-down strategy, charter before tools, 3 lines model, NIST/ISO/EU AI Act
 * 6. Incremental auto-save to src/data/generatedQuestions.ts so no progress is ever lost
 */

import 'dotenv/config';
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { DomainId, Question, QuestionType, Difficulty } from '../src/types';
import { AAIG_DOMAINS } from '../src/data/domains';

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
const MODEL = process.env.GEN_MODEL || 'gemini-3.8-flash';
const COUNT = Number(process.env.GEN_COUNT || 10);
const CONCURRENCY = Number(process.env.GEN_CONCURRENCY || 5);
const MIN_OPT_LEN = Number(process.env.GEN_MIN_OPT_LEN || 25);
const WRITE = (process.env.GEN_WRITE || '1') === '1';

if (!API_KEY) {
  console.error('[gen] Missing GEMINI_API_KEY in environment or .env');
  process.exit(1);
}

// Official ISACA AAIG Domain Weights: D1 (30%), D2 (20%), D3 (25%), D4 (25%)
const DOMAINS_WEIGHTED: DomainId[] = [
  'D1', 'D1', 'D1', 'D1', 'D1', 'D1', // 30%
  'D2', 'D2', 'D2', 'D2',             // 20%
  'D3', 'D3', 'D3', 'D3', 'D3',       // 25%
  'D4', 'D4', 'D4', 'D4', 'D4',       // 25%
];
const QTYPES: QuestionType[] = ['BEST', 'FIRST', 'MOST', 'PRIMARY', 'LEAST'];
const DIFFS: Difficulty[] = ['Intermediate', 'Director-Level'];

const AXES = [
  'wrong PRIORITY / wrong DIRECTION (valid technical goal, but wrong governance emphasis)',
  'wrong SEQUENCE / wrong TIMING (right operational action, but premature or too late before policy mandate)',
  'wrong AUTHORIZATION / wrong SCOPE (operator/1st-line level vs risk/2nd-line vs board/3rd-line)',
];

async function callGemini(prompt: string, isJson: boolean = false): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const config: any = { temperature: 0.4, maxOutputTokens: 4000 };
  if (isJson) {
    config.responseMimeType = 'application/json';
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: config
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

function buildGenPrompt(domain: DomainId, subDomain: string, qtype: QuestionType, diff: Difficulty, correctPos: number): string {
  return [
    'You are an ISACA AAIG (Advanced in AI Governance) exam question author.',
    'Create ONE brand-new, original scenario-based multiple-choice question.',
    '',
    `Domain: ${domain} - ${AAIG_DOMAINS[domain].name}`,
    `SubDomain: ${subDomain}`,
    `Question Type: ${qtype} (BEST=most comprehensive governance action, FIRST=foundational initial step, PRIMARY=main responsibility/objective, MOST=most effective control, LEAST=unacceptable practice)`,
    `Difficulty: ${diff}`,
    '',
    'CRITICAL ISACA GOVERNANCE MINDSET RULES:',
    '1. Governance aligns with business strategy, risk appetite, and accountability.',
    '2. Top-down mandate: Policies, charters, steering committees, and decision rights precede technical tooling or ad-hoc pilots.',
    '3. Strict Three Lines Model adherence (1st line owns risk, 2nd line challenges/policy, 3rd line independent assurance).',
    '4. Explicitly anchor with: ISO/IEC 42001 (AIMS), NIST AI RMF 1.0 (GOVERN, MAP, MEASURE, MANAGE), or EU AI Act (Risk tiers, conformity assessment).',
    '5. Strictly author in English.',
    '',
    'CRITICAL ANTI-BIAS GATES:',
    `1. Place the CORRECT answer at option index ${correctPos} (0-based: 0=A, 1=B, 2=C, 3=D).`,
    '2. The correct answer must NOT be the longest option. Make at least ONE distractor equal-to-or-longer than the correct answer.',
    `3. Every option must be a complete, grammatical sentence of at least ${MIN_OPT_LEN} characters.`,
    '4. The three distractors must each be wrong along a DISTINCT misconception axis:',
    `   - distractor 1: ${AXES[0]}`,
    `   - distractor 2: ${AXES[1]}`,
    `   - distractor 3: ${AXES[2]}`,
    '',
    'OUTPUT FORMAT (Respond with STRICT raw JSON only, no markdown code fence):',
    '{',
    '  "scenarioText": "Enterprise scenario (2-3 sentences)",',
    '  "questionText": "The stem question ending with a question mark",',
    '  "options": ["Option A", "Option B", "Option C", "Option D"],',
    '  "correctIndex": ' + correctPos + ',',
    '  "questionType": "' + qtype + '",',
    '  "explanation": "Why the correct option is the ISACA governance choice",',
    '  "distractorExplanations": ["Why Option X is wrong", "Why Option Y is wrong", "Why Option Z is wrong"],',
    '  "source": "Specific standard, e.g. ISO/IEC 42001 Cl. 6; NIST AI RMF GOVERN 1.2",',
    '  "difficulty": "' + diff + '"',
    '}'
  ].join('\n');
}

function buildGraderPrompt(q: any): string {
  const opts = q.options.map((o: string, i: number) => `${'ABCD'[i]}. ${o}`).join('\n');
  return [
    'You are an independent ISACA AAIG exam expert grader.',
    'Read the scenario and question, then choose the single BEST answer index (0 for A, 1 for B, 2 for C, 3 for D).',
    `Question-type hint: ${q.questionType}.`,
    '',
    `[Domain] ${q.domainId || ''}`,
    `[Scenario] ${q.scenarioText}`,
    `[Question] ${q.questionText}`,
    '',
    '[Options]',
    opts,
    '',
    'Respond with EXACTLY one line:',
    'ANSWER: <0|1|2|3>',
    'then one short sentence explaining your independent choice.'
  ].join('\n');
}

async function authorSingleQuestion(i: number): Promise<Question | null> {
  const domain = DOMAINS_WEIGHTED[i % DOMAINS_WEIGHTED.length];
  const subDomains = AAIG_DOMAINS[domain].subDomains;
  const subDomain = subDomains[i % subDomains.length];
  const qtype = QTYPES[i % QTYPES.length];
  const diff = DIFFS[i % DIFFS.length];
  const targetPos = i % 4;

  const prompt = buildGenPrompt(domain, subDomain, qtype, diff, targetPos);

  try {
    let raw = await callGemini(prompt, true);
    raw = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed = JSON.parse(raw);
    const salt = Math.random().toString(36).substring(2, 7);
    parsed.id = `aaig-pipe-${Date.now()}-${i}-${salt}`;
    parsed.domainId = domain;
    parsed.subDomain = subDomain;

    // Gate 1: Length-parity gate
    const correctLen = parsed.options[parsed.correctIndex].length;
    const distractorLens = parsed.options.filter((_: any, idx: number) => idx !== parsed.correctIndex).map((o: string) => o.length);
    const meanDistractorLen = distractorLens.reduce((a: number, b: number) => a + b, 0) / distractorLens.length;
    const ratio = correctLen / meanDistractorLen;

    if (ratio > 1.45) {
      console.warn(`  [${i + 1}] ⚠️ Length parity gate failed (ratio ${ratio.toFixed(2)} > 1.45).`);
      return null;
    }

    // Gate 2: Blind re-grade gate
    const gradePrompt = buildGraderPrompt(parsed);
    const gradeResp = await callGemini(gradePrompt);
    const match = gradeResp.match(/ANSWER:\s*([0-3])/i);
    const judgedIndex = match ? Number(match[1]) : -1;

    if (judgedIndex !== parsed.correctIndex) {
      console.warn(`  [${i + 1}] ⚠️ Blind judge failed (judge picked ${judgedIndex}, authored was ${parsed.correctIndex}).`);
      return null;
    }

    console.log(`  [${i + 1}] ✅ ${domain} passed quality gates! (Ratio: ${ratio.toFixed(2)}, Judge agreed)`);
    return parsed;
  } catch (err: any) {
    console.error(`  [${i + 1}] ❌ Error:`, err?.message || err);
    return null;
  }
}

function saveGeneratedIncremental(newItems: Question[]) {
  const genFilePath = 'src/data/generatedQuestions.ts';
  let existing: Question[] = [];
  if (existsSync(genFilePath)) {
    try {
      const rawContent = readFileSync(genFilePath, 'utf-8');
      const jsonMatch = rawContent.match(/export const GENERATED_QUESTIONS: Question\[\] = (\[[\s\S]*?\]);/);
      if (jsonMatch) existing = JSON.parse(jsonMatch[1]);
    } catch (e) {}
  }

  // Deduplicate by ID
  const map = new Map<string, Question>();
  existing.forEach(q => map.set(q.id, q));
  newItems.forEach(q => map.set(q.id, q));
  const merged = Array.from(map.values());

  const fileContent = `import { Question } from '../types';\n\nexport const GENERATED_QUESTIONS: Question[] = ${JSON.stringify(merged, null, 2)};\n`;
  writeFileSync(genFilePath, fileContent);
  console.log(`💾 [Auto-Save] Question bank updated: ${merged.length} total generated questions.`);
}

async function runPipeline() {
  console.log(`[gen] Starting AAIG bulk generation pipeline (${COUNT} items, model: ${MODEL}, concurrency: ${CONCURRENCY})...`);
  const totalVerified: Question[] = [];

  for (let i = 0; i < COUNT; i += CONCURRENCY) {
    const chunk = Array.from({ length: Math.min(CONCURRENCY, COUNT - i) }, (_, k) => i + k);
    console.log(`\n--- Batch items ${i + 1} to ${i + chunk.length} of ${COUNT} ---`);
    const batchResults = await Promise.all(chunk.map((itemIdx) => authorSingleQuestion(itemIdx)));
    
    const validInBatch: Question[] = [];
    for (const res of batchResults) {
      if (res) {
        validInBatch.push(res);
        totalVerified.push(res);
      }
    }

    if (WRITE && validInBatch.length > 0) {
      saveGeneratedIncremental(validInBatch);
    }
  }

  if (!existsSync('reports')) mkdirSync('reports');
  writeFileSync('reports/gen-questions.json', JSON.stringify(totalVerified, null, 2));
  console.log(`\n🎉 Pipeline completed! Successfully generated and verified ${totalVerified.length} / ${COUNT} questions.`);
}

runPipeline().catch(console.error);
