/** Structural gates and blind model agreement are not expert or official exam review. */
import 'dotenv/config';
import { writeFileSync, mkdirSync, renameSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import type { DomainId, Question, QuestionType, Difficulty } from '../src/types';
import { AAIG_DOMAINS } from '../src/data/domains';
import { GENERATED_QUESTIONS } from '../src/data/generatedQuestions';
import { INITIAL_QUESTIONS } from '../src/data/questions';
import { isQuestion, passesLengthGate, parseGeneratedJson } from '../src/services/contentValidation';
import { draftSource } from '../src/services/questionOrder';

const QTYPES: QuestionType[] = ['BEST', 'FIRST', 'MOST', 'PRIMARY', 'LEAST'];
const DIFFS: Difficulty[] = ['Intermediate', 'Director-Level'];
const DOMAINS = Object.keys(AAIG_DOMAINS) as DomainId[];
export interface GenerationSlot { domain: DomainId; subDomain: string; qtype: QuestionType; diff: Difficulty; targetPos: number }

function shuffled<T>(items: T[], rng: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function balancedPool<T>(count: number, values: T[], rng: () => number): T[] {
  const pool: T[] = [];
  while (pool.length < count) pool.push(...shuffled(values, rng));
  return pool.slice(0, count);
}

export function buildGenerationPlan(count: number, rng = Math.random): GenerationSlot[] {
  if (!Number.isInteger(count) || count < 1 || count > 10_000) throw new Error('GEN_COUNT must be an integer between 1 and 10000');
  // App-defined study allocations, not official exam weights.
  const allocations = DOMAINS.map(domain => {
    const exact = count * AAIG_DOMAINS[domain].weight / 100;
    return { domain, count: Math.floor(exact), remainder: exact % 1 };
  });
  let remaining = count - allocations.reduce((sum, item) => sum + item.count, 0);
  for (const item of [...allocations].sort((a, b) => b.remainder - a.remainder)) if (remaining-- > 0) item.count++;
  const plan: GenerationSlot[] = [];
  for (const allocation of allocations) {
    const subjects = balancedPool(allocation.count, AAIG_DOMAINS[allocation.domain].subDomains, rng);
    for (const subDomain of AAIG_DOMAINS[allocation.domain].subDomains) {
      const total = subjects.filter(subject => subject === subDomain).length;
      // Separate bags prevent topic, type, difficulty and position sharing an index cycle.
      const types = balancedPool(total, QTYPES, rng);
      const difficulties = balancedPool(total, DIFFS, rng);
      const positions = balancedPool(total, [0, 1, 2, 3], rng);
      for (let i = 0; i < total; i++) plan.push({ domain: allocation.domain, subDomain, qtype: types[i], diff: difficulties[i], targetPos: positions[i] });
    }
  }
  return shuffled(plan, rng);
}

export function normalizeQuestionStem(text: string): string {
  return text.normalize('NFKC').toLowerCase().replace(/[\p{P}\p{S}]/gu, ' ').replace(/\s+/g, ' ').trim();
}
export function mergeQuestionBank(existing: Question[], candidates: Question[]): Question[] {
  const ids = new Set(existing.map(q => q.id));
  const stems = new Set(existing.map(q => normalizeQuestionStem(q.questionText)));
  const merged = [...existing];
  for (const question of candidates) {
    const stem = normalizeQuestionStem(question.questionText);
    if (ids.has(question.id) || stems.has(stem)) continue;
    merged.push(question); ids.add(question.id); stems.add(stem);
  }
  return merged;
}

export function validateCandidateQuestion(value: unknown, targetPos: number, minimumOptionLength = 25): string[] {
  if (!isQuestion(value)) return ['schema: four options, valid index and complete fields are required'];
  const errors: string[] = [];
  if (!value.scenarioText?.trim()) errors.push('scenarioText is required');
  if (value.correctIndex !== targetPos) errors.push('correctIndex must match planned position');
  if (new Set(value.options.map(normalizeQuestionStem)).size !== 4) errors.push('duplicate options');
  if (value.options.some(option => option.trim().length < minimumOptionLength)) errors.push('option below minimum length');
  if (!passesLengthGate(value)) errors.push('length parity must be within [0.75, 1.45]');
  const correctLength = value.options[value.correctIndex].trim().length;
  if (value.options.filter((_, i) => i !== value.correctIndex).every(option => option.trim().length < correctLength)) errors.push('correct answer cannot be uniquely longest');
  if (value.distractorExplanations?.length !== 3) errors.push('three distractor explanations required');
  if (!Array.isArray(value.distractorAxes) || value.distractorAxes.length !== 3 || value.distractorAxes.some(axis => typeof axis !== 'string' || !axis.trim()) ||
      new Set(value.distractorAxes.map(axis => axis.trim().toLowerCase())).size !== 3) errors.push('three distinct distractorAxes required');
  if (/ISACA/i.test(value.source)) errors.push('source must not claim unverified ISACA material');
  return errors;
}

function authorPrompt(slot: GenerationSlot, minimum: number): string {
  return `Draft one original English AI governance study question; you are not an official exam author.
Learning category: ${slot.domain} - ${AAIG_DOMAINS[slot.domain].name}; topic: ${slot.subDomain}.
Question type: ${slot.qtype}; difficulty: ${slot.diff}; correct option index: ${slot.targetPos} (zero-based).
Use a concrete scenario and plausible competing actions. Explain authority, risk and timing; do not assume policy always precedes urgent containment.
Cite relevant public framework titles (NIST AI RMF, ISO/IEC 42001, EU AI Act). Include a locator only if known; never invent ISACA manual citations or official endorsement.
Return strict JSON: scenarioText, questionText, four options, correctIndex, questionType, difficulty, explanation, three distractorExplanations in ascending incorrect-option order, three corresponding distinct distractorAxes, source.
Each option must have at least ${minimum} characters. Correct length / mean distractor length must be in [0.75,1.45]; one distractor must be at least as long as the correct option.
Name distinct misconception axes such as priority, timing and authority. No markdown fences.`;
}
function graderPrompt(question: Question): string {
  return `Solve this original AI governance study question from its facts. Respect ${question.questionType}, including LEAST. This is a consistency check, not expert review.
${question.scenarioText}\n${question.questionText}\n${question.options.map((option, i) => `${'ABCD'[i]}. ${option}`).join('\n')}
Return ANSWER: <0|1|2|3> followed by a short rationale.`;
}
async function callGemini(prompt: string, apiKey: string, model: string, json = false): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 4000, ...(json ? { responseMimeType: 'application/json' } : {}) } }),
  });
  if (!response.ok) throw new Error(`Gemini API status ${response.status}; check model access, quota and key restrictions`);
  const data = await response.json(); const candidate = data?.candidates?.[0];
  if (candidate?.finishReason !== 'STOP') throw new Error('Gemini response incomplete or blocked');
  const text = candidate.content?.parts?.filter((part: { thought?: boolean }) => !part.thought)
    .map((part: { text?: string }) => part.text || '').join('\n').trim();
  if (!text) throw new Error('Gemini response contains no text');
  return text;
}
function saveGenerated(items: Question[]): void {
  const file = 'src/data/generatedQuestions.ts';
  const content = `import { Question } from '../types';\nimport { markQuestionUnreviewed } from '../services/questionOrder';\n\nconst GENERATED_QUESTION_DRAFTS: Question[] = ${JSON.stringify(items, null, 2)};\n\nexport const GENERATED_QUESTIONS = GENERATED_QUESTION_DRAFTS.map(markQuestionUnreviewed);\n`;
  writeFileSync(`${file}.tmp`, content); renameSync(`${file}.tmp`, file);
}

