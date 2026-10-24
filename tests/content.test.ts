import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_QUESTIONS } from '../src/data/questions';
import { GENERATED_QUESTIONS } from '../src/data/generatedQuestions';
import { INITIAL_FLASHCARDS as FLASHCARDS } from '../src/data/flashcards';
import { SUPPLEMENTAL_QUESTIONS } from '../src/data/supplementalQuestions';
import { passesLengthGate } from '../src/services/contentValidation';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { markQuestionUnreviewed, shuffleQuestionOptions } from '../src/services/questionOrder';

async function generationModule() {
  return import('../scripts/generateQuestions');
}

test('importing generation code does not contact an AI provider', async () => {
  const previous = globalThis.fetch;
  let requests = 0;
  globalThis.fetch = async () => { requests++; throw new Error('Network blocked in test'); };
  try { await generationModule(); assert.equal(requests, 0); }
  finally { globalThis.fetch = previous; }
});

test('retained questions are unreviewed and do not claim ISACA manual provenance', () => {
  assert.equal(INITIAL_QUESTIONS.length, 359);
  assert.ok(INITIAL_QUESTIONS.every(q => q.reviewStatus === 'unreviewed'));
  assert.ok(INITIAL_QUESTIONS.every(q => !/ISACA/i.test(q.source)));
  assert.ok(FLASHCARDS.every(q => q.reviewStatus === 'unreviewed' && !/ISACA/i.test(q.source)));
});

test('retained canonical indices stay compatible with historical attempts', () => {
  assert.equal(INITIAL_QUESTIONS[0].correctIndex, 1);
  assert.equal(GENERATED_QUESTIONS[0].correctIndex, 0);
  assert.match(INITIAL_QUESTIONS[0].options[1], /AI Governance Steering Committee/);
  assert.ok(INITIAL_QUESTIONS.every(q => q.distractorExplanations?.length === 3));
});

test('flashcards distinguish serious incident deadlines and human review latency', () => {
  const incident = FLASHCARDS.find(q => q.id === 'fc-38')!;
  assert.match(incident.back, /2.*days/);
  assert.match(incident.back, /10.*days/);
  assert.match(incident.back, /15.*days/);
  assert.doesNotMatch(FLASHCARDS.find(q => q.id === 'fc-25')!.back, /lowest latency/);
});

test('shuffle preserves scoring and remaps explanatory option labels without mutation', async () => {
  const module = await import('../src/services/questionOrder').catch(() => null);
  assert.ok(module, 'questionOrder module must exist');
  const original = { ...INITIAL_QUESTIONS[0], options: ['one', 'two', 'three', 'four'], correctIndex: 1,
    distractorExplanations: ['A: one is wrong', 'C: three is wrong', 'D: four is wrong'] };
  const shuffled = module.shuffleQuestionOptions(original, () => 0);
  assert.deepEqual(original.options, ['one', 'two', 'three', 'four']);
  assert.deepEqual(shuffled.options, ['two', 'three', 'four', 'one']);
  assert.equal(shuffled.correctIndex, 0);
  assert.deepEqual(shuffled.distractorExplanations, ['B: three is wrong', 'C: four is wrong', 'D: one is wrong']);
  assert.equal(shuffled.id, original.id);
});

test('generation plans cover all domains and rotate every subdomain independently', async () => {
  const { buildGenerationPlan } = await generationModule();
  const small = buildGenerationPlan(10, () => 0.5);
  assert.equal(small.length, 10);
  assert.equal(new Set(small.map(q => q.domain)).size, 3);
  const plan = buildGenerationPlan(100, () => 0.5);
  assert.deepEqual(['D1', 'D2', 'D3'].map(d => plan.filter(q => q.domain === d).length), [34, 33, 33]);
  assert.equal(new Set(plan.map(q => q.subDomain)).size, 20);
  for (const topic of new Set(plan.map(q => q.subDomain))) {
    assert.ok(new Set(plan.filter(q => q.subDomain === topic).map(q => q.qtype)).size > 1);
  }
});

test('candidate gates reject both parity bounds, missing axes and duplicate options', async () => {
  const { validateCandidateQuestion } = await generationModule();
  const candidate = { ...INITIAL_QUESTIONS[0], correctIndex: 0,
    options: ['a'.repeat(60), 'b'.repeat(61), 'c'.repeat(62), 'd'.repeat(63)],
    distractorAxes: ['priority', 'timing', 'authority'] };
  assert.deepEqual(validateCandidateQuestion(candidate, 0), []);
  assert.ok(validateCandidateQuestion({ ...candidate, options: ['a'.repeat(25), ...candidate.options.slice(1)] }, 0).some(e => e.includes('parity')));
  assert.ok(validateCandidateQuestion({ ...candidate, options: ['a'.repeat(100), ...candidate.options.slice(1)] }, 0).some(e => e.includes('parity')));
  assert.ok(validateCandidateQuestion({ ...candidate, distractorAxes: undefined }, 0).length);
  assert.ok(validateCandidateQuestion({ ...candidate, options: ['a'.repeat(60), 'a'.repeat(60), 'c'.repeat(62), 'd'.repeat(63)] }, 0).length);
  assert.ok(validateCandidateQuestion(candidate, 1).length);
});

