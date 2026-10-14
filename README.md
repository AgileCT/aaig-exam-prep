# AAIG™ Study Companion

An independent, open-source AI governance practice tool with original and AI-generated scenarios, flashcards, timed practice, and an optional Gemini tutor.

**This project is not affiliated with or endorsed by ISACA. Its materials have not been reviewed or approved by ISACA. Practice results do not predict certification success.** AAIG™ is an ISACA trademark.

[Public application](https://aaig-exam-prep.vercel.app) · [MIT License](LICENSE)

The public deployment may lag behind repository changes. Check the deployed version before treating a fix as live.

## Learning features

- **Practice:** answer a question, view the author's explanation, bookmark it, and revisit missed questions. Options are reordered without changing question IDs or stored answer meanings.
- **Timed practice:** a 25-question/40-minute sprint or a product-defined 90-question/150-minute session. Results show raw correctness, sample counts, and performance by custom study category. These are practice formats, not a reproduction of the official exam engine or scaled scoring.
- **Flashcards:** track concepts as new, learning, or mastered.
- **Review notebook:** open the exact missed question for another attempt.
- **Optional AI tutor:** standard, Socratic, teach-back, and drill modes. AI output is unreviewed guidance. Without a key, the tutor uses clearly labeled local fallback content.
- **AI authoring:** generated drafts undergo structure and length checks before they can be saved. Those checks do not establish factual correctness or expert approval.

The bundled content contains 317 questions (18 authored seed questions and 299 generated questions) and 40 flashcards. Quantity is not evidence of answer quality. All bundled materials remain unreviewed until a documented human review establishes their status.

## Study categories and official information

The four categories below are this application's own learning organization. Percentages control practice sampling; they are not official AAIG exam weights.

| Category | Focus | Custom allocation |
|---|---|---:|
| D1 | AI Enterprise Governance | 30% |
| D2 | Data and AI Architecture Principles | 20% |
| D3 | AI Enterprise Integration & Performance Monitoring | 25% |
| D4 | Risk Oversight & Compliance Frameworks | 25% |

ISACA's public AAIG page currently lists three core areas: AI Enterprise Governance; Data and AI Architecture Principles; AI Enterprise Integration and Performance Monitoring. No official four-domain weights or 90-item AAIG blueprint were verified for this project. The beta participation page states a 150-minute exam duration. Check the current [AAIG certification page](https://www.isaca.org/credentialing/aaig) and [beta information](https://engage.isaca.org/volunteeropportunities/opportunities-list-public/volunteer-opportunity-details?VolunteerOpportunityKey=7ff38991-79c8-461e-9f01-01a0b56e7eb3) before planning an exam. Last public-source check: 2026-10-13.

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

`verify` runs regression tests, an offline content audit, and the TypeScript/production build. CI uses the same command. The audit reports structural failures and remaining topic/type concentration; it is not a model judge, domain expert review, or certification of correctness.

## AI processing and API key storage

The optional tutor and authoring tools send your messages and any attached question context directly to Google's Gemini API. Your key authenticates those requests using the `x-goog-api-key` header. Google may charge for usage under your account.

Keys are held in session storage by default. Explicitly selecting “remember” keeps the key in this browser's local storage; previously remembered keys retain their storage choice. Browser storage is not a secret vault. Clear a saved key from the settings panel when it is no longer needed. The app does not proxy requests through an AgileCT server.

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

The bundled bank retains limitations, including concentrated question types within some topics and unverified standard locators. Reordering options reduces position cues; it does not fix ambiguous questions, weak distractors, or factual errors. Human review should precede publishing new study content.

## Contributions

Submit original scenarios with public reference links, version/date information, and explanations for each distractor. Only mark an item reviewed when the reviewer and review date are documented. Do not contribute real exam items or licensed QAE content.

The code is MIT licensed. Referenced trademarks, standards, and third-party materials retain their respective rights.
