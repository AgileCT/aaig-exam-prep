import assert from 'node:assert/strict';
import { test, type TestContext } from 'node:test';
import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { App } from '../src/App';
import { QuizView } from '../src/components/QuizView';
import { MockExamView } from '../src/components/MockExamView';
import { INITIAL_QUESTIONS } from '../src/data/questions';
import type { DomainId, ExamRecord, Question, UserProgress } from '../src/types';
import { setupDom } from './dom';

const emptyProgress = (): UserProgress => ({ history: {}, wrongIds: [], bookmarkedIds: [], flashcardMastery: {}, examRecords: [] });
const makeQuestion = (id: string, domainId: DomainId = 'D1'): Question => ({
  id, domainId, subDomain: 'Learning test', questionText: `Question ${id}?`,
  options: [`Wrong A ${id}`, `Correct ${id}`, `Wrong C ${id}`, `Wrong D ${id}`],
  correctIndex: 1, questionType: 'BEST', difficulty: 'Fundamental', explanation: 'Author rationale', source: 'Author reference',
});

async function mount(t: TestContext, element: React.ReactNode): Promise<{ container: HTMLElement; root: Root }> {
  const cleanup = setupDom();
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  t.after(async () => { await act(async () => root.unmount()); cleanup(); });
  await act(async () => root.render(<React.StrictMode>{element}</React.StrictMode>));
  return { container, root };
}

function button(container: HTMLElement, text: string): HTMLButtonElement {
  const found = [...container.querySelectorAll('button')].find(el => el.textContent?.trim() === text);
  assert.ok(found, `Button ${text} should exist`);
  return found;
}

async function click(element: Element): Promise<void> {
  await act(async () => element.dispatchEvent(new MouseEvent('click', { bubbles: true })));
}

function option(container: HTMLElement, text: string): HTMLElement {
  const found = [...container.querySelectorAll<HTMLElement>('[role="radio"], div.cursor-pointer')]
    .find(el => el.textContent?.includes(text));
  assert.ok(found, `Option ${text} should exist`);
  return found;
}

test('practice has one working submission path and no unrecorded Exam Mode', async t => {
  const { container } = await mount(t, <QuizView questions={[makeQuestion('q1')]} progress={emptyProgress()}
    onRecordAttempt={() => {}} onToggleBookmark={() => {}} onOpenTutor={() => {}} />);
  assert.equal([...container.querySelectorAll('button')].some(el => el.textContent?.trim() === 'Exam Mode'), false);
  assert.ok(button(container, 'Confirm Answer').disabled);
});

test('practice shuffles options and persists the original answer index', async t => {
  t.mock.method(Math, 'random', () => 0);
  const attempts: unknown[][] = [];
  const { container } = await mount(t, <QuizView questions={[makeQuestion('q1')]} progress={emptyProgress()}
    onRecordAttempt={(...args) => attempts.push(args)} onToggleBookmark={() => {}} onOpenTutor={() => {}} />);
  const options = [...container.querySelectorAll<HTMLElement>('[role="radio"], div.cursor-pointer')];
  assert.ok(options[0].textContent?.includes('Correct q1'), 'deterministic shuffle must move correct option to display index 0');
  await click(option(container, 'Correct q1'));
  await click(button(container, 'Confirm Answer'));
  assert.deepEqual(attempts, [['q1', 1, true]]);
  assert.ok(container.textContent?.includes('Key: A'));
});

test('retesting a saved wrong question opens that exact question and resolves it after a correct answer', async t => {
  const cleanup = setupDom();
  const target = INITIAL_QUESTIONS[1];
  localStorage.setItem('aaig_user_progress_v1', JSON.stringify({ ...emptyProgress(), wrongIds: [target.id], history: {
    [target.id]: [{ answeredIndex: (target.correctIndex + 1) % 4, isCorrect: false, timestamp: 1 }],
  } }));
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  t.after(async () => { await act(async () => root.unmount()); cleanup(); });
  await act(async () => root.render(<React.StrictMode><App /></React.StrictMode>));
  const review = [...container.querySelectorAll('button')].find(el => /Review|Notebook/.test(el.textContent || ''));
  assert.ok(review);
  await click(review);
  await click(button(container, 'Retest Now'));
  assert.equal(container.querySelector('h2')?.textContent?.trim(), target.questionText);
  await click(option(container, target.options[target.correctIndex]));
  await click(button(container, 'Confirm Answer'));
  const stored = JSON.parse(localStorage.getItem('aaig_user_progress_v1')!);
  assert.equal(stored.wrongIds.includes(target.id), false);
  assert.equal(stored.history[target.id].at(-1).isCorrect, true);
  assert.equal(stored.history[target.id].at(-1).answeredIndex, target.correctIndex);
});

test('mock results report raw accuracy and count unattempted items in review without readiness claims', async t => {
  const records: ExamRecord[] = [];
  const { container } = await mount(t, <MockExamView questions={[makeQuestion('q1')]} progress={emptyProgress()}
    onRecordExam={record => records.push(record)} onRecordAttempt={() => {}} />);
  await click(button(container, 'Start Mini Sprint (40m)'));
  await click(button(container, 'Submit Exam'));
  assert.match(container.textContent || '', /Accuracy: 0%/);
  assert.doesNotMatch(container.textContent || '', /Scaled Score|PASSED|EXAM READY|450/);
  assert.ok(button(container, 'Missed Items Only (1)'));
  assert.equal(records[0].score, 0);
  assert.equal(records[0].total, 1);
});

