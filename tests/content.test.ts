import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_QUESTIONS } from '../src/data/questions';
import { GENERATED_QUESTIONS } from '../src/data/generatedQuestions';
import { INITIAL_FLASHCARDS as FLASHCARDS } from '../src/data/flashcards';
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
  assert.equal(INITIAL_QUESTIONS.length, 317);
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
  assert.equal(new Set(small.map(q => q.domain)).size, 4);
  const plan = buildGenerationPlan(100, () => 0.5);
  assert.deepEqual(['D1', 'D2', 'D3', 'D4'].map(d => plan.filter(q => q.domain === d).length), [30, 20, 25, 25]);
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
  assert.equal(valid.unreviewedQuestions, 317);
  assert.ok(valid.warnings.some((warning: string) => warning.includes('single question type')));
  assert.ok(valid.warnings.some((warning: string) => warning.includes('fixed answer position')));
  assert.ok(module.auditQuestionBank([INITIAL_QUESTIONS[0], INITIAL_QUESTIONS[0]], []).errors.some((error: string) => error.includes('duplicate')));
  assert.ok(module.auditQuestionBank([{ ...INITIAL_QUESTIONS[0], correctIndex: 4 }], []).errors.some((error: string) => error.includes('schema')));
  const concentrated = Array.from({ length: 5 }, (_, i) => ({ ...INITIAL_QUESTIONS[0],
    id: `concentration-${i}`, questionText: `Original audit question number ${i}?`, correctIndex: i === 4 ? 1 : 0 }));
  const concentrationReport = module.auditQuestionBank(concentrated, []);
  assert.deepEqual(concentrationReport.errors, []);
  assert.ok(concentrationReport.warnings.some((warning: string) => warning.includes('dominant answer position') && warning.includes('80.0%')));
});

test('malformed distractor axes return validation failures instead of throwing', async () => {
  const { validateCandidateQuestion } = await generationModule();
  assert.ok(validateCandidateQuestion({ ...INITIAL_QUESTIONS[0], distractorAxes: 'bad' }, 1).some(error => error.includes('distractorAxes')));
  const { auditQuestionBank } = await import('../scripts/auditQuestions');
  assert.ok(auditQuestionBank([{ ...INITIAL_QUESTIONS[0], distractorAxes: 'bad' }], []).errors.some(error => error.includes('distractorAxes')));
});

test('dry-run covers four domains without API calls, reports or bank writes', async () => {
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
    assert.equal(new Set(report.plan.map((slot: { domain: string }) => slot.domain)).size, 4);
  } finally {
    process.chdir(originalCwd); globalThis.fetch = originalFetch; console.log = originalLog;
    keys.forEach((key, i) => { if (saved[i] === undefined) delete process.env[key]; else process.env[key] = saved[i]; });
    rmSync(folder, { recursive: true, force: true });
  }
});