test('source cleanup preserves question identity, canonical options and answer', () => {
  const original = { ...INITIAL_QUESTIONS[0], source: 'ISACA AAIG Review Manual D1; NIST AI RMF GOVERN 1.1' };
  const clean = markQuestionUnreviewed(original);
  assert.equal(clean.id, original.id);
  assert.deepEqual(clean.options, original.options);
  assert.equal(clean.correctIndex, original.correctIndex);
  assert.equal(clean.source, 'NIST AI RMF GOVERN 1.1');
  assert.match(original.source, /ISACA/);
});

test('question stem deduplication blocks new random IDs and within-batch repeats', async () => {
  const { mergeQuestionBank } = await generationModule();
  const original = INITIAL_QUESTIONS[0];
  const duplicate = { ...original, id: 'different-id', questionText: `  ${original.questionText.toUpperCase().replace(/\?$/, ' !')}  ` };
  const fresh = { ...original, id: 'fresh-id', questionText: 'How should a genuinely different scenario be handled?' };
  const merged = mergeQuestionBank([original], [duplicate, fresh, { ...fresh, id: 'another-random-id' }]);
  assert.deepEqual(merged.map(q => q.id), [original.id, 'fresh-id']);
});

test('shuffling remains score-consistent across all bank questions', () => {
  for (const question of INITIAL_QUESTIONS) {
    const shuffled = shuffleQuestionOptions(question, () => 0.25);
    assert.equal(shuffled.options[shuffled.correctIndex], question.options[question.correctIndex]);
    assert.equal(shuffled.options.length, 4);
    assert.equal(shuffled.distractorExplanations?.length, 3);
  }
});

test('offline audit fails structural corruption but retains unreviewed concentration warnings', async () => {
  const module = await import('../scripts/auditQuestions').catch(() => null);
  assert.ok(module, 'offline audit module must exist');
  const valid = module.auditQuestionBank(INITIAL_QUESTIONS, FLASHCARDS);
  assert.deepEqual(valid.errors, []);
  assert.equal(valid.unreviewedQuestions, 359);
  assert.ok(module.auditQuestionBank([INITIAL_QUESTIONS[0], INITIAL_QUESTIONS[0]], []).errors.some((error: string) => error.includes('duplicate')));
  assert.ok(module.auditQuestionBank([{ ...INITIAL_QUESTIONS[0], correctIndex: 4 }], []).errors.some((error: string) => error.includes('schema')));
  const concentrated = Array.from({ length: 5 }, (_, i) => ({ ...INITIAL_QUESTIONS[0],
    id: `concentration-${i}`, questionText: `Original audit question number ${i}?`, correctIndex: i === 4 ? 1 : 0 }));
  const concentrationReport = module.auditQuestionBank(concentrated, []);
  assert.deepEqual(concentrationReport.errors, []);
  assert.ok(concentrationReport.warnings.some((warning: string) => warning.includes('dominant answer position') && warning.includes('80.0%')));
  const fixed = module.auditQuestionBank(concentrated.map(q => ({ ...q, correctIndex: 0 })), []);
  assert.ok(fixed.warnings.some((warning: string) => warning.includes('fixed answer position')));
  assert.ok(fixed.warnings.some((warning: string) => warning.includes('single question type')));
});

test('malformed distractor axes return validation failures instead of throwing', async () => {
  const { validateCandidateQuestion } = await generationModule();
  assert.ok(validateCandidateQuestion({ ...INITIAL_QUESTIONS[0], distractorAxes: 'bad' }, 1).some(error => error.includes('distractorAxes')));
  const { auditQuestionBank } = await import('../scripts/auditQuestions');
  assert.ok(auditQuestionBank([{ ...INITIAL_QUESTIONS[0], distractorAxes: 'bad' }], []).errors.some(error => error.includes('distractorAxes')));
});

