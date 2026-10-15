import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { INITIAL_QUESTIONS } from '../src/data/questions';
import { INITIAL_FLASHCARDS } from '../src/data/flashcards';

interface Baseline {
  questions: [string, number][];
  flashcards: string[];
  items: { id: string; decision: string; beforeHash: string }[];
}
const baseline: Baseline = JSON.parse(readFileSync(new URL('./fixtures/review-20261014-baseline.json', import.meta.url), 'utf8'));
const items = [...INITIAL_QUESTIONS.map(q => ({ type: 'mcq', ...q })),
  ...INITIAL_FLASHCARDS.map(c => ({ type: 'flashcard', ...c }))];
const byId = new Map(items.map(item => [item.id, item]));

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => [key, canonical(child)]));
  return value;
}
function hash(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(canonical(value))).digest('hex');
}

test('review import preserves IDs, ordering and canonical answer indices for saved attempts', () => {
  assert.deepEqual(INITIAL_QUESTIONS.map(q => [q.id, q.correctIndex]), baseline.questions);
  assert.deepEqual(INITIAL_FLASHCARDS.map(c => c.id), baseline.flashcards);
  assert.equal(byId.size, 357);
});

test('all 313 explicit revisions are applied while retained, pending and unsent items remain unchanged', () => {
  let revised = 0, pending = 0, protectedItems = 0;
  for (const entry of baseline.items) {
    const item = byId.get(entry.id);
    assert.ok(item, entry.id);
    if (entry.decision === 'revise') {
      assert.notEqual(hash(item), entry.beforeHash, `Missing revision: ${entry.id}`);
      revised++;
    } else {
      assert.equal(hash(item), entry.beforeHash, `Unauthorized change: ${entry.id}`);
      protectedItems++;
      if (entry.decision === 'needs-more-evidence') pending++;
    }
  }
  assert.equal(revised, 313);
  assert.equal(pending, 9);
  assert.equal(protectedItems, 44);
});

test('follow-up review uses the NIST role and privacy locators consistently', () => {
  for (const id of ['aaig-pipe-1791942360567-1', 'aaig-pipe-1791943153308-23-shwtn', 'aaig-pipe-1791943238742-43-l38z6']) {
    const q = INITIAL_QUESTIONS.find(q => q.id === id)!;
    assert.match(q.explanation, /GOVERN 2\.1/, id);
    assert.match(q.source, /2\.1/, id);
  }
  for (const id of ['aaig-pipe-1791943269969-47-mryb2', 'aaig-pipe-1791943444776-87-34yu5']) {
    const q = INITIAL_QUESTIONS.find(q => q.id === id)!;
    assert.match(q.explanation, /MEASURE 2\.10/, id);
    assert.doesNotMatch(q.explanation, /MANAGE 2\.[24]/, id);
  }
});

test('reviewed teaching text excludes editing markers and distinguishes AI Act actors', () => {
  for (const card of INITIAL_FLASHCARDS) assert.doesNotMatch(card.back, /^\(Retained Existing Answer\)/, card.id);
  const riskCard = INITIAL_FLASHCARDS.find(c => c.id === 'fc-31')!;
  assert.match(riskCard.back, /providers must inform people of direct AI interactions/);
  assert.doesNotMatch(riskCard.back, /deployers must disclose human-facing AI interactions/);
  const sourcingCard = INITIAL_FLASHCARDS.find(c => c.id === 'fc-21')!;
  assert.match(sourcingCard.keyTakeaway, /high-risk/);
});

test('recruitment DPIA explanations retain the processing-risk trigger and applicability conditions', () => {
  for (const id of ['aaig-pipe-1791943128218-15-l5h7z', 'aaig-pipe-1791944067770-215-d7t0y']) {
    const q = INITIAL_QUESTIONS.find(q => q.id === id)!;
    assert.match(q.explanation, /When the relevant requirements apply/);
    assert.match(q.explanation, /where the applicable criteria are met/);
    assert.doesNotMatch(q.explanation, /private-sector employers must also fulfill GDPR Article 35/);
  }
});
