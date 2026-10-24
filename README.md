# AAIG™ Study Companion

An independent, open-source AI governance practice tool with original and AI-generated scenarios, flashcards, timed practice, and an optional multi-provider AI tutor.

**This project is not affiliated with or endorsed by ISACA. Its materials have not been reviewed or approved by ISACA. Practice results do not predict certification success.** AAIG™ is an ISACA trademark.

[Public application](https://aaig-exam-prep.vercel.app) · [MIT License](LICENSE)

[Release notes](CHANGELOG.md) · [GitHub releases](https://github.com/AgileCT/aaig-exam-prep/releases)

The public deployment may lag behind repository changes. Check the deployed version before treating a fix as live.

Version 1.3.0 adds 18 hand-authored Data and AI Architecture questions and rebalances option wording so the correct answer is no longer the longest choice. Version 1.2.0 adds selectable AI providers and editable models for tutoring and authoring. Version 1.1.0 aligned navigation with the three publicly listed AAIG core areas, incorporated 313 returned-review content corrections, and preserved legacy four-category content and exam history. Nine items still require further source evidence. These changes do not establish ISACA approval or independent SME certification.

## Learning features

- **Practice:** answer a question, view the author's explanation, bookmark it, and revisit missed questions. Narrow practice to one subtopic, or order it with the weakest subtopics (by first-attempt accuracy) and unseen questions first. Options are reordered without changing question IDs or stored answer meanings.
- **Timed practice:** a 25-question/40-minute sprint or a product-defined 90-question/150-minute session. Mock exams draw questions you have not answered before and tell you how many were repeats. Results show raw correctness, sample counts, and performance by study domain. The dashboard's headline accuracy counts each question's first attempt only, because re-answering after reading the explanation inflates the latest-answer figure. These are practice formats, not a reproduction of the official exam engine or scaled scoring.
- **Flashcards:** one point per card; rate each card as difficult, needs review, or mastered. Difficult and not-yet-rated cards come first. Cards on US-only law carry a "US-specific" label, and new cards show "Pending verification" until their content is checked against sources.
- **Review notebook:** open the exact missed question for another attempt.
- **Optional AI tutor:** standard, Socratic, teach-back, and drill modes. AI output is unreviewed guidance. Without a key, the tutor uses clearly labeled local fallback content.
- **AI authoring:** generated drafts undergo structure and length checks before they can be saved. Those checks do not establish factual correctness or expert approval.

The source data contains 439 questions (18 authored seed questions, 299 generated questions, and 122 hand-authored questions added in 1.3.0); 63 near-duplicates are retired and the app practices from the remaining 376. There are 90 flashcards (the original 40, split so each card covers one point, plus 12 new cards that are marked as pending verification). Quantity is not evidence of answer quality. All bundled materials remain unreviewed until a documented human review establishes their status.

## Study categories and official information

The three top-level names below align with the core areas published on ISACA's public AAIG page. The subtopics, question assignments, and balanced practice sampling are this application's study design, not an official exam blueprint or examination weights.

| Domain | Public core-area name | Practice sampling |
|---|---|---|
| D1 | AI Enterprise Governance | Equal allocation |
| D2 | Data and AI Architecture Principles | Equal allocation |
| D3 | AI Enterprise Integration and Performance Monitoring | Equal allocation |

Practice sessions divide the requested sample equally across the three domains, with rounding and redistribution when a domain has too few questions. The public page does not provide examination weights. Check the current [AAIG certification page](https://www.isaca.org/credentialing/aaig) and [beta information](https://engage.isaca.org/volunteeropportunities/opportunities-list-public/volunteer-opportunity-details?VolunteerOpportunityKey=7ff38991-79c8-461e-9f01-01a0b56e7eb3) before planning an exam. Core-area names last checked: 2026-10-14.

The former custom D4 category is retired from navigation and authoring. Regulatory landscapes, standards, framework mapping, and risk appetite now sit under D1; supplier and supply-chain risk sit under D3. Former D4 flashcards are assigned by topic, including supplier diligence and red teaming under D3. These assignments are the app's interpretation of the public areas.

Legacy D4 custom content remains readable and is classified on load, preserving its original classification in legacy metadata. Unknown legacy topics remain available under D1 for compatibility. Question IDs, bookmarks, missed items, and card mastery links are preserved. Version 1.3.0 rebalanced canonical answer positions within each subtopic; recorded attempts and imported backups from earlier versions are remapped once so each still points to the option the learner chose. Existing four-domain exam breakdowns remain historical snapshots; new sessions record three domains. Loading does not destructively rewrite stored progress or custom content.

## Run locally

Use Node.js 22.14 or later. npm and `package-lock.json` are the canonical installation path for this repository.

```sh
git clone https://github.com/AgileCT/aaig-exam-prep.git
cd aaig-exam-prep
npm ci
npm run dev
```

Open the Vite URL printed by the terminal. To verify and build:

```sh
npm run verify
npm run preview
```

`verify` runs regression tests, an offline content audit, and the TypeScript/production build. CI uses the same command. The audit reports structural failures, remaining topic/type concentration, and a guessability indicator (the share of questions a scenario-blind keyword guesser answers correctly; random is 25%, the target is 40% or lower); it is not a model judge, domain expert review, or certification of correctness.

## AI processing and API key storage

The optional tutor and authoring tools support Google Gemini, OpenAI, Anthropic Claude, and an OpenAI-compatible HTTPS endpoint. Open the API key settings, choose a provider, enter a model available to your account, and enter that provider's API key. Both tutoring and question/flashcard generation use this configuration. Model IDs are editable because access and availability differ between accounts; API access and billing are separate from consumer chat subscriptions.

Requests send your key, messages, and any attached question context directly to the selected provider. The settings panel discloses the destination before saving. Preset destinations are fixed; a compatible endpoint uses your supplied HTTPS base URL with `/chat/completions` appended (for example, `https://provider.example/v1`). It must support browser CORS, bearer authentication, `max_tokens`, and non-streaming Chat Completions text responses. Compatibility with every provider or model is not guaranteed. Redirects are refused; browser credentials are omitted. No key appears in request URLs or provider error details.

The single active configuration is held in session storage by default. Explicitly selecting “remember” keeps it in this browser's local storage; previously remembered Gemini keys retain their storage choice until changed. Existing Gemini keys remain usable and are migrated when a configuration is saved. Changing provider or custom endpoint clears the draft key to prevent sending a previous provider's key to another destination. Saving settings cancels any pending tutoring or authoring request when its configuration changes. Clearing removes both current and legacy key storage. Browser storage is not a secret vault. The app does not proxy requests through an AgileCT server. Provider quota limits and charges may apply.

Requests have a timeout and can be cancelled. Returned content is checked before use, but AI answers and citations still need human verification. A valid model name or a successful API response does not prove the learning content is correct.

Do not paste confidential information, official QAE items, exam screenshots, or protected ISACA materials into the AI tools. ISACA's [beta participation information](https://engage.isaca.org/volunteeropportunities/opportunities-list-public/volunteer-opportunity-details?VolunteerOpportunityKey=7ff38991-79c8-461e-9f01-01a0b56e7eb3) restricts sharing ISACA content or services with generative AI. Use original scenarios and public references you have permission to process.

## Optional offline generation

Store the Gemini key in a local, ignored `.env` file as `GEMINI_API_KEY`. Never commit a key.

```sh
GEN_DRY_RUN=1 GEN_COUNT=50 npm run gen:questions
GEN_COUNT=50 GEN_CONCURRENCY=5 npm run gen:questions
npm run audit:questions
```

The dry run prints the sampling plan without API calls or file writes. A normal run makes paid API requests only when a key is configured and saves accepted/rejected drafts to the ignored `reports/gen-questions.json`; it does not change the bundled bank. To explicitly append accepted drafts to the bank, run with `GEN_WRITE=1`, review the resulting diff, then rerun verification. Generated content still needs human content review.

The authoring pipeline independently samples topic, question type, difficulty, and answer position. It checks required fields, four options, answer bounds, explanation axes, the length-ratio range, and duplicate question text. A separate blind request must agree with the author key. Both requests use the configured model: agreement is a consistency check, not independent expert validation. Generated items remain unreviewed.

The bundled bank retains limitations, including unverified standard locators. Reordering options reduces position cues; it does not fix ambiguous questions, weak distractors, or factual errors. Human review should precede publishing new study content.

## Production deployment

The existing Vercel project is `aaig-exam-prep`. Its committed configuration selects Vite, installs with `npm ci`, builds with `npm run build`, and publishes only `dist`. Do not publish the repository root as static output. Link an authorized local checkout to the existing project, run `npm run verify`, and deploy the reviewed main commit. A successful local build alone is not proof that the public domain serves that commit.

## Contributions

Submit original scenarios with public reference links, version/date information, and explanations for each distractor. Only mark an item reviewed when the reviewer and review date are documented. Do not contribute real exam items or licensed QAE content.

The code is MIT licensed. Referenced trademarks, standards, and third-party materials retain their respective rights.