test('dry-run covers three domains without API calls, reports or bank writes', async () => {
  const { runPipeline } = await generationModule();
  const originalCwd = process.cwd(), folder = mkdtempSync(join(tmpdir(), 'aaig-dry-run-'));
  const originalFetch = globalThis.fetch, originalLog = console.log;
  const keys = ['GEN_DRY_RUN', 'GEN_COUNT', 'GEN_WRITE', 'GEN_CONCURRENCY', 'GEN_MIN_OPT_LEN'];
  const saved = keys.map(key => process.env[key]);
  const output: string[] = [];
  let requests = 0;
  mkdirSync(join(folder, 'src/data'), { recursive: true });
  writeFileSync(join(folder, 'src/data/generatedQuestions.ts'), 'canonical fixture');
  try {
    process.chdir(folder);
    Object.assign(process.env, { GEN_DRY_RUN: '1', GEN_COUNT: '10', GEN_WRITE: '1', GEN_CONCURRENCY: '5', GEN_MIN_OPT_LEN: '25' });
    globalThis.fetch = async () => { requests++; throw new Error('Network blocked in test'); };
    console.log = value => { output.push(String(value)); };
    await runPipeline();
    assert.equal(requests, 0);
    assert.deepEqual(readdirSync(folder), ['src']);
    assert.equal(readFileSync(join(folder, 'src/data/generatedQuestions.ts'), 'utf8'), 'canonical fixture');
    const report = JSON.parse(output[0]);
    assert.equal(report.dryRun, true);
    assert.equal(report.plan.length, 10);
    assert.equal(new Set(report.plan.map((slot: { domain: string }) => slot.domain)).size, 3);
  } finally {
    process.chdir(originalCwd); globalThis.fetch = originalFetch; console.log = originalLog;
    keys.forEach((key, i) => { if (saved[i] === undefined) delete process.env[key]; else process.env[key] = saved[i]; });
    rmSync(folder, { recursive: true, force: true });
  }
});

test('hand-authored supplement meets authoring gates and varies type and answer position', () => {
  assert.equal(SUPPLEMENTAL_QUESTIONS.length, 26);
  assert.ok(SUPPLEMENTAL_QUESTIONS.every(q => q.reviewStatus === 'unreviewed'));
  for (const q of SUPPLEMENTAL_QUESTIONS) {
    assert.ok(passesLengthGate(q), q.id);
    assert.ok(q.options[q.correctIndex].length < Math.max(...q.options.map(o => o.length)), `${q.id} correct option is longest`);
    assert.equal(q.distractorAxes?.length, 3, q.id);
    assert.equal(q.distractorExplanations?.length, 3, q.id);
  }
  const d21 = INITIAL_QUESTIONS.filter(q => q.subDomain.startsWith('D2.1'));
  assert.ok(d21.length >= 15);
  assert.ok(new Set(d21.map(q => q.questionType)).size >= 4);
  assert.ok(new Set(d21.map(q => q.correctIndex)).size === 4);
  for (const topic of ['D1.3', 'D3.2']) {
    assert.ok(new Set(INITIAL_QUESTIONS.filter(q => q.subDomain.startsWith(topic)).map(q => q.questionType)).size >= 4, topic);
  }
});

test('correct option is never the longest, except two items held by reviewer decisions', () => {
  const longest = INITIAL_QUESTIONS.filter(q => q.options[q.correctIndex].length === Math.max(...q.options.map(o => o.length)));
  // aaig-d4-003 was retained as-is and x6j7d awaits ISO/IEC 42001 evidence in the 2026-10-14 review.
  assert.deepEqual(longest.map(q => q.id).sort(), ['aaig-d4-003', 'aaig-pipe-1791943409756-76-x6j7d']);
});

test('every bank question passes the option length-parity gate', () => {
  assert.deepEqual(INITIAL_QUESTIONS.filter(q => !passesLengthGate(q)).map(q => q.id), []);
});

test('explanations cite options only in the "Option X" form that shuffling can remap', () => {
  // Legal locators such as Annex III 5(b) are not option references.
  const unmappable = /\b[Oo]ptions\s+[ABCD]\b|(?<![\w)/])\([ABCD]\)|\b[Cc]hoices?\s+[ABCD]\b|\b[Aa]nswer\s+[ABCD]\b/;
  const offenders = INITIAL_QUESTIONS.filter(q => [q.explanation, ...(q.distractorExplanations || [])].some(t => unmappable.test(t)));
  assert.deepEqual(offenders.map(q => q.id), []);
});

