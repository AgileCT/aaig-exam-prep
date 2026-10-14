import type { Question } from '../types';

export function reorderQuestionOptions(question: Question, order: number[]): Question {
  if (order.length !== question.options.length || new Set(order).size !== order.length ||
      order.some(i => !Number.isInteger(i) || i < 0 || i >= question.options.length)) {
    throw new Error('Option order must be a permutation of the original indices');
  }
  const oldDistractors = question.options.map((_, i) => i).filter(i => i !== question.correctIndex);
  const explanations = question.distractorExplanations;
  const byOption = new Map<number, string>();
  oldDistractors.forEach((oldIndex, i) => {
    const explanation = explanations?.length === question.options.length ? explanations[oldIndex] : explanations?.[i];
    if (explanation) byOption.set(oldIndex, explanation);
  });
  const remap = (text: string) => text
    .replace(/\bOption ([ABCD])\b/gi, (_, letter: string) => `Option ${'ABCD'[order.indexOf('ABCD'.indexOf(letter.toUpperCase()))]}`)
    .replace(/^([ABCD])(?=\s*[:.)])/i, letter => 'ABCD'[order.indexOf('ABCD'.indexOf(letter.toUpperCase()))]);
  return {
    ...question,
    options: order.map(i => question.options[i]),
    correctIndex: order.indexOf(question.correctIndex),
    explanation: remap(question.explanation),
    distractorExplanations: explanations ? order.filter(i => i !== question.correctIndex)
      .map(i => remap(byOption.get(i) || 'Explanation pending content review.')) : undefined,
    distractorAxes: question.distractorAxes?.length === oldDistractors.length
      ? order.filter(i => i !== question.correctIndex).map(i => question.distractorAxes![oldDistractors.indexOf(i)])
      : question.distractorAxes,
  };
}

export function shuffleQuestionOptions(question: Question, rng = Math.random): Question {
  const order = question.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return reorderQuestionOptions(question, order);
}

export function draftSource(source: string): string {
  return source.split(';').map(part => part.trim()).filter(part => part && !/ISACA/i.test(part)).join('; ')
    || 'Author-provided rationale; source verification pending';
}

export function markQuestionUnreviewed(question: Question): Question {
  const normalized = question.distractorExplanations?.length === question.options.length
    ? reorderQuestionOptions(question, question.options.map((_, i) => i)) : question;
  return { ...normalized, reviewStatus: 'unreviewed', source: draftSource(question.source) };
}