test('manual double submit saves only one exam record', async t => {
  const records: ExamRecord[] = [];
  const { container } = await mount(t, <MockExamView questions={[makeQuestion('q1')]} progress={emptyProgress()}
    onRecordExam={record => records.push(record)} onRecordAttempt={() => {}} />);
  await click(button(container, 'Start Mini Sprint (40m)'));
  const submit = button(container, 'Submit Exam');
  await act(async () => { submit.click(); submit.click(); });
  assert.equal(records.length, 1);
});

test('automatic submission scores the latest answer once and uses elapsed wall time', async t => {
  t.mock.timers.enable({ apis: ['setInterval', 'Date'], now: 1_000_000 });
  const records: ExamRecord[] = [];
  const attempts: unknown[][] = [];
  const { container } = await mount(t, <MockExamView questions={[makeQuestion('q1')]} progress={emptyProgress()}
    onRecordExam={record => records.push(record)} onRecordAttempt={(...args) => attempts.push(args)} />);
  await click(button(container, 'Start Mini Sprint (40m)'));
  await act(async () => t.mock.timers.tick(2_399_000));
  await click(option(container, 'Correct q1'));
  await act(async () => t.mock.timers.tick(1_000));
  assert.equal(records.length, 1);
  assert.equal(records[0].score, 1);
  assert.equal(records[0].durationSeconds, 2_400);
  assert.deepEqual(attempts, [['q1', 1, true]]);
  assert.ok(button(container, 'Missed Items Only (0)'));
  await act(async () => t.mock.timers.tick(5_000));
  assert.equal(records.length, 1);
});

test('sprint balances three active domains and includes legacy D4 input', async t => {
  t.mock.method(Math, 'random', () => 0);
  const questions = (['D1', 'D2', 'D3', 'D4'] as DomainId[]).flatMap(domain =>
    Array.from({ length: 30 }, (_, i) => makeQuestion(`${domain}-${i}`, domain)));
  const records: ExamRecord[] = [];
  const { container } = await mount(t, <MockExamView questions={questions} progress={emptyProgress()}
    onRecordExam={record => records.push(record)} onRecordAttempt={() => {}} />);
  await click(button(container, 'Start Mini Sprint (40m)'));
  await click(button(container, 'Submit Exam'));
  assert.deepEqual(Object.keys(records[0].breakdown), ['D1', 'D2', 'D3']);
  assert.deepEqual(Object.values(records[0].breakdown).map(domain => domain!.total), [9, 8, 8]);
  assert.equal(records[0].total, 25);
});

test('mock start is disabled with an empty question bank', async t => {
  const { container } = await mount(t, <MockExamView questions={[]} progress={emptyProgress()}
    onRecordExam={() => {}} onRecordAttempt={() => {}} />);
  assert.equal(button(container, 'Start Mini Sprint (40m)').disabled, true);
});

test('dashboard, practice, cards and authoring expose three active study domains', async t => {
  const { container } = await mount(t, <App />);
  assert.match(container.textContent || '', /AI Enterprise Integration and Performance Monitoring/);
  assert.doesNotMatch(container.textContent || '', /Risk Oversight & Compliance Frameworks/);
  for (const page of ['Practice', 'Flashcards']) {
    await click(button(container, page));
    const filters = [...container.querySelectorAll('button')].map(b => b.textContent?.trim() || '')
      .filter(text => /^D\d \(/.test(text));
    assert.equal(filters.length, 3, page);
    assert.deepEqual(filters.map(text => text.slice(0, 2)), ['D1', 'D2', 'D3']);
  }
  await click(button(container, 'AI Gen'));
  const domainSelect = [...container.querySelectorAll('select')].find(select => [...select.options].some(o => o.value === 'D1'))!;
  assert.ok(domainSelect);
  assert.deepEqual([...domainSelect.options].map(o => o.value), ['D1', 'D2', 'D3']);
});

test('practice can be narrowed to one subtopic and ordered weak-first without reshuffling on answer', async t => {
  t.mock.method(Math, 'random', () => 0.5);
  const topicA = { ...makeQuestion('a1'), subDomain: 'D1.1 Topic A' };
  const topicB = { ...makeQuestion('b1'), subDomain: 'D1.2 Topic B' };
  const progress: UserProgress = { ...emptyProgress(), history: { a1: [{ answeredIndex: 1, isCorrect: true, timestamp: 1 }] } };
  const { container } = await mount(t, <QuizView questions={[topicA, topicB]} progress={progress}
    onRecordAttempt={() => {}} onToggleBookmark={() => {}} onOpenTutor={() => {}} />);
  const select = container.querySelector<HTMLSelectElement>('select[aria-label="Subtopic"]')!;
  assert.ok(select, 'subtopic selector exists');
  assert.equal(select.options.length, 3);
  await act(async () => { select.value = 'D1.2 Topic B'; select.dispatchEvent(new Event('change', { bubbles: true })); });
  assert.ok(container.textContent?.includes('Question 1 of 1'));
  assert.ok(container.textContent?.includes('Question b1?'));
  await act(async () => { select.value = 'ALL'; select.dispatchEvent(new Event('change', { bubbles: true })); });
  const weak = container.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
  await act(async () => weak.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  assert.ok(container.textContent?.includes('Question b1?'), 'untested/weak subtopic comes first');
});
