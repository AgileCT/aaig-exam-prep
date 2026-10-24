# Changelog

## 1.3.0 2026-10-24

- Add 18 hand-authored Data and AI Architecture questions. D2.1 Data Governance & Data Quality grows from 5 to 15 questions and now uses all five qualifier types and all four answer positions; D2.3, D2.4 and D2.5 gain 3, 2 and 3 questions. Citations remain unverified.
- Shorten the correct option in 41 questions so it is no longer the longest choice. Answers, explanations and sources are unchanged. Two items held by reviewer decisions keep their wording.
- Add mock exam history, progress backup and restore, and data bundle splitting.
- Add a reference resolver that links source labels to the official landing pages of NIST, ISO, EU AI Act, COBIT and other references.
- Rebalance canonical answer positions within every subtopic (previously up to 94% on one letter) by swapping options in 162 questions. Explanation letters move with the options. Saved attempts and pre-1.3.0 backups are remapped once on load or import; backups now record the option-order revision.
- Add eight hand-authored questions to D1.3 Policies (previously MOST only) and D3.2 Business Case & ROI (previously FIRST only); both topics now use all five qualifier types.
- Bring the last eight questions inside the option length-parity gate by trimming padded distractors.
- Remove the unused `bun.lock`; npm remains the canonical installer.
- No `sourceUrl` evidence was added and the nine evidence-pending items remain open; see `docs/reviews/2026-10-24-evidence-status.md`.

## 1.2.0 2026-10-15

- Add real browser-side Gemini, OpenAI, Anthropic Claude, and OpenAI-compatible HTTPS adapters for both tutoring and question/flashcard authoring.
- Add provider, editable model, and custom endpoint settings with destination disclosure and provider key links. Clear the draft key when changing destination.
- Preserve existing Gemini keys; store one active configuration in session storage by default with opt-in device persistence. Clear both current and legacy key storage; restore prior entries on a failed save.
- Cancel pending work on configuration changes; preserve timeouts, cancellation, structural checks, and safe status errors without raw provider responses or keys. Refuse redirects and omit browser credentials.
- Account/model access and compatible-endpoint CORS vary. Automated provider tests use mocked responses; no real paid AI requests are part of validation.

## 1.1.0 2026-10-14

- Align top-level navigation with the three core areas on ISACA's public AAIG page. Subtopics and balanced practice sampling remain app-defined, not official exam weights.
- Classify the former custom D4 content under the active domains: 74 questions and 10 flashcards retain their IDs and original classification metadata.
- Preserve legacy custom content, bookmarks, missed questions, mastery links, and historical four-category exam breakdowns. New practice sessions use three-domain breakdowns.
- Apply 313 returned-review content corrections: 282 questions and 31 flashcards. Keep five retained items, nine evidence-pending items, and 30 items outside the returned review unchanged in teaching content.
- Correct follow-up NIST clause references, AI Act role boundaries, conditional DPIA wording, and an editing marker. Content remains labeled unreviewed; no ISACA approval or independent SME certification is implied.
- Pin production installation, build, and output settings in `vercel.json` so the deployment publishes `dist`.

Validation: 50 regression tests, the offline structural audit, TypeScript, and the Vite production build. Remaining concentration and source-evidence limitations are documented in the README and review records.
