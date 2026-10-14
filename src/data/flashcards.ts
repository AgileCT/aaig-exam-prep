import { Flashcard } from '../types';

export const INITIAL_FLASHCARDS: Flashcard[] = [
  // =========================================================================
  // DOMAIN 1: AI ENTERPRISE GOVERNANCE (30%)
  // =========================================================================
  {
    id: 'fc-01',
    domainId: 'D1',
    topic: 'Three Lines Model in AI Governance',
    front: 'What are the distinct responsibilities of the IIA Three Lines Model in Enterprise AI Governance?',
    back: '1. First Line (Operational Management & Engineering): Owns, develops, and directly manages AI risks; responsible for day-to-day model compliance, testing, and operational controls.\n2. Second Line (Risk Management & AI Governance Committee): Establishes governance frameworks, policies, and risk thresholds; conducts independent challenge and monitors compliance.\n3. Third Line (Internal Audit): Reports independently to the Board/Audit Committee, providing objective assurance on the overall design and operating effectiveness of AI governance.',
    source: 'ISACA AAIG D1; IIA Three Lines Model; COBIT 2019',
    keyTakeaway: 'Strict separation of duties: The Second Line provides policy and challenge, but NEVER assumes or accepts operational business risk on behalf of the First Line.'
  },
  {
    id: 'fc-02',
    domainId: 'D1',
    topic: 'AI Governance Steering Committee Charter',
    front: 'What is the PRIMARY mandate when establishing an enterprise AI Governance Steering Committee?',
    back: 'To formalize a cross-functional Governance Charter, establish clear decision rights (RACI), define the organizational AI risk appetite, and ensure all AI investments directly align with corporate business strategy and ethical principles.',
    source: 'ISACA AAIG D1; NIST AI RMF GOVERN 1.1; ISO/IEC 42001 Cl. 5',
    keyTakeaway: 'Governance First: Policies, risk appetite, and decision rights must precede tool procurement or ad-hoc technical architecture.'
  },
  {
    id: 'fc-03',
    domainId: 'D1',
    topic: 'AI Acceptable Use Policy (AUP)',
    front: 'What core components must an enterprise AI Acceptable Use Policy (AUP) enforce?',
    back: '1. Inventory of approved vs. unapproved AI applications;\n2. Strict data classification restrictions (e.g., prohibited confidential or PII inputs);\n3. Mandatory human review requirements for high-impact outputs;\n4. Mandatory incident reporting protocols for model hallucinations, bias, or data leakage.',
    source: 'ISACA AAIG D1; ISO/IEC 42001 Cl. 5.2',
    keyTakeaway: 'An effective AUP provides clear enforceable boundaries and safe pathways, rather than vague reminders to "use good judgment."'
  },
  {
    id: 'fc-04',
    domainId: 'D1',
    topic: 'AI Risk Appetite vs. Risk Tolerance',
    front: 'How do Risk Appetite and Risk Tolerance differ in the context of enterprise AI governance?',
    back: '1. Risk Appetite: The broad amount and type of risk an organization is intentionally willing to accept in pursuit of its strategic AI objectives (set by the Board).\n2. Risk Tolerance: The specific, measurable boundaries and acceptable variations around risk targets (e.g., maximum permissible error rates or drift thresholds before escalation).',
    source: 'ISACA AAIG D1; COBIT 2019 EDM03',
    keyTakeaway: 'Appetite sets the strategic posture; tolerance defines the quantitative operational thresholds.'
  },
  {
    id: 'fc-05',
    domainId: 'D1',
    topic: 'OECD AI Principles',
    front: 'What are the five core value-based OECD AI Principles for responsible stewardship of trustworthy AI?',
    back: '1. Inclusive growth, sustainable development, and well-being;\n2. Human-centered values and fairness (human rights, dignity, diversity);\n3. Transparency and explainability;\n4. Robustness, security, and safety;\n5. Accountability for organizations and individuals developing, deploying, or operating AI systems.',
    source: 'OECD AI Principles (2019/2024); ISACA AAIG D1',
    keyTakeaway: 'OECD principles form the international policy baseline that inspired the EU AI Act and NIST AI RMF.'
  },
  {
    id: 'fc-06',
    domainId: 'D1',
    topic: 'Shadow AI Governance & Discovery',
    front: 'What is "Shadow AI", and what is the primary governance mechanism to manage it without stifling innovation?',
    back: 'Shadow AI refers to employees or departments utilizing unsanctioned, consumer-grade AI tools (e.g., unapproved ChatGPT accounts) for corporate workflows.\nThe governance response is: 1) Deploy automated discovery (CASB/SWG web traffic auditing); 2) Provide official, approved enterprise alternatives with enterprise privacy SLAs; 3) Train workforce on data exposure risks.',
    source: 'ISACA AAIG D1; ISO/IEC 42001 A.6.2',
    keyTakeaway: 'Prohibition alone fails: Shadow AI is managed by providing vetted, secure enterprise channels paired with clear acceptable use policies.'
  },
  {
    id: 'fc-07',
    domainId: 'D1',
    topic: 'Board Oversight & Fiduciary Responsibility',
    front: 'What is the fiduciary duty of the Board of Directors regarding artificial intelligence systems?',
    back: 'The Board is responsible for oversight, not day-to-day management. Fiduciary duty requires ensuring that management establishes an effective AI risk management system, defining risk appetite, monitoring systemic compliance, and challenging management on ethical and legal AI exposures.',
    source: 'ISACA AAIG D1; COBIT 2019 EDM01; Caremark Doctrine',
    keyTakeaway: 'The Board cannot delegate its ultimate accountability: Oversight of material AI risk is a direct board governance duty.'
  },
  {
    id: 'fc-08',
    domainId: 'D1',
    topic: 'AI Ethics Advisory Board vs. AI Steering Committee',
    front: 'How do an AI Ethics Advisory Board and an AI Steering Committee differ in mandate and authority?',
    back: '1. AI Steering Committee: Has operational and strategic decision rights, budget authority, and policy approval powers (governance body).\n2. AI Ethics Advisory Board: Typically an advisory group (often including external experts, ethicists, and community representatives) that provides non-binding guidance, ethical reviews, and societal impact evaluations.',
    source: 'ISACA AAIG D1; NIST AI RMF GOVERN 1.3',
    keyTakeaway: 'The Ethics Board advises; the Steering Committee decides and enforces.'
  },
  {
    id: 'fc-09',
    domainId: 'D1',
    topic: 'AI Literacy & Workforce Competence',
    front: 'Why does ISO/IEC 42001 and the EU AI Act explicitly mandate AI Literacy for organizations?',
    back: 'Under Article 4 of the EU AI Act and ISO 42001 Clause 7.2, organizations must ensure personnel developing, operating, or overseeing AI possess adequate technical and ethical literacy proportional to their role to prevent misuse, recognize algorithmic bias, and ensure effective human oversight.',
    source: 'EU AI Act Art. 4; ISO/IEC 42001 Cl. 7.2',
    keyTakeaway: 'AI literacy is a statutory compliance requirement, not merely a voluntary HR training exercise.'
  },
  {
    id: 'fc-10',
    domainId: 'D1',
    topic: 'AI Whistleblowing & Safe Harbor Channels',
    front: 'Why should AI governance frameworks establish dedicated ethical reporting and safe harbor channels?',
    back: 'To empower data scientists, engineers, and employees to escalate ethical concerns, suppressed benchmark failures, or algorithmic harms without fear of retaliation, enabling early internal containment before regulatory scrutiny or public whistleblowing.',
    source: 'ISACA AAIG D1; NIST AI RMF GOVERN 4.2',
    keyTakeaway: 'Safe escalation channels protect the enterprise by catching systemic safety or bias flaws internally before deployment.'
  },

  // =========================================================================
  // DOMAIN 2: DATA AND AI ARCHITECTURE PRINCIPLES (20%)
  // =========================================================================
  {
    id: 'fc-11',
    domainId: 'D2',
    topic: 'Model Cards & AI Asset Inventory',
    front: 'Why are Model Cards indispensable for AI asset governance, and what core elements must they contain?',
    back: 'Model Cards provide structured transparency and accountability metadata, including:\n1. Intended Use and explicit out-of-scope / prohibited use cases;\n2. Training and evaluation dataset lineage, provenance, and known limitations;\n3. Subgroup performance benchmarks, fairness audits, and bias evaluations;\n4. Accountable model owner, risk classification tier, and change history.',
    source: 'ISACA AAIG D2; NIST AI RMF MAP 1.1; ISO/IEC 42001 Cl. 8.2',
    keyTakeaway: 'A code repository is not an asset inventory: Enterprise governance requires business purpose, risk tier, data sensitivity, and accountable ownership.'
  },
  {
    id: 'fc-12',
    domainId: 'D2',
    topic: 'Data Drift vs. Concept Drift',
    front: 'What is the fundamental difference between Data Drift and Concept Drift?',
    back: '1. Data Drift (Covariate Shift): Changes in the statistical distribution of input features P(X), such as shifts in customer demographics or user prompt language patterns over time.\n2. Concept Drift: Changes in the underlying statistical relationship between input features and target labels P(Y|X), such as fraudsters altering tactics so previously benign transactions now represent fraud.',
    source: 'ISACA AAIG D2; ISO/IEC 23894',
    keyTakeaway: 'Continuous baseline telemetry: Data drift monitors the input distribution; concept drift monitors the fundamental prediction relationship.'
  },
  {
    id: 'fc-13',
    domainId: 'D2',
    topic: 'Proxy Discrimination & Algorithmic Fairness',
    front: 'What is Proxy Discrimination in AI training datasets, and why is it difficult to detect?',
    back: 'Proxy discrimination occurs when an AI system inadvertently learns to discriminate based on protected characteristics (e.g., race, gender, religion) through neutral correlated variables (e.g., zip code, alma mater, browsing patterns) even when protected attributes are explicitly excluded from training data.',
    source: 'ISACA AAIG D2; NIST AI RMF MEASURE 2.11',
    keyTakeaway: 'Blinding a model to sensitive attributes is insufficient: Rigorous fairness testing and disparate impact analyses are required.'
  },
  {
    id: 'fc-14',
    domainId: 'D2',
    topic: 'Data Provenance & Lineage Tracking',
    front: 'Why is immutable data provenance critical for AI defensibility and regulatory audits?',
    back: 'Data provenance documents the complete lifecycle chain of custody: raw source collection, legal basis for processing, transformation pipelines, data splits, and synthetic augmentations. Without lineage, deployers cannot defend against copyright infringement claims, PII erasure requests (GDPR Right to be Forgotten), or training data poisoning investigations.',
    source: 'ISACA AAIG D2; ISO/IEC 42001 Cl. 8.2',
    keyTakeaway: 'If you cannot trace the data lineage, you cannot defend the model in a regulatory or legal proceeding.'
  },
  {
    id: 'fc-15',
    domainId: 'D2',
    topic: 'Synthetic Data Governance',
    front: 'What key risks must be managed when utilizing synthetic data for AI model development?',
    back: '1. Model Collapse: Recursive training on synthetic data degrades output quality and loses real-world tail distributions;\n2. Amplified Hallucinations: Biases present in the generating model are encoded and magnified in downstream systems;\n3. False Sense of Anonymity: Improperly generated synthetic records can still leak source PII through membership inference attacks.',
    source: 'ISACA AAIG D2; ISO/IEC 23894',
    keyTakeaway: 'Synthetic data requires rigorous statistical fidelity validation, diversity audits, and privacy leakage testing.'
  },
  {
    id: 'fc-16',
    domainId: 'D2',
    topic: 'Datasheets for Datasets',
    front: 'What is a "Datasheet for Datasets" and how does it support AI compliance?',
    back: 'Proposed by Gebru et al., a Datasheet documents the motivation, composition, collection process, preprocessing, uses, and distribution of a dataset. It enables auditors and deployers to identify sampling bias, demographic exclusions, and copyright legality before training occurs.',
    source: 'ISACA AAIG D2; NIST AI RMF MAP 1.2',
    keyTakeaway: 'Datasheets document dataset creation and limitations, ensuring data quality standards under EU AI Act Art. 10.'
  },
  {
    id: 'fc-17',
    domainId: 'D2',
    topic: 'Differential Privacy in AI',
    front: 'What is Differential Privacy (DP), and how does it protect training data from extraction?',
    back: 'Differential Privacy adds mathematically calibrated noise (e.g., Laplace or Gaussian) to queries or gradient updates during training (DP-SGD) to ensure that the output does not reveal whether any individual record was present in the dataset, effectively neutralizing membership inference attacks.',
    source: 'ISACA AAIG D2; NIST AI RMF MEASURE 2.5',
    keyTakeaway: 'Differential privacy provides provable mathematical guarantees against model data extraction and membership inference.'
  },
  {
    id: 'fc-18',
    domainId: 'D2',
    topic: 'Vector Database & Embedding Governance',
    front: 'What specific security and privacy controls are required for vector databases in RAG architectures?',
    back: '1. Permission-aware retrieval (access-control lists embedded in vector metadata);\n2. Encryption in transit and at rest for embedding vectors and source text chunks;\n3. Regular index purging synchronized with enterprise data retention and GDPR Right to Erasure mandates.',
    source: 'ISACA AAIG D2; NIST SP 800-218',
    keyTakeaway: 'Vector stores are data repositories: They must enforce identity-based access control, encryption, and lifecycle deletion.'
  },
  {
    id: 'fc-19',
    domainId: 'D2',
    topic: 'Disparate Impact vs. Disparate Treatment',
    front: 'How do "Disparate Treatment" and "Disparate Impact" differ in AI legal compliance?',
    back: '1. Disparate Treatment: Intentional discrimination where an algorithm explicitly uses protected class status to treat individuals differently.\n2. Disparate Impact: Unintentional discrimination where an ostensibly neutral practice or algorithmic model disproportionately disadvantages a protected subgroup in practice (the 80% / Four-Fifths Rule).',
    source: 'ISACA AAIG D2; US EEOC / Title VII; EU AI Act Art. 10',
    keyTakeaway: 'Lack of discriminatory intent is not a legal defense against demonstrable disparate impact.'
  },
  {
    id: 'fc-20',
    domainId: 'D2',
    topic: 'Data Minimization for Generative AI',
    front: 'How is the principle of Data Minimization applied to prompt engineering and retrieval-augmented generation (RAG)?',
    back: '1. Scrubbing prompts client-side to strip direct identifiers (SSNs, names, phone numbers) before API transmission;\n2. Limiting RAG chunk retrieval to the minimum necessary context rather than indexing entire unbounded document repositories;\n3. Disabling vendor logging or negotiating zero-data-retention (ZDR) agreements.',
    source: 'ISACA AAIG D2; GDPR Article 5(1)(c); ISO/IEC 42001 A.7.2',
    keyTakeaway: 'Send only what the model strictly needs to answer the immediate prompt, and retain nothing unnecessary.'
  },

  // =========================================================================
  // DOMAIN 3: AI ENTERPRISE INTEGRATION & PERFORMANCE MONITORING (25%)
  // =========================================================================
  {
    id: 'fc-21',
    domainId: 'D3',
    topic: 'Buy vs. Build AI Governance Criteria',
    front: 'What are the critical governance considerations when evaluating commercial third-party foundation models versus in-house development?',
    back: '1. Data Rights & Confidentiality: Ensuring enterprise prompts and corporate data are not retained or used for vendor model retraining;\n2. Vendor Concentration & Exit Strategy: Portability of prompts/embeddings and operational resilience;\n3. Total Cost of Ownership (TCO): Long-term API operational expenses, security alignment, and continuous validation overhead.',
    source: 'ISACA AAIG D3; COBIT BAI03; NIST AI RMF GOVERN 3.1',
    keyTakeaway: 'Outsourcing the technology does not outsource accountability: Legal and regulatory deployer liabilities remain strictly with the enterprise.'
  },
  {
    id: 'fc-22',
    domainId: 'D3',
    topic: 'Explainability & Contestability (XAI)',
    front: 'Why is "black-box" AI unacceptable for high-impact enterprise decisions (e.g., credit underwriting, hiring)?',
    back: 'A lack of explainability directly impedes:\n1. Contestability: Inability to provide affected individuals with legally mandated adverse action notices or appeal avenues;\n2. Regulatory Defense: Failure to prove absence of proxy discrimination or algorithmic bias;\n3. Effective Human Oversight: Human-in-the-loop reviewers cannot evaluate edge cases without interpretable rationales.',
    source: 'ISACA AAIG D3; EU AI Act Art. 13; NIST AI RMF MEASURE 2.8',
    keyTakeaway: 'High-impact decisions require explainability and human contestability to remain legally defensible.'
  },
  {
    id: 'fc-23',
    domainId: 'D3',
    topic: 'Model Retraining & Controlled Change Management',
    front: 'What governance approvals and controls must precede deploying a retrained production model?',
    back: '1. Analysis of drift triggers and verification of newly curated training data quality;\n2. Benchmark regression testing against performance, robustness, and fairness baselines;\n3. Documented sign-off from the Model Asset Owner and 2nd-line Risk authority;\n4. Pre-configured rollback strategies and post-deployment canary telemetry.',
    source: 'ISACA AAIG D3; ISO/IEC 42001 Cl. 8.1; COBIT BAI06',
    keyTakeaway: 'Retraining is a material system change: It requires change control documentation, risk sign-off, and rollback readiness.'
  },
  {
    id: 'fc-24',
    domainId: 'D3',
    topic: 'Circuit Breakers & AI Kill Switches',
    front: 'What is an AI "Circuit Breaker" or "Kill Switch", and who should hold the decision rights to trigger it?',
    back: 'An automated or manual containment control that halts or throttles model inference, rerouting transactions to deterministic fallback rules or human reviewers when anomalies or harm occur.\nDecision rights must be predefined in the AI Incident Playbook, granting explicit authority to designated AI Governance / Incident Commanders to disable production models immediately.',
    source: 'ISACA AAIG D3; NIST AI RMF MANAGE 2.4',
    keyTakeaway: 'Containment authority cannot be ambiguous during active harm: Decision rights to pull the plug must be pre-authorized.'
  },
  {
    id: 'fc-25',
    domainId: 'D3',
    topic: 'Human-in-the-Loop (HITL) vs. Human-on-the-Loop (HOTL)',
    front: 'What is the operational and governance distinction between HITL, HOTL, and HIC (Human-in-Command)?',
    back: '1. Human-in-the-Loop (HITL): Human must review and approve every individual output before execution (highest control, lowest latency);\n2. Human-on-the-Loop (HOTL): System executes autonomously in real-time, but a human monitors telemetry and can intervene or abort;\n3. Human-in-Command (HIC): Human oversees overall system deployment, context, and operational bounds, deciding whether and when the AI should run at all.',
    source: 'ISACA AAIG D3; EU AI Act Art. 14; NIST AI RMF GOVERN 2.1',
    keyTakeaway: 'High-risk systems mandate meaningful human oversight—automation bias (rubber-stamping) invalidates HITL compliance.'
  },
  {
    id: 'fc-26',
    domainId: 'D3',
    topic: 'Automation Bias Mitigation',
    front: 'What is Automation Bias, and how must governance frameworks mitigate it in human reviewers?',
    back: 'Automation bias is the human tendency to uncritically trust and rubber-stamp AI-generated recommendations.\nMitigation requires: 1) Designing user interfaces that require affirmative reviewer justification rather than single-click approvals; 2) Periodic unannounced "sanity audits" injecting synthetic errors; 3) Training reviewers on known model limitations.',
    source: 'ISACA AAIG D3; EU AI Act Art. 14',
    keyTakeaway: 'Human oversight is legally valid only if the human has the competency, authority, and inclination to challenge the AI.'
  },
  {
    id: 'fc-27',
    domainId: 'D3',
    topic: 'AI Total Cost of Ownership (TCO)',
    front: 'What often-overlooked lifecycle cost components must be included in enterprise AI TCO calculations?',
    back: 'Beyond initial model licensing/training compute: 1) Ongoing continuous monitoring and drift detection infrastructure; 2) Periodic retraining and data curation labor; 3) Security alignment and red-teaming costs; 4) Legal, compliance, conformity assessment, and third-party audit fees; 5) Exit and data migration expenses.',
    source: 'ISACA AAIG D3; COBIT 2019 BAI03',
    keyTakeaway: 'Model training/inference is only the tip of the iceberg: Governance and lifecycle maintenance dominate real enterprise TCO.'
  },
  {
    id: 'fc-28',
    domainId: 'D3',
    topic: 'Key Performance Indicators (KPIs) vs. Key Risk Indicators (KRIs)',
    front: 'How do AI KPIs and KRIs differ in governance performance reporting?',
    back: '1. KPIs (Value & Efficiency): Measure business outcomes (e.g., customer resolution time saved, query latency, user adoption rate, cost per transaction).\n2. KRIs (Risk Signaling): Forward-looking metrics signaling increasing risk exposure before harm occurs (e.g., rate of drift deviation, number of guardrail blocks, fairness disparity index, percentage of unclassified prompts).',
    source: 'ISACA AAIG D3; COBIT 2019 MEA01',
    keyTakeaway: 'KPIs track value creation; KRIs serve as early-warning tripwires for governance intervention.'
  },
  {
    id: 'fc-29',
    domainId: 'D3',
    topic: 'Hallucination Mitigation & Output Grounding',
    front: 'What architectural and governance mechanisms best mitigate generative AI hallucination risk?',
    back: '1. Retrieval-Augmented Generation (RAG) anchoring model answers in verified corporate knowledge stores;\n2. Enforcing strict citation and attribution requirements in system prompts;\n3. Setting lower generation temperature parameters for factual tasks;\n4. Implementing automated guardrail classifiers that check for factual inconsistency before output display.',
    source: 'ISACA AAIG D3; NIST AI RMF MEASURE 2.6',
    keyTakeaway: 'Grounding anchors models in authoritative facts; guardrails catch fabricated claims before user exposure.'
  },
  {
    id: 'fc-30',
    domainId: 'D3',
    topic: 'Post-Market Monitoring Obligations',
    front: 'What constitutes compliant "Post-Market Monitoring" under ISO/IEC 42001 and the EU AI Act?',
    back: 'An active, continuous process of collecting, documenting, and analyzing real-world performance, user complaints, unforeseen failure modes, and safety incidents throughout the operational life of the deployed system, feeding directly into ongoing risk re-evaluations.',
    source: 'EU AI Act Art. 72; ISO/IEC 42001 Cl. 9.1',
    keyTakeaway: 'Governance does not end at deployment: Post-market monitoring is a legally required continuous feedback loop.'
  },

  // =========================================================================
  // DOMAIN 4: RISK OVERSIGHT & COMPLIANCE FRAMEWORKS (25%)
  // =========================================================================
  {
    id: 'fc-31',
    domainId: 'D4',
    topic: 'EU AI Act Risk Classification Pyramid',
    front: 'How does the EU AI Act categorize artificial intelligence systems under its risk-based framework?',
    back: '1. Unacceptable Risk: Completely prohibited (e.g., social scoring, cognitive behavioral manipulation, real-time remote biometrics in public spaces);\n2. High-Risk: Strictly regulated; mandatory fundamental rights impact assessment, conformity assessment, and CE-marking (e.g., employment, credit, critical infrastructure);\n3. Limited Risk: Specific transparency duties (e.g., AI chatbots must disclose AI identity; synthetic deepfakes must be watermarked);\n4. Minimal / No Risk: Permitted with no mandatory compliance burdens (e.g., spam filters, video games).',
    source: 'EU AI Act Articles 5, 6, 50; ISACA AAIG D4',
    keyTakeaway: 'Risk-proportional regulation: High-risk systems demand pre-market conformity assessments; limited risk requires user transparency disclosure.'
  },
  {
    id: 'fc-32',
    domainId: 'D4',
    topic: 'ISO/IEC 42001:2023 (AIMS) & Statement of Applicability',
    front: 'What is ISO/IEC 42001, and what is the function of the Statement of Applicability (SoA)?',
    back: 'ISO/IEC 42001 is the international certifiable standard for an Artificial Intelligence Management System (AIMS) based on the Plan-Do-Check-Act (PDCA) lifecycle.\nThe Statement of Applicability (SoA) formally documents which Annex A controls the organization has selected or excluded, supported by risk assessment justifications and legal compliance obligations.',
    source: 'ISO/IEC 42001:2023 Cl. 6.1.3; ISACA AAIG D4',
    keyTakeaway: 'The SoA bridges enterprise risk assessment with standardized Annex A control selection.'
  },
  {
    id: 'fc-33',
    domainId: 'D4',
    topic: 'NIST AI RMF 1.0 Core Functions',
    front: 'What are the four core functions of NIST AI RMF 1.0, and how do they interact?',
    back: '1. GOVERN: Foundational cross-cutting function cultivating organizational risk culture, workforce competency, and top-down oversight policies;\n2. MAP: Contextualizes organizational context, categorizes use cases, and identifies potential societal and enterprise harms;\n3. MEASURE: Quantifies and assesses trustworthiness characteristics, bias, and performance metrics;\n4. MANAGE: Implements risk treatments, monitoring thresholds, and incident response procedures.',
    source: 'NIST AI RMF 1.0 Section 5; ISACA AAIG D4',
    keyTakeaway: 'GOVERN is the cornerstone function that enables and informs MAP, MEASURE, and MANAGE throughout the AI lifecycle.'
  },
  {
    id: 'fc-34',
    domainId: 'D4',
    topic: 'General Purpose AI (GPAI) Obligations',
    front: 'What obligations does the EU AI Act impose on providers of General Purpose AI (GPAI) models?',
    back: '1. Baseline GPAI: Maintain technical documentation, model summary descriptions, and respect EU copyright reservations (Article 4(3) Directive 2019/790);\n2. GPAI with Systemic Risk (>10^25 FLOPs cumulative compute): Mandatory model evaluation, adversarial red-teaming, energy efficiency monitoring, and cybersecurity incident reporting to the European AI Office.',
    source: 'EU AI Act Articles 51–55; ISACA AAIG D4',
    keyTakeaway: 'Systemic GPAI foundation models carry heightened cross-border testing and reporting duties directly overseen by the AI Office.'
  },
  {
    id: 'fc-35',
    domainId: 'D4',
    topic: 'Third-Party AI Supply Chain Due Diligence',
    front: 'What due diligence steps must be executed prior to onboarding third-party AI vendors?',
    back: '1. Review third-party SOC 2 Type II / ISO 42001 certifications and independent model audit reports;\n2. Contractual audit rights and verification of prompt data retention/training restrictions;\n3. Review vendor SLAs, model update change-notification schedules, and upstream model dependencies (e.g., open-source weights sources).',
    source: 'ISACA AAIG D4; ISO/IEC 42001 Cl. 8.4',
    keyTakeaway: 'Vendor risk management requires binding contractual warranties, audit rights, and architectural transparency.'
  },
  {
    id: 'fc-36',
    domainId: 'D4',
    topic: 'Fundamental Rights Impact Assessment (FRIA)',
    front: 'When is a Fundamental Rights Impact Assessment (FRIA) mandatory under the EU AI Act?',
    back: 'Under Article 27 of the EU AI Act, deployers of High-Risk AI systems (especially public bodies, financial institutions, and insurance entities) must conduct a FRIA before deploying the system to evaluate specific risks to human dignity, privacy, non-discrimination, freedom of expression, and access to essential services.',
    source: 'EU AI Act Article 27; ISACA AAIG D4',
    keyTakeaway: 'FRIA ensures that high-risk deployments evaluate constitutional human rights protections alongside traditional technical risk metrics.'
  },
  {
    id: 'fc-37',
    domainId: 'D4',
    topic: 'ISO/IEC 23894 AI Risk Management',
    front: 'What is ISO/IEC 23894 and how does it relate to ISO 31000?',
    back: 'ISO/IEC 23894 provides guidance on managing AI-related risks based on the generic ISO 31000 risk management framework. It details AI-specific risk identification (e.g., autonomous agency, opacity, data poisoning), risk analysis, evaluation against risk criteria, and risk treatment throughout the AI lifecycle.',
    source: 'ISO/IEC 23894:2023; ISACA AAIG D4',
    keyTakeaway: 'ISO 23894 applies the established ISO 31000 risk process specifically to unique AI lifecycle vulnerabilities.'
  },
  {
    id: 'fc-38',
    domainId: 'D4',
    topic: 'AI Incident Reporting Timelines',
    front: 'What are the regulatory notification requirements when a serious AI safety incident occurs under the EU AI Act?',
    back: 'Providers of High-Risk AI systems must report any serious incident (resulting in death, serious bodily injury, critical infrastructure disruption, or fundamental rights breaches) to relevant national market surveillance authorities immediately, and no later than 15 calendar days after becoming aware of the incident.',
    source: 'EU AI Act Article 73; ISACA AAIG D4',
    keyTakeaway: 'Serious AI incidents have statutory 15-day reporting deadlines to regulatory authorities.'
  },
  {
    id: 'fc-39',
    domainId: 'D4',
    topic: 'Conformity Assessment Procedures (CE-Marking)',
    front: 'What is an AI Conformity Assessment under the EU AI Act, and what are the two main pathways?',
    back: 'A mandatory evaluation proving a High-Risk AI system satisfies all essential requirements (Articles 8–15: risk management, data governance, technical docs, record-keeping, transparency, human oversight, accuracy/robustness).\nPathways: 1) Internal control (self-assessment by deployer/provider for Annex III items); 2) Third-party assessment by a Notified Body (mandatory for biometric identification systems).',
    source: 'EU AI Act Article 43, Annexes VI & VII; ISACA AAIG D4',
    keyTakeaway: 'Without a successfully completed conformity assessment and CE-mark, high-risk AI cannot be legally placed on the EU market.'
  },
  {
    id: 'fc-40',
    domainId: 'D4',
    topic: 'Adversarial Robustness & Red Teaming',
    front: 'What is AI Red Teaming and what attack vectors must governance frameworks mandate testing against?',
    back: 'AI Red Teaming is simulated adversarial testing to identify vulnerabilities, hallucinations, and safety failures.\nCritical vectors include: 1) Direct and indirect prompt injection; 2) Jailbreaking and guardrail bypass; 3) Data poisoning and backdoor triggers; 4) Model inversion and training data extraction; 5) Denial-of-wallet / resource exhaustion attacks.',
    source: 'ISACA AAIG D4; NIST AI RMF MEASURE 2.4; OWASP LLM Top 10',
    keyTakeaway: 'Red teaming is a proactive assurance control validating whether security guardrails hold against adversarial exploitation.'
  }
];
