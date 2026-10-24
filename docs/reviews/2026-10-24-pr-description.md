# Release 1.3.0: question-bank quality, study logic and reviewed content

Branch `claude/trusting-fermat-7hxmm4` into `main`. 45 commits, 54 files (+6,027 / −835). `npm run verify` passes: 96 tests, offline audit, `tsc`, Vite build.

## Why

An EdTech and exam-quality review of the app found that the question bank could be answered by wording alone (a scenario-blind keyword guesser got 71% right against 25% for chance), that the same ISACA-style fact was asked many times, that most scenarios were financial, that answer positions were skewed, that flashcards were too long and compound, and that the dashboard counted repeat attempts as accuracy. This branch fixes those and records a human review of everything it changed.

## What changed

### Study logic and UI
- Dashboard accuracy and per-domain accuracy use each question's **first attempt**; latest-answer accuracy is shown beside it.
- Mock exams draw **unanswered questions first** within each domain and report how many had been answered before.
- Practice has a **subtopic selector** and a **weak-subtopics-first** order based on first-attempt accuracy.
- Flashcards: **Difficult** and **Needs Review** are separate ratings; review order is difficult, new, learning, mastered; the card is taller (440 px, checked in Chromium for all cards), with a scroll hint for narrow screens; `US-specific` badge and a `Pending verification` mechanism (no card uses it now).
- Mock exam history, progress backup and restore, data bundle splitting, and a reference resolver that links source labels to official landing pages.
- Answer positions were rebalanced within every subtopic (previously up to 94% on one letter). Saved attempts and pre-1.3.0 backups are remapped once on load or import (`optionOrderRevision`, export version 1.3.0).

### Question bank (439 source questions → 373 active)
- **Retired 66** near-duplicates (63 by the similarity rule, 3 on the reviewer's decision). They stay in the source data (`src/data/retiredQuestions.ts`) and are excluded from practice, mock exams and statistics.
- **Added 158 hand-written questions** across D1 to D3 with mostly non-financial scenarios (the earlier bank was 80.7% financial; the active bank is now about 61%).
- **Rewrote 159 questions** (`src/data/distractorRewrites.ts`): two or three wrong options per item became legitimate governance actions that fail on scope or sequence, the correct option was put in plainer wording, kept wrong options got an error-axis tag, and 63 main explanations were synced to the new wording. LEAST questions only had the wording of the bad practice changed. The rewrite layer now also applies to hand-written questions.
- A **guessability indicator** and a regression test were added to the offline audit. The scenario-blind guesser now gets **31.3%** of the active bank right (from 71%; chance is 25%); every question type is below 40% (FIRST 32.6%, BEST 34.3%, PRIMARY 33.2%, MOST 33.0%, LEAST 21.6%).
- The correct option is no longer the longest option (two items held by earlier reviewer decisions excepted), and the option length-parity gate holds for the whole bank.

### Flashcards (40 → 98)
- Every back is at most 400 characters and every takeaway one sentence; 12 compound fronts and 22 overlong cards were split (original IDs stay with the first part, so saved mastery still applies; fc-50 was merged into fc-49 on review).
- 58 new cards, including nine D2 cards (D2 is 29 of 98). fc-12 and fc-38 moved to D3; fc-04, fc-10, fc-12 and fc-32 sources were corrected.

### Review records
- All 373 active questions and all 98 flashcards carry `reviewStatus: 'reviewed'`, `reviewedBy: Xiaoli (Shelly) Zhao` and the review date (2026-10-14 or 2026-10-24). Three AIMS questions and four flashcards also carry an evidence-verification note and a `sourceUrl`.
- Records live in `src/data/reviewRecords.ts` and `src/data/evidenceVerification.ts`; every decision, input file and SHA256 is in `docs/reviews/`.

## Review protection

- The 2026-10-14 signed baseline (`tests/fixtures/review-20261014-baseline.json`) still gates content: `tests/review-import.test.ts` fails on any change to a signed item unless the item is on an explicit authorized list (cards, evidence verification, and the 15 items outside that review that the reviewer authorized for rewriting). Review metadata is stripped before comparing, so it does not weaken the check.
- Nothing held by a "retain" or "needs more evidence" decision was rewritten.

## Limitations (please read)

- The reviewer is a practitioner. Records mean "reviewed by Xiaoli (Shelly) Zhao", not ISACA approval and not independent expert certification.
- **Source labels were not checked against the source texts** and most questions have no `sourceUrl`. The environment's network blocked nist.gov, eur-lex, iso.org and gdpr-info.eu, and ISO/IEC 42001:2023 and COBIT 2019 are paid texts. The three AIMS questions and fc-04, fc-12, fc-32 and fc-32b were verified by the reviewer from public excerpts and secondary sources, and each source line says "not the licensed full text". The `sourceUrl` values point to standard landing pages (and a DOI for fc-12 that the reviewer supplied and I could not open), not to clauses.
- The sixth review packet (134 questions) was approved as a batch, without a per-question table.
- The guesser measures wording cues only. It cannot tell whether an option is actually sound; that rests on the human review.
- Many questions still test the same few ideas (board committee, mandate first, thresholds with escalation). Rewriting changed their wording, not their number.
- D1.8 (41%) and D3.3 (40%) remain slightly above the guesser target because their easy questions are held by earlier reviewer decisions.

## Migration and risk

- Saved progress is migrated on load (answer-position remap); backups from before 1.3.0 are remapped on import. There are tests for both. Mastery recorded on fc-50 no longer points at a card.
- Retired questions are excluded everywhere the app reads the bank (`ACTIVE_QUESTIONS`); their saved attempts remain in storage.
- No dependency changes. `bun.lock` was removed; npm is the canonical installer.

## How to review

1. `npm ci && npm run verify`.
2. Skim `CHANGELOG.md` (1.3.0) and `docs/reviews/2026-10-24-review-records.md`.
3. In the app: Practice → pick a subtopic, Mock exam (unanswered first), Flashcards (rate a card Difficult and reopen), Dashboard (first-attempt vs latest).
4. For content, `docs/reviews/2026-10-24-distractor-pilot.md` lists every rewrite batch with before and after rates, and the review packets (`*.docx`) hold the full before/after text.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01Dyzvt1ntAJVjKpBy3UPMPe
