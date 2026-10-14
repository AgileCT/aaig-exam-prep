# 🛡️ AAIG™ Exam Prep Master (Open-Source Study Platform)

> **The comprehensive, open-source exam simulator and Socratic AI study suite for the ISACA Advanced in AI Governance™ (AAIG™) certification.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://aaig-exam-prep.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Questions](https://img.shields.io/badge/Question%20Bank-317%20Verified%20Items-emerald?style=for-the-badge)](#-exam-domain-blueprint)
[![Flashcards](https://img.shields.io/badge/Flashcards-40%20Decks-indigo?style=for-the-badge)](#-3d-flip-flashcards)

🔗 **Live Platform**: [https://aaig-exam-prep.vercel.app](https://aaig-exam-prep.vercel.app)

---

## 💡 Why Open Source This Project?

The **ISACA Advanced in AI Governance™ (AAIG™)** certification is the industry gold standard credential for AI governance officers, risk managers, AI auditors, and compliance executives. However, high-quality, non-hallucinatory practice exams tailored to the **ISACA Governance Mindset** (top-down charters, Three Lines Model, ISO 42001, NIST AI RMF, EU AI Act) are scarce and expensive.

This project delivers a **100% free, client-first, open-source preparation suite** powered by an anti-bias question generation pipeline and a 4-mode Socratic AI tutor.

---

## 🎯 Key Features

### 1. ⏱️ Full 90-Item Mock Exam Simulator
- **Official ISACA Exam Engine**: 90 scenario-based questions, 150-minute countdown, question palette with answered / flagged / review filters.
- **Sprint Mode Option**: 25 questions in 40 minutes for rapid daily practice.
- **ISACA 200–800 Scaled Scoring**: Calculates scores with the official 450 passing threshold and domain-by-domain diagnostic feedback.

### 2. 📝 Comprehensive Practice Engine
- **317 Curated & Verified Questions** across all 4 official domains.
- **Instant Feedback & Trap Analysis**: Detailed explanations highlighting why the correct answer reflects ISACA doctrine and why each distractor is a common misconception.
- **Standard Citations**: Explicit references to ISO/IEC 42001 (AIMS), NIST AI RMF 1.0, EU AI Act, and COBIT 2019.

### 3. 🃏 40 High-Yield 3D Flip Flashcards
- Fast memorization for key regulatory definitions, risk tiers, and governance principles.
- Categorized by domain with self-assessment tracking (*Mastered / Review Needed*).

### 4. 🤖 StudyBase 4-Mode Socratic AI Tutor
- **Standard Mode**: Deep-dive explanations of tricky concepts and standards.
- **Socratic Mode**: Guides you to the right answer through strategic inquiry without spoiling the solution.
- **Teach-Back (Feynman) Mode**: You explain the governance concept in your own words, and the tutor critiques your reasoning.
- **Drill Mode**: Instantly generates scenario-based follow-up variations on weak topics.
- *Zero server intermediary*: Direct, secure browser-to-Gemini API communication with BYOK (Bring Your Own Key).

### 5. 🛡️ Dual-Gated Anti-Bias Question Generation Pipeline
Our offline generation pipeline (`scripts/generateQuestions.ts`) enforces strict quality gates:
1. **Length-Parity Gate**: Rejects candidate questions where the correct answer is significantly longer than distractors ($ratio \in [0.75, 1.45]$).
2. **Independent Blind Re-grader**: An independent LLM acts as an unassisted exam candidate; if its choice disagrees with the authored key, the question is discarded.
3. **Orthogonal Distractor Axes**: Every incorrect option is mapped to a distinct governance misconception (Priority vs. Timing vs. Scope/Authority).

---

## 📊 Exam Domain Blueprint

The question bank strictly adheres to the official ISACA blueprint distribution:

| Domain | Focus Area | Target Weight | Bank Items | Actual Share |
| :--- | :--- | :---: | :---: | :---: |
| **Domain 1** | **AI Enterprise Governance** (Board oversight, Steering Committee, Three Lines Model) | **30%** | 98 | 30.9% |
| **Domain 2** | **Data & AI Architecture Principles** (Data governance, Model Cards, algorithmic bias) | **20%** | 69 | 21.8% |
| **Domain 3** | **AI Risk, Security & Compliance** (NIST AI RMF, EU AI Act risk tiers, red-teaming) | **25%** | 76 | 24.0% |
| **Domain 4** | **AI Operations, Monitoring & Assurance** (ISO 42001 AIMS, drift telemetry, assurance) | **25%** | 74 | 23.3% |
| **Total** | **All 4 Domains** | **100%** | **317** | **100.0%** |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ or Bun

### 1. Clone & Install
```bash
git clone https://github.com/AgileCT/aaig-exam-prep.git
cd aaig-exam-prep
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

### 4. Run Automated Question Pipeline (Optional)
```bash
# Set your Gemini API key in .env: GEMINI_API_KEY=your_key_here
GEN_COUNT=50 GEN_CONCURRENCY=5 npx tsx scripts/generateQuestions.ts
```

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── Navbar.tsx                   # Top navigation with status and API Key modal
│   ├── Dashboard.tsx                # Readiness scores, domain meters, quick launch
│   ├── MockExamView.tsx             # 90-item & 25-item timed simulator + scaled score report
│   ├── QuizView.tsx                 # Instant-practice mode with trap breakdown
│   ├── FlashcardView.tsx            # 3D interactive flashcard deck
│   ├── ReviewNotebook.tsx           # Missed questions & bookmarked items
│   ├── AITutorModal.tsx             # 4-mode Socratic/Feynman AI tutor
│   ├── QuestionGeneratorModal.tsx   # In-app AI authoring tool
│   └── ApiKeyModal.tsx              # BYOK Gemini API key settings
├── data/
│   ├── domains.ts                   # Official domain breakdown and subdomains
│   ├── flashcards.ts                # 40 core flashcards
│   ├── questions.ts                 # Base questions + generated questions merger
│   └── generatedQuestions.ts        # 299 verified quality-gated questions
└── services/
    ├── storage.ts                   # LocalStorage persistence engine
    └── tutorPromptPolicy.ts         # StudyBase tutor prompt templates & policies
```

---

## 🤝 Contributing

Contributions are warmly welcomed! You can contribute by:
- Submitting new high-yield scenario questions adhering to ISO 42001 or NIST AI RMF.
- Adding additional flashcards for regulatory frameworks (e.g., ASEAN AI Guide, Singapore Model AI Governance).
- Enhancing tutor prompting and UI components.

Please submit a Pull Request or open an Issue!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
