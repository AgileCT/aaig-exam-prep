# Changelog

## 1.3.0 2026-10-24

- Add 18 hand-authored Data and AI Architecture questions. D2.1 Data Governance & Data Quality grows from 5 to 15 questions and now uses all five qualifier types and all four answer positions; D2.3, D2.4 and D2.5 gain 3, 2 and 3 questions. Citations remain unverified.
- Shorten the correct option in 41 questions so it is no longer the longest choice. Answers, explanations and sources are unchanged. Two items held by reviewer decisions keep their wording.
- Add mock exam history, progress backup and restore, and data bundle splitting.
- Add a reference resolver that links source labels to the official landing pages of NIST, ISO, EU AI Act, COBIT and other references.
- Rebalance canonical answer positions within every subtopic (previously up to 94% on one letter) by swapping options in 162 questions. Explanation letters move with the options. Saved attempts and pre-1.3.0 backups are remapped once on load or import; backups now record the option-order revision.
- Add eight hand-authored questions to D1.3 Policies (previously MOST only) and D3.2 Business Case & ROI (previously FIRST only); both topics now use all five qualifier types.
- Add 16 hand-authored Fundamental questions (12 before, 28 now) with non-financial scenarios, options of 40-80 characters, and distractors that are plausible concepts or actions failing on the scenario's facts.
- Add a guessability indicator to the offline audit and a regression test. A scenario-blind keyword guesser answered 71.3% of the earlier bank, 49.0% of the 26 earlier supplement items and 33.9% of the 16 new items correctly (ties broken at random; random is 25%). The audit now warns above 40%; the earlier bank has not been rewritten.
- Dashboard headline accuracy and per-domain accuracy now use each question's first attempt; the latest-answer figure is shown beside it.
- Mock exams draw unanswered questions first within each domain and report how many questions had been answered before.
- Practice gains a subtopic selector and a weak-subtopics-first order based on first-attempt accuracy.
- Rewrite formulaic distractors on 35 questions (a 12-question pilot, a 13-question second batch and a 10-question third batch covering PRIMARY, LEAST and MOST items): two wrong options per item become legitimate governance actions that fail on scope or sequence, and the right answers use plainer wording. Guesser hit rate on the pilot items fell from 100% to 29.2% and on the second batch to 27.6% and on the third to 28.3%. The whole bank moved from 68.0% to 54.3% once duplicates were retired, 40 questions added and 35 rewritten. The rewrite replaces text the 2026-10-14 review had revised and needs re-review; see `docs/reviews/2026-10-24-distractor-pilot.md`.
- Add a second round of 40 hand-authored non-financial questions weighted toward the most crowded subtopics (D1.1 and D1.3 get 12, D1.2 and D1.5 get 6, D2 gets 12, D3 gets 10), covering board reporting, escalation of AI incidents, exception handling in policies, procedures versus policies, open-source model governance, exit clauses, stage-gated funding and access to AI logs. Scenarios include pharmaceuticals, retail, a university, a law firm, a postal service, a telecom operator, a hospital, a utility and a museum. They use all five question types and answer positions, none duplicates an existing question, and the guesser answers 38.8% of them correctly. The active bank is now 376 questions, 63.6% of them with financial scenarios (80.7% before the additions).
- Add 40 hand-authored questions for the thinnest subtopics (D2 16, D3 12, D1 12) with non-financial scenarios (water utility, agriculture, library, museum, hospital, school district, city, university, transport) and plausible wrong options. They use all five question types and all four answer positions, avoid near-duplication of the existing bank, and the scenario-blind guesser answers 25.8% of them correctly.
- Retire 63 near-duplicate questions from practice, mock exams and statistics (for example 12 questions that all asked for the second line's responsibility under the Three Lines Model). The active bank is now 296 questions before the 40 additions above and 336 after; every subtopic keeps at least nine, and question types and answer positions stay balanced. Retired records stay in the source data and are listed in `src/data/retiredQuestions.ts`; see `docs/reviews/2026-10-24-duplicate-retirement.md`. The audit now reports remaining near-duplicate pairs and runs on the active bank.
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
