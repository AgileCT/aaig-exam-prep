import type { Question } from '../types';
import { AAIG_DOMAINS } from '../data/domains';
import { normalizeQuestionDomain } from './domainTaxonomy';

function shuffle<T>(items: T[], rng: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function sampleStudyQuestions(questions: Question[], requestedCount: number, rng = Math.random): Question[] {
  const normalizedQuestions = questions.map(normalizeQuestionDomain);
  const domains = Object.values(AAIG_DOMAINS);
  const count = Math.min(requestedCount, questions.length);
  const totalWeight = domains.reduce((sum, domain) => sum + domain.weight, 0);
  const groups = domains.map(domain => {
    const candidates = shuffle(normalizedQuestions.filter(question => question.domainId === domain.id), rng);
    const ideal = count * domain.weight / totalWeight;
    return { candidates, ideal, quota: Math.min(Math.floor(ideal), candidates.length) };
  });
  let remaining = count - groups.reduce((sum, group) => sum + group.quota, 0);
  // Allocate rounding remainders, then redistribute quotas when a domain lacks enough questions.
  while (remaining > 0) {
    const available = groups.filter(group => group.quota < group.candidates.length);
    if (available.length === 0) break;
    const next = available.reduce((best, group) => group.ideal - group.quota > best.ideal - best.quota ? group : best);
    next.quota++;
    remaining--;
  }
  return shuffle(groups.flatMap(group => group.candidates.slice(0, group.quota)), rng);
}
