/**
 * Name shown on review records ("Reviewed by ...").
 *
 * Set VITE_REVIEWER_NAME at build time to show a different name or a neutral label such as "Project reviewer".
 * An unset or blank value keeps the default, which is the reviewer who actually reviewed this bank. A fork that
 * has not had its own review should set it, because the label states who performed the review.
 */
export const DEFAULT_REVIEWER_NAME = 'Xiaoli (Shelly) Zhao';

export function resolveReviewerName(configured: unknown): string {
  if (typeof configured !== 'string') return DEFAULT_REVIEWER_NAME;
  const name = configured.trim().replace(/\s+/g, ' ').slice(0, 80);
  return name || DEFAULT_REVIEWER_NAME;
}

export const REVIEWER_NAME = resolveReviewerName(import.meta.env?.VITE_REVIEWER_NAME);
