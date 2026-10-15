import type { Flashcard, Question, StudyDomainId } from '../types';
import { AAIG_DOMAINS } from '../data/domains';

const legacyTopics: Record<string, { domainId: StudyDomainId; subDomain: string }> = {
  'D4.1': { domainId: 'D1', subDomain: AAIG_DOMAINS.D1.subDomains[5] },
  'D4.2': { domainId: 'D1', subDomain: AAIG_DOMAINS.D1.subDomains[6] },
  'D4.3': { domainId: 'D1', subDomain: AAIG_DOMAINS.D1.subDomains[7] },
  'D4.4': { domainId: 'D3', subDomain: AAIG_DOMAINS.D3.subDomains[5] },
  'D4.5': { domainId: 'D1', subDomain: AAIG_DOMAINS.D1.subDomains[8] },
};

export function normalizeQuestionDomain(question: Question): Question {
  if (question.domainId !== 'D4') return question;
  const target = legacyTopics[question.subDomain.match(/^D4\.[1-5]\b/)?.[0] || ''] || legacyTopics['D4.1'];
  return { ...question, ...target, legacyDomainId: question.legacyDomainId || 'D4',
    legacySubDomain: question.legacySubDomain ?? question.subDomain };
}

// Supplier diligence belongs with integration/sourcing; technical adversarial
// testing belongs with monitoring. Remaining former D4 cards cover governance.
const legacyCardDomains: Record<string, StudyDomainId> = {
  'fc-31': 'D1', 'fc-32': 'D1', 'fc-33': 'D1', 'fc-34': 'D1',
  'fc-35': 'D3', 'fc-36': 'D1', 'fc-37': 'D1', 'fc-38': 'D1',
  'fc-39': 'D1', 'fc-40': 'D3',
};

const legacyCardTopics: Record<string, StudyDomainId> = {
  'third party ai supply chain due diligence': 'D3',
  'third party supply chain ai risk management': 'D3',
  'adversarial robustness red teaming': 'D3',
};

export function normalizeFlashcardDomain(card: Flashcard): Flashcard {
  if (card.domainId !== 'D4') return card;
  const topic = card.topic.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  return { ...card, domainId: legacyCardDomains[card.id] || legacyCardTopics[topic] || 'D1',
    legacyDomainId: card.legacyDomainId || 'D4' };
}
