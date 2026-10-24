import type { Question } from '../types';

/**
 * 2026-10-24: the three AIMS questions that carried a 'needs-more-evidence' decision since the 2026-10-14
 * review. The reviewer checked the ISO/IEC 42001 statements (Clause 4 context and scope, Clause 6.1.3) and the
 * ISO/IEC 23894 citation against public excerpts, standard guidance and secondary sources, not the licensed
 * full text, and asked for the item to be marked verified with their name and the date. The source line says so.
 */
export const EVIDENCE_VERIFIED_BY = 'Xiaoli (Shelly) Zhao';
export const EVIDENCE_VERIFIED_AT = '2026-10-24';
const NOTE = 'Evidence verified by the reviewer on 2026-10-24 from public excerpts and secondary sources, not the licensed full text.';
const ISO_42001_URL = 'https://www.iso.org/standard/81230.html';

export const EVIDENCE_VERIFIED_QUESTIONS: Readonly<Record<string, string>> = {
  'aaig-pipe-1791942407156-11': ISO_42001_URL,
  'aaig-pipe-1791943492016-96-75ffw': ISO_42001_URL,
  'aaig-pipe-1791943670257-136-96q8n': ISO_42001_URL,
};

export function applyEvidenceVerification(question: Question): Question {
  const sourceUrl = EVIDENCE_VERIFIED_QUESTIONS[question.id];
  if (!sourceUrl) return question;
  return {
    ...question,
    source: `${question.source}. ${NOTE}`,
    sourceUrl,
    reviewStatus: 'reviewed',
    reviewedBy: EVIDENCE_VERIFIED_BY,
    reviewedAt: EVIDENCE_VERIFIED_AT,
  };
}