test('guessability indicator separates reasoning-dependent items from wording-dependent items', async () => {
  const { guessabilityRate, guessProbability } = await import('../src/services/guessability');
  const wordy = { options: ['Deploy an automated dashboard without review', 'Establish a charter with decision rights and risk appetite', 'Let engineers decide alone', 'Wait'], questionType: 'BEST' as const, correctIndex: 1 };
  assert.equal(guessProbability(wordy), 1);
  assert.equal(guessProbability({ ...wordy, correctIndex: 3 }), 0);
  const tied = { options: ['one', 'two', 'three', 'four'], questionType: 'BEST' as const, correctIndex: 2 };
  assert.equal(guessProbability(tied), 0.25, 'ties are broken at random, not by option position');
  assert.equal(guessabilityRate([]), 0);
  const { FUNDAMENTAL_QUESTIONS } = await import('../src/data/fundamentalQuestions');
  assert.ok(guessabilityRate(FUNDAMENTAL_QUESTIONS) <= 0.4, 'new Fundamental items must not be answerable from wording alone');
  const report = (await import('../scripts/auditQuestions')).auditQuestionBank(INITIAL_QUESTIONS, FLASHCARDS);
  assert.equal(typeof report.guessability.rate, 'number');
});

test('distractor rewrites keep answers, passes gates and removes the vocabulary cue without inverting it', async () => {
  const { DISTRACTOR_REWRITES, CORRECT_REWRITES } = await import('../src/data/distractorRewrites');
  const { guessabilityRate } = await import('../src/services/guessability');
  const ids = Object.keys(DISTRACTOR_REWRITES);
  assert.equal(ids.length, 25);
  assert.deepEqual(Object.keys(CORRECT_REWRITES).sort(), [...ids].sort());
  const rewritten = INITIAL_QUESTIONS.filter(q => ids.includes(q.id));
  assert.equal(rewritten.length, ids.length);
  for (const q of rewritten) {
    assert.ok(passesLengthGate(q), `${q.id} length parity`);
    assert.ok(q.options[q.correctIndex].length < Math.max(...q.options.map(o => o.length)), `${q.id} correct option is longest`);
    assert.equal(q.distractorAxes?.length, 3, q.id);
    assert.equal(q.distractorExplanations?.length, 3, q.id);
    assert.equal(q.reviewStatus, 'unreviewed');
  }
  const rate = guessabilityRate(rewritten);
  // Before the pilot every one of these items was answered correctly by the guesser.
  assert.ok(rate <= 0.4, `pilot guessability ${rate}`);
  assert.ok(rate >= 0.15, `pilot guessability ${rate} is below chance, which would invert the cue`);
});

test('retired near-duplicates leave the active bank, never touch protected items, and keep every subtopic usable', async () => {
  const { ACTIVE_QUESTIONS } = await import('../src/data/questions');
  const { RETIRED_QUESTIONS, RETIRED_QUESTION_IDS } = await import('../src/data/retiredQuestions');
  const { findNearDuplicatePairs } = await import('../src/services/duplicateDetection');
  const baseline = JSON.parse(readFileSync(new URL('./fixtures/review-20261014-baseline.json', import.meta.url), 'utf8'));
  const decisions = new Map<string, string>(baseline.items.map((item: { id: string; decision: string }) => [item.id, item.decision]));
  const isProtected = (id: string) => !/^aaig-pipe/.test(id) || (decisions.has(id) && decisions.get(id) !== 'revise');
  const byId = new Map(INITIAL_QUESTIONS.map(q => [q.id, q]));
  assert.equal(ACTIVE_QUESTIONS.length, INITIAL_QUESTIONS.length - RETIRED_QUESTIONS.length);
  assert.ok(ACTIVE_QUESTIONS.every(q => !RETIRED_QUESTION_IDS.has(q.id)));
  for (const entry of RETIRED_QUESTIONS) {
    const retired = byId.get(entry.id), twin = byId.get(entry.keptTwin);
    assert.ok(retired && twin, entry.id);
    assert.ok(!isProtected(entry.id), `${entry.id} is held by a reviewer decision or is not generated`);
    assert.ok(!RETIRED_QUESTION_IDS.has(entry.keptTwin), `${entry.id} points at a retired twin`);
    assert.equal(retired.subDomain, twin.subDomain);
  }
  const perTopic = new Map<string, number>();
  for (const q of ACTIVE_QUESTIONS) perTopic.set(q.subDomain, (perTopic.get(q.subDomain) || 0) + 1);
  assert.ok([...perTopic.values()].every(count => count >= 9), 'every subtopic keeps at least nine questions');
  // Pairs that remain involve only items held by reviewer decisions, so they cannot be retired here.
  assert.ok(findNearDuplicatePairs(ACTIVE_QUESTIONS).every(([a, b]) => isProtected(a) && isProtected(b)));
});

test('the app loads the active bank, so retired questions never reach practice or mock exams', async () => {
  const { setupDom } = await import('./dom');
  const cleanup = setupDom();
  try {
    const { loadAllQuestions } = await import('../src/services/storage');
    const { ACTIVE_QUESTIONS } = await import('../src/data/questions');
    assert.deepEqual(loadAllQuestions().map(q => q.id), ACTIVE_QUESTIONS.map(q => q.id));
  } finally { cleanup(); }
});
