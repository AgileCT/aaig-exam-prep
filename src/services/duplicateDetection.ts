import type { Question } from '../types';

export const DUPLICATE_SIMILARITY = 0.6;

const STOP = new Set('the a an of to and or for in on with that this is are be by as at from it its which what should first best most primary least following enterprise organization firm multinational financial services institution governance ai across all into their must'.split(' '));

function bag(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const word of text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)) {
    if (word.length > 2 && !STOP.has(word)) counts.set(word, (counts.get(word) || 0) + 1);
  }
  return counts;
}

function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, na = 0, nb = 0;
  for (const [word, count] of a) { na += count * count; dot += count * (b.get(word) || 0); }
  for (const count of b.values()) nb += count * count;
  return dot / Math.sqrt(na * nb || 1);
}

/** What a learner must reason about is the stem and the correct answer, so those decide similarity. */
export const questionBag = (question: Question) => bag(`${question.questionText} ${question.options[question.correctIndex]}`);

export function questionSimilarity(a: Question, b: Question): number {
  return cosine(questionBag(a), questionBag(b));
}

/** Pairs inside the same subtopic whose stem and correct answer are near-identical. */
export function findNearDuplicatePairs(questions: readonly Question[], threshold = DUPLICATE_SIMILARITY): [string, string, number][] {
  const bags = questions.map(questionBag);
  const pairs: [string, string, number][] = [];
  for (let i = 0; i < questions.length; i++) for (let j = i + 1; j < questions.length; j++) {
    if (questions[i].subDomain !== questions[j].subDomain) continue;
    const similarity = cosine(bags[i], bags[j]);
    if (similarity >= threshold) pairs.push([questions[i].id, questions[j].id, Number(similarity.toFixed(2))]);
  }
  return pairs;
}