export async function runPipeline(): Promise<void> {
  const count = Number(process.env.GEN_COUNT || 10), concurrency = Number(process.env.GEN_CONCURRENCY || 5);
  const minimum = Number(process.env.GEN_MIN_OPT_LEN || 25), plan = buildGenerationPlan(count);
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 20) throw new Error('GEN_CONCURRENCY must be between 1 and 20');
  if (!Number.isInteger(minimum) || minimum < 1) throw new Error('GEN_MIN_OPT_LEN must be a positive integer');
  if (process.env.GEN_DRY_RUN === '1') {
    console.log(JSON.stringify({ dryRun: true, note: 'Plan only: no API calls or writes; app-defined study weights', plan }, null, 2)); return;
  }
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '', model = process.env.GEN_MODEL || 'gemini-3.8-flash';
  if (!apiKey) throw new Error('Missing API key; GEN_DRY_RUN=1 inspects the plan without a key');
  const write = process.env.GEN_WRITE === '1';
  const accepted: Question[] = [], rejected: { slot: GenerationSlot; reason: string }[] = [];
  const stems = new Set(INITIAL_QUESTIONS.map(q => normalizeQuestionStem(q.questionText)));
  console.log(`Drafting ${count} items; model agreement is not SME review. Bank writes ${write ? 'enabled' : 'disabled'}.`);
  for (let start = 0; start < plan.length; start += concurrency) {
    const results = await Promise.all(plan.slice(start, start + concurrency).map(async slot => {
      try {
        const raw = parseGeneratedJson(await callGemini(authorPrompt(slot, minimum), apiKey, model, true));
        const question = { ...raw, id: `aaig-pipe-${randomUUID()}`, domainId: slot.domain, subDomain: slot.subDomain,
          reviewStatus: 'unreviewed', source: typeof raw.source === 'string' ? draftSource(raw.source) : raw.source };
        const errors = validateCandidateQuestion(question, slot.targetPos, minimum);
        if (raw.questionType !== slot.qtype || raw.difficulty !== slot.diff) errors.push('planned type/difficulty mismatch');
        if (errors.length) throw new Error(errors.join('; '));
        const candidate = question as Question;
        if (stems.has(normalizeQuestionStem(candidate.questionText))) throw new Error('duplicate question stem');
        const match = (await callGemini(graderPrompt(candidate), apiKey, model)).match(/^ANSWER:\s*([0-3])\b/i);
        if (!match || Number(match[1]) !== candidate.correctIndex) throw new Error('blind model check disagreed or output was invalid');
        return { slot, candidate };
      } catch (error) { return { slot, reason: error instanceof Error ? error.message : 'drafting failed' }; }
    }));
    for (const result of results) {
      if ('candidate' in result && result.candidate) {
        const stem = normalizeQuestionStem(result.candidate.questionText);
        if (stems.has(stem)) rejected.push({ slot: result.slot, reason: 'duplicate question stem in batch' });
        else { stems.add(stem); accepted.push(result.candidate); }
      } else rejected.push({ slot: result.slot, reason: result.reason || 'drafting failed' });
    }
    if (write && accepted.length) saveGenerated(mergeQuestionBank(GENERATED_QUESTIONS, accepted));
    console.log(`Processed ${Math.min(start + concurrency, count)}/${count}; ${accepted.length} structurally accepted drafts, ${rejected.length} rejected.`);
  }
  mkdirSync('reports', { recursive: true });
  writeFileSync('reports/gen-questions.json', JSON.stringify({ note: 'Unreviewed drafts; model agreement does not verify standards or exam accuracy', planned: plan, accepted, rejected }, null, 2));
  if (!accepted.length) throw new Error('No drafts accepted; inspect reports/gen-questions.json');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runPipeline().catch(error => { console.error(error.message); process.exitCode = 1; });
}
