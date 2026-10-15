import { Flashcard } from '../types';
import { draftSource } from '../services/questionOrder';
import { normalizeFlashcardDomain } from '../services/domainTaxonomy';

const FLASHCARD_DRAFTS: Flashcard[] = [
  // =========================================================================
  // DOMAIN 1: AI ENTERPRISE GOVERNANCE (30%)
  // =========================================================================
  {
    id: 'fc-01',
    domainId: 'D1',
    topic: 'Three Lines Model in AI Governance',
    front: 'What are the distinct responsibilities of the IIA Three Lines Model in Enterprise AI Governance?',
    back: "Under the IIA Three Lines Model (2020) applied to AI governance (overseen by the Governing Body / Board, which sets strategic direction and risk appetite): 1. First Line Roles (Operational Management & AI Delivery Teams): Directly own, assess, and manage operational AI risks, executing day-to-day testing, validation, and controls; 2. Second Line Roles (Enterprise Risk Management & AI Compliance — also part of Management): Provide complementary expertise, establish risk frameworks, policies, and thresholds within delegated authority, monitor compliance, and provide objective, credible challenge to First Line decisions; 3. Third Line Roles (Internal Audit): Maintain independence from management and report to the Governing Body/Audit Committee, providing independent and objective assurance on the adequacy and effectiveness of AI governance and risk management.",
    source: "The IIA's Three Lines Model (July 2020), Principles 1–5; NIST AI RMF 1.0 GOVERN 1.2 & 1.3; COBIT 2019 (verify specific governance/management objectives against licensed text).",
    keyTakeaway: "Both First and Second Line roles belong to management: First Line owns operational AI risk, Second Line provides policy oversight and objective challenge within delegated authority, and Third Line (Internal Audit) provides independent assurance to the Governing Body."
  },
  {
    id: 'fc-02',
    domainId: 'D1',
    topic: 'AI Governance Steering Committee Charter',
    front: 'What is the PRIMARY mandate when establishing an enterprise AI Governance Steering Committee?',
    back: "To operate under formally delegated authority from top management or the governing body through a cross-functional Governance Charter that defines decision rights and accountabilities (e.g., RACI), recommends or operationalizes approved AI risk appetite and tolerance thresholds, and aligns AI investments with corporate strategy, legal obligations, and ethical principles.",
    source: "NIST AI RMF 1.0 GOVERN 1.2, 1.3 & 2.1; IIA Three Lines Model (2020); ISO/IEC 42001:2023 Cl. 5 (verify exact subclause against licensed standard).",
    keyTakeaway: "An AI Governance Steering Committee establishes authorized decision rights and risk guardrails across the portfolio while allowing urgent operational harms or exposures to be contained in parallel."
  },
  {
    id: 'fc-03',
    domainId: 'D1',
    topic: 'AI Acceptable Use Policy (AUP)',
    front: 'What core components must an enterprise AI Acceptable Use Policy (AUP) enforce?',
    back: "1. Approved vs. Prohibited AI Tools and Use Cases: Clear criteria distinguishing sanctioned enterprise AI systems from unapproved consumer tools; 2. Data Classification and Handling Rules: Defining permitted vs. prohibited inputs (e.g., barring confidential, trade-secret, or regulated personal data from unvetted or public models, while specifying controls and legal bases for approved enterprise environments); 3. Risk-Proportionate Human Oversight: Specifying verification and review requirements calibrated to use-case impact; 4. Incident and Escalation Protocols: Clear channels for reporting suspected data leakage, security vulnerabilities, bias, or harmful outputs.",
    source: "GDPR Arts. 5 & 6; NIST AI 600-1 GOVERN 1.2; ISO/IEC 42001:2023 (verify policy clauses against licensed standard).",
    keyTakeaway: "An effective AI Acceptable Use Policy defines enforceable boundaries for approved tools, data classification, risk-proportionate human oversight, and incident reporting."
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
    back: "Under the OECD Recommendation on AI (OECD/LEGAL/0449, updated in May 2024), the five complementary values-based principles are: 1. Inclusive growth, sustainable development, and well-being; 2. Human rights and democratic values, including fairness and privacy (upholding rule of law, human rights, democratic and human-centred values, privacy, data protection, and non-discrimination); 3. Transparency and explainability; 4. Robustness, security, and safety; 5. Accountability for AI actors across the AI system lifecycle.",
    source: "OECD Recommendation of the Council on Artificial Intelligence (OECD/LEGAL/0449, 2019 / amended 2024), Section 1.",
    keyTakeaway: "Updated in 2024, the five OECD AI Principles serve as a foundational international reference point for trustworthy AI governance; organizations must still map specific legal obligations to each applicable jurisdiction and standard."
  },
  {
    id: 'fc-06',
    domainId: 'D1',
    topic: 'Shadow AI Governance & Discovery',
    front: 'What is "Shadow AI", and what is the primary governance mechanism to manage it without stifling innovation?',
    back: "'Shadow AI' refers to employees or business units using unsanctioned AI tools, models, or APIs (such as unapproved consumer generative AI accounts) outside formal governance controls. Effective governance combines: 1) Assessing unsanctioned AI usage and containing urgent data exposures using environment-appropriate discovery controls (e.g., software inventories, expense/procurement reviews, or CASB/SWG telemetry); 2) Providing vetted, secure enterprise AI alternatives with contractual data-privacy protections; and 3) Enforcing clear acceptable-use policies alongside role-appropriate workforce training.",
    source: "NIST AI 600-1 GOVERN 1.2 & 1.6; ISO/IEC 42001:2023 (verify Annex A controls against licensed standard).",
    keyTakeaway: "Managing Shadow AI requires pairing clear acceptable-use boundaries and environment-appropriate discovery controls with approved, secure enterprise AI alternatives."
  },
  {
    id: 'fc-07',
    domainId: 'D1',
    topic: 'Board Oversight & Fiduciary Responsibility',
    front: 'What is the fiduciary duty of the Board of Directors regarding artificial intelligence systems?',
    back: "Across corporate governance frameworks, the Governing Body (Board of Directors) is responsible for strategic oversight and accountability rather than day-to-day management. This includes approving organizational AI risk appetite, ensuring management establishes an effective AI governance and risk management system, and monitoring material legal, ethical, and operational exposures. Under US (Delaware) corporate law (the Caremark doctrine), directors must make a good-faith effort to ensure that a reasonable board-level information and reporting system exists and is monitored for mission-critical compliance and safety risks.",
    source: "IIA Three Lines Model (2020) Principle 2; NIST AI RMF 1.0 GOVERN 1.2; In re Caremark Int'l Inc. Deriv. Litig., 698 A.2d 959 (Del. Ch. 1996); COBIT 2019 EDM01 (verify against licensed text).",
    keyTakeaway: "While management executes day-to-day AI controls, the Board retains oversight accountability for ensuring enterprise AI risk management and reporting systems exist and operate effectively (including Caremark oversight duties in applicable US jurisdictions)."
  },
  {
    id: 'fc-08',
    domainId: 'D1',
    topic: 'AI Ethics Advisory Board vs. AI Steering Committee',
    front: 'How do an AI Ethics Advisory Board and an AI Steering Committee differ in mandate and authority?',
    back: "While exact mandates depend on each organization's formal governance charter and delegated decision rights, enterprises commonly distinguish between: 1. AI Governance Steering Committee: An internal cross-functional executive body chartered with formal decision rights to approve AI policies, stage-gate releases, resource prioritization, and risk-tolerance alignment; and 2. AI Ethics Advisory Board / Panel: A consultative body (often incorporating multidisciplinary or external ethicists, domain experts, and stakeholder representatives) chartered to provide independent ethical evaluations, socio-technical impact reviews, and advisory recommendations to leadership or the Steering Committee.",
    source: "NIST AI RMF 1.0 GOVERN 1.2, 2.1 & 3.1; IIA Three Lines Model (2020) Principles 2 & 3.",
    keyTakeaway: "Distinguish executive steering bodies (chartered with formal decision and enforcement rights) from consultative ethics advisory panels (chartered to provide multidisciplinary ethical review and guidance), verifying each body's actual authority in its organizational charter."
  },
  {
    id: 'fc-09',
    domainId: 'D1',
    topic: 'AI Literacy & Workforce Competence',
    front: "How do the EU AI Act and ISO/IEC 42001 address organizational AI literacy and workforce competence?",
    back: "Under EU AI Act Article 4, providers and deployers must take measures to support AI literacy development among staff and other persons operating or using AI systems on their behalf, taking into account their technical knowledge, experience, education, training, deployment context, and affected persons or groups (without mandating a guaranteed literacy level for each individual). Separately, ISO/IEC 42001 establishes voluntary AI management system (AIMS) competence requirements for personnel affecting AI performance and governance.",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Art. 4; ISO/IEC 42001:2023 (verify competence clause against licensed standard).",
    keyTakeaway: "EU AI Act Article 4 imposes a statutory duty on providers and deployers to take role- and context-appropriate AI literacy measures, whereas ISO/IEC 42001 provides a voluntary management-system framework for organizational competence."
  },
  {
    id: 'fc-10',
    domainId: 'D1',
    topic: 'AI Whistleblowing & Safe Harbor Channels',
    front: 'Why should AI governance frameworks establish dedicated ethical reporting and safe harbor channels?',
    back: "Dedicated reporting and anti-retaliation ('safe harbor') channels enable engineers, data scientists, and staff to escalate suspected algorithmic harms, safety flaws, bias, or control failures early without fear of retaliation. These internal escalation mechanisms support timely risk remediation while operating alongside—and never restricting—statutorily required regulatory notifications or legally protected external whistleblowing disclosures.",
    source: "NIST AI RMF 1.0 GOVERN 4.2 & 4.3.",
    keyTakeaway: "Accessible escalation channels and anti-retaliation protections strengthen organizational risk culture and early issue remediation while preserving legally protected external reporting rights."
  },

  // =========================================================================
  // DOMAIN 2: DATA AND AI ARCHITECTURE PRINCIPLES (20%)
  // =========================================================================
  {
    id: 'fc-11',
    domainId: 'D2',
    topic: 'Model Cards & AI Asset Inventory',
    front: 'Why are Model Cards indispensable for AI asset governance, and what core elements must they contain?',
    back: "Proposed by Mitchell et al. (2019) and operationalized in enterprise AI registries, Model Cards provide standardized transparency and accountability metadata to supplement an AI asset inventory, typically documenting: 1. Model Details, Accountable Owner, Version History, and Risk Tier; 2. Intended Use Cases alongside explicit out-of-scope or prohibited uses; 3. Training and Evaluation Dataset Provenance, assumptions, and known limitations; 4. Disaggregated Performance Benchmarks, fairness/bias evaluations across relevant subgroups, and ethical/safety considerations.",
    source: "Mitchell et al., 'Model Cards for Model Reporting' (arXiv:1810.03993); NIST AI RMF 1.0 GOVERN 1.6, MAP 1.1 & MEASURE 2.8; ISO/IEC 42001:2023 (verify inventory/documentation clauses against licensed standard).",
    keyTakeaway: "A code repository is not an AI governance inventory: effective oversight requires a formal AI asset inventory (NIST AI RMF GOVERN 1.6) paired with standardized Model Cards documenting purpose, limitations, disaggregated evaluations, risk tier, and accountable ownership."
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
    front: "Why is trustworthy data provenance and lineage tracking critical for AI governance and regulatory audits?",
    back: "Data provenance and lineage document the lifecycle chain of data—including origin, collection context, legal basis or licensing permissions, preprocessing transformations, and synthetic augmentations. Maintaining proportionate, verifiable lineage records supports auditability, copyright and data-governance compliance, poisoning investigations, and handling of statutory data-subject rights (such as GDPR Article 17 erasure requests), while aligning metadata retention with applicable privacy and deletion obligations.",
    source: "GDPR Arts. 5(2) & 17; NIST AI RMF 1.0 MAP 2.3; ISO/IEC 42001:2023 (verify data management clauses against licensed standard).",
    keyTakeaway: "Trustworthy, risk-proportionate data lineage enables organizations to verify data permissions, investigate data-integrity issues, and align AI lifecycle documentation with privacy and regulatory obligations."
  },
  {
    id: 'fc-15',
    domainId: 'D2',
    topic: 'Synthetic Data Governance',
    front: 'What key risks must be managed when utilizing synthetic data for AI model development?',
    back: "Key risks in synthetic data governance include: 1. Model Collapse (Conditional Recursive Risk): Repeatedly training models on uncurated synthetic outputs across generations without sufficient real-world data anchoring can degrade output quality and erode tail distributions; 2. Bias and Artifact Amplification: Biases, distributional gaps, or confabulations in the generator model can propagate into downstream models; 3. Residual Privacy Leakage: Synthetic data is not automatically anonymous—poorly regularized generators can memorize and leak source PII or remain vulnerable to membership inference attacks.",
    source: "Shumailov et al. (arXiv:2305.17493); NIST AI 600-1; ISO/IEC 23894 (verify standard text).",
    keyTakeaway: "Synthetic data governance requires validating distributional fidelity, representativeness, bias propagation, recursive-training effects, and empirical privacy leakage rather than assuming synthetic data is risk-free."
  },
  {
    id: 'fc-16',
    domainId: 'D2',
    topic: 'Datasheets for Datasets',
    front: 'What is a "Datasheet for Datasets" and how does it support AI compliance?',
    back: "Proposed by Gebru et al., a 'Datasheet for Datasets' is a standardized transparency artifact that documents seven lifecycle areas of a dataset: motivation, composition, collection process, preprocessing/cleaning/labeling, intended and non-intended uses, distribution, and maintenance. It helps practitioners, deployers, and auditors evaluate dataset representativeness, sampling limitations, and governance gaps, though separate legal and technical verification is still required to establish copyright compliance or satisfy statutory data-governance rules (such as EU AI Act Article 10).",
    source: "Gebru et al., 'Datasheets for Datasets' (arXiv:1803.09010); NIST AI RMF 1.0 MAP 2.3.",
    keyTakeaway: "Dataset datasheets standardize lifecycle transparency across motivation, composition, collection, processing, uses, distribution, and maintenance to support informed dataset selection and risk assessment."
  },
  {
    id: 'fc-17',
    domainId: 'D2',
    topic: 'Differential Privacy in AI',
    front: 'What is Differential Privacy (DP), and how does it protect training data from extraction?',
    back: "Differential Privacy (DP) adds mathematically calibrated noise (e.g., Laplace or Gaussian mechanisms, or DP-SGD during training) to bound how much an algorithm's output distribution can change when any single individual's contribution is added, modified, or removed. Rather than guaranteeing zero disclosure or completely eliminating membership inference attacks, DP quantifies and bounds incremental privacy loss through privacy parameters (such as epsilon and delta) that must be evaluated alongside query composition, implementation fidelity, and residual inference risks.",
    source: "NIST SP 800-226 (Guidelines for Evaluating Differential Privacy Guarantees); NIST AI RMF 1.0 MEASURE 2.10.",
    keyTakeaway: "Differential privacy mathematically bounds and quantifies incremental privacy loss from individual records, reducing—rather than guaranteeing zero—membership inference and data extraction risks depending on privacy parameters and composition."
  },
  {
    id: 'fc-18',
    domainId: 'D2',
    topic: 'Vector Database & Embedding Governance',
    front: "What key security and privacy controls should be implemented for vector databases in enterprise RAG architectures?",
    back: "Recommended security and privacy controls for enterprise RAG vector stores include: 1. Authorization-Aware Retrieval: Enforcing source-system access-control lists (ACLs) or role/tenant filtering at query time so users only retrieve chunks they are authorized to view; 2. Data and Embedding Protection: Encrypting source text chunks and embedding vectors in transit and at rest, and restricting access to mitigate embedding-inversion risks; 3. Lifecycle Retention and Deletion Synchronization: Propagating data retention expirations, updates, and applicable statutory erasure requests (e.g., GDPR Article 17) across source repositories, vector indexes, caches, and backups.",
    source: "NIST SP 800-218 & SP 800-218A; NIST AI 600-1; GDPR Arts. 5 & 17 (where personal data is processed).",
    keyTakeaway: "Vector databases in RAG architectures require query-time authorization enforcement, storage/transit protection for chunks and embeddings, and synchronized lifecycle retention and deletion controls."
  },
  {
    id: 'fc-19',
    domainId: 'D2',
    topic: 'Disparate Impact vs. Disparate Treatment',
    front: 'How do "Disparate Treatment" and "Disparate Impact" differ in AI legal compliance?',
    back: "1. Disparate Treatment: Intentional differential treatment based on protected status; explicit protected-class fields are not the only possible mechanism. 2. Disparate Impact: An ostensibly neutral practice disproportionately disadvantages a protected group, subject to the applicable legal test. The US employment Four-Fifths Rule (29 CFR § 1607.4(D)) is a practical screening rule of thumb, not a universal legal definition of discrimination or a guarantee of compliance.",
    source: "US Title VII (42 U.S.C. § 2000e-2(k)) & 29 CFR § 1607.4(D); EU Non-Discrimination Directives & EU AI Act Art. 10.",
    keyTakeaway: "While lack of discriminatory intent is not a defense to a prima facie disparate-impact (or EU indirect-discrimination) claim, a practice may be legally defended if proven job-related and consistent with business necessity without a less discriminatory alternative (under US Title VII) or objectively justified by a legitimate aim achieved through appropriate and necessary means (under EU non-discrimination law)."
  },
  {
    id: 'fc-20',
    domainId: 'D2',
    topic: 'Data Minimization for Generative AI',
    front: 'How is the principle of Data Minimization applied to prompt engineering and retrieval-augmented generation (RAG)?',
    back: "Under GDPR Article 5(1)(c), data minimization requires that personal data be adequate, relevant, and limited to what is necessary for the specified processing purpose. In prompt engineering and RAG workflows, practical implementation controls include: 1. Input Redaction or Pseudonymization: Stripping or masking unnecessary direct identifiers (e.g., SSNs, contact details) before model invocation when individual identity is not required for the task; 2. Scoped RAG Indexing and Retrieval: Indexing only authorized, purpose-relevant corpora and retrieving only context chunks necessary to answer the query; 3. Proportionate Retention and Vendor Controls: Restricting prompt/output logging retention and contractually prohibiting vendors from reusing enterprise prompts for model training.",
    source: "GDPR Art. 5(1)(c) & Art. 25; NIST AI 600-1; ISO/IEC 42001:2023 (verify Annex A data controls against licensed standard).",
    keyTakeaway: "Applying data minimization to generative AI means limiting personal data in corpora, retrieved context, prompts, and logs to what is strictly necessary for the lawful processing purpose."
  },

  // =========================================================================
  // DOMAIN 3: AI ENTERPRISE INTEGRATION & PERFORMANCE MONITORING (25%)
  // =========================================================================
  {
    id: 'fc-21',
    domainId: 'D3',
    topic: 'Buy vs. Build AI Governance Criteria',
    front: 'What are the critical governance considerations when evaluating commercial third-party foundation models versus in-house development?',
    back: "Critical governance considerations when evaluating commercial third-party models ('buy') versus in-house development ('build') include: 1. Data Rights, Privacy & Confidentiality: Contractual prohibitions against retaining or reusing enterprise prompts/data for vendor model training, alongside data residency controls; 2. Transparency, Assurance & Regulatory Role Allocation: Access to documentation, evaluation/red-team evidence, and clarity on provider vs. deployer obligations (including EU AI Act Article 25(1) triggers: putting one's name or trademark on an existing high-risk system, substantially modifying an existing high-risk system so that it remains high-risk, or changing the intended purpose of a non-high-risk system so that it becomes high-risk; the enterprise may assume provider obligations when an Article 25 trigger is met); 3. Vendor Concentration & Exit Resilience: Portability of prompts, embeddings, and workflows to mitigate lock-in; and 4. Total Cost of Ownership (TCO): Full lifecycle licensing, compute, monitoring, assurance, and switching costs.",
    source: "NIST AI RMF 1.0 GOVERN 6.1, GOVERN 6.2 & MAP 4.1; NIST AI 600-1; EU AI Act Arts. 25 & 26; COBIT 2019 BAI03 (verify against licensed text).",
    keyTakeaway: "Outsourcing AI model development does not outsource governance accountability: the deploying enterprise retains applicable deployer obligations and may assume provider obligations when an Article 25 trigger is met, including rebranding an existing high-risk system, substantially modifying an existing high-risk system so that it remains high-risk, or changing a non-high-risk system's intended purpose so that it becomes high-risk."
  },
  {
    id: 'fc-22',
    domainId: 'D3',
    topic: 'Explainability & Contestability (XAI)',
    front: 'Why do high-impact AI decisions require appropriate transparency and explanations (e.g., credit underwriting, hiring)?',
    back: "Insufficient transparency can impede: 1. Contestability and Individual Explanation: Providing affected individuals with clear, meaningful explanations or appeal avenues where applicable law requires them (e.g., EU AI Act Article 86 for specified Annex III high-risk decisions producing legal or similarly significant adverse effects). 2. Risk Evaluation: Investigating proxy discrimination, bias, model limitations, and decision behavior (NIST AI RMF MEASURE 2.8/2.9). 3. Effective Human Oversight: Enabling deployers and reviewers to interpret outputs and intervene appropriately (EU AI Act Article 13 transparency to deployers). Complex models are not automatically prohibited; organizations must verify that explanations, documentation, and controls match the specific use case and statutory scope.",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Art. 13 & Art. 86; NIST AI RMF 1.0 MEASURE 2.8 & 2.9.",
    keyTakeaway: "Distinguish deployer-facing system transparency (EU AI Act Art. 13) from qualified individual rights to explanation (Art. 86), aligning explainability and contestability controls with the specific use case and applicable legal requirements."
  },
  {
    id: 'fc-23',
    domainId: 'D3',
    topic: 'Model Retraining & Controlled Change Management',
    front: 'What governance approvals and controls must precede deploying a retrained production model?',
    back: "Deploying a retrained production model should follow risk-proportionate change management controls: 1. Impact and Trigger Analysis: Evaluating drift causes, data lineage, and whether the update falls within predetermined change parameters or constitutes a 'substantial modification' (e.g., under EU AI Act Article 43(4) requiring a new conformity assessment); 2. Pre-Deployment Validation: Regression testing across performance, robustness, security, and fairness baselines; 3. Tiered Governance Sign-Off: Documented approval by the model owner and—where risk tier or material change thresholds require—second-line risk/compliance oversight under delegated authority; 4. Deployment Safeguards: Canary/shadow release telemetry and tested rollback procedures.",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Art. 43(4); ISO/IEC 42001:2023 & COBIT BAI06 (verify exact standard clauses against licensed texts).",
    keyTakeaway: "Apply risk-tiered change control to model retraining—validating data quality, regression baselines, rollback readiness, and whether the update triggers escalated risk sign-off or a new statutory conformity assessment."
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
    back: "1. Human-in-the-Loop (HITL): A human participates in or approves decisions prior to execution; reviewing individual outputs adds latency, and effectiveness depends on reviewer competence, authority, and process design. 2. Human-on-the-Loop (HOTL): The system executes autonomously while humans monitor operation and can intervene, override, or abort when anomalies occur. 3. Human-in-Command (HIC): Humans govern overarching deployment boundaries, context, and lifecycle decisions, including whether and when the AI system is permitted to operate. (Note: HITL/HOTL/HIC are operational oversight patterns rather than statutory categories.)",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Art. 14; NIST AI RMF 1.0 GOVERN 2.1.",
    keyTakeaway: "Nominal oversight labels do not guarantee compliance: under EU AI Act Article 14, human oversight must be proportionate to system risk and context, equipping competent reviewers with the authority, tools, and anti-automation-bias safeguards to intervene effectively."
  },
  {
    id: 'fc-26',
    domainId: 'D3',
    topic: 'Automation Bias Mitigation',
    front: 'What is Automation Bias, and how must governance frameworks mitigate it in human reviewers?',
    back: "Automation bias is the human tendency to over-rely on or uncritically accept automated AI outputs. For high-risk AI systems, EU AI Act Article 14 requires risk-proportionate oversight measures that enable human reviewers to understand system capabilities and limitations, remain aware of automation bias (Art. 14(4)(b)), interpret outputs accurately, override or disregard outputs, and intervene or halt system operation. Under Article 26(2), deployers must assign oversight to natural persons with appropriate competence, training, authority, and support. Governance controls such as reasoned-review interfaces, training on failure modes, and controlled quality testing are practical context-specific mitigations rather than universally mandated statutory mechanisms.",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Art. 14 & Art. 26(2).",
    keyTakeaway: "Under EU AI Act Articles 14 and 26, effective human oversight of high-risk AI requires proportionate measures addressing automation bias and ensuring reviewer competence, authority, and intervention capability."
  },
  {
    id: 'fc-27',
    domainId: 'D3',
    topic: 'AI Total Cost of Ownership (TCO)',
    front: 'What often-overlooked lifecycle cost components must be included in enterprise AI TCO calculations?',
    back: "Beyond initial model licensing, development, and inference compute, comprehensive enterprise AI TCO estimates should include: 1) Continuous production monitoring, telemetry, and drift-detection infrastructure; 2) Periodic data curation, fine-tuning, and retraining labor; 3) Security hardening, guardrail maintenance, and adversarial red-teaming; 4) Governance, legal review, conformity assessments, impact assessments, and assurance audits; and 5) Vendor switching, decommissioning, and data/model migration costs.",
    source: "NIST AI RMF 1.0 MAP 1.3; COBIT 2019 BAI03 / ISO/IEC 42001:2023 (verify standard references against licensed texts).",
    keyTakeaway: "Complete AI business cases must account for full-lifecycle monitoring, retraining, security, compliance, and exit expenses alongside compute and licensing costs, estimating their relative weight for each specific deployment model."
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
    back: "Layered technical and governance controls to reduce generative AI confabulation (hallucination) risk include: 1. Retrieval-Augmented Generation (RAG) grounding responses in authoritative, curated knowledge repositories; 2. Prompt and decoding constraints (such as requiring verifiable inline citations, permitting abstention when evidence is missing, and using lower sampling temperatures for factual tasks); 3. Automated input/output guardrails and factual-consistency evaluators; and 4. Task-specific benchmark evaluation, user-facing uncertainty disclosures, and risk-proportionate human review for high-impact outputs.",
    source: "NIST AI 600-1 (Generative AI Profile, Confabulation); NIST AI RMF 1.0 MEASURE 2.5 & 2.6.",
    keyTakeaway: "Grounding, decoding constraints, and automated guardrails reduce—but never completely eliminate—confabulation risk; high-impact use cases require layered technical checks paired with human verification."
  },
  {
    id: 'fc-30',
    domainId: 'D3',
    topic: 'Post-Market Monitoring Obligations',
    front: "How do the EU AI Act and ISO/IEC 42001 address ongoing operational and post-market monitoring of AI systems?",
    back: "Under EU AI Act Article 72, providers of high-risk AI systems must establish and document a proportionate post-market monitoring system—based on a post-market monitoring plan included in Annex IV technical documentation—to actively and systematically collect, document, and analyze relevant data (including deployer-supplied data) on lifetime system performance and continuing compliance. Separately, under Article 26(5), deployers of high-risk AI systems must monitor operation according to instructions for use and inform providers and authorities of serious incidents or risks. ISO/IEC 42001 establishes internal AI management system (AIMS) performance evaluation and monitoring processes, which complement—but are legally distinct from—EU statutory post-market surveillance rules.",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Art. 72 & Art. 26(5); ISO/IEC 42001:2023 (verify Cl. 9.1 wording against licensed standard).",
    keyTakeaway: "EU AI Act Article 72 mandates documented post-market monitoring plans and systems for providers of high-risk AI systems (complemented by deployer monitoring duties under Art. 26(5)), while ISO/IEC 42001 governs internal AIMS performance evaluation."
  },

  // =========================================================================
  // DOMAIN 4: RISK OVERSIGHT & COMPLIANCE FRAMEWORKS (25%)
  // =========================================================================
  {
    id: 'fc-31',
    domainId: 'D4',
    topic: 'EU AI Act Risk Classification Pyramid',
    front: 'How does the EU AI Act categorize artificial intelligence systems under its risk-based framework?',
    back: "The EU AI Act uses a risk-proportionate framework (alongside General-Purpose AI rules in Chapter V): 1. Prohibited Practices (Art. 5): Bans unacceptable uses such as social scoring and manipulative/exploitative AI, and prohibits law-enforcement real-time remote biometric identification in publicly accessible spaces subject to narrow statutory exceptions (Art. 5(1)(h)). 2. High-Risk AI Systems (Art. 6, Annexes I & III): Subject to role-specific requirements including risk management, conformity assessment, and CE marking for providers; pre-use Fundamental Rights Impact Assessments (FRIA, Art. 27) apply only to public-law bodies, private entities providing public services, and deployers of Annex III 5(b)/(c) credit/insurance systems. 3. Specific Transparency Risk (Art. 50): Providers must ensure synthetic audio, image, video, or text content is marked in a machine-readable format and detectable, providers must inform people of direct AI interactions unless an exception applies; deployers have specified disclosure duties for emotion recognition/biometric categorization and deepfakes (subject to statutory exceptions). 4. Other (Minimal-Risk) AI Systems: Free from high-risk or Art. 50 product requirements, though organizations still face Article 4 AI literacy duties and other applicable laws (e.g., GDPR).",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Arts. 4, 5, 6, 27, 50 & 113.",
    keyTakeaway: "The EU AI Act imposes tiered, role-specific obligations across prohibited practices, high-risk systems, Article 50 transparency duties, and baseline Article 4 AI literacy requirements, subject to phased application dates under Article 113."
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
    back: "NIST AI RMF 1.0 organizes AI risk management into four iterative Core functions: 1. GOVERN: A cross-cutting function infused throughout the lifecycle that establishes organizational risk culture, accountability structures, policies, and workforce competence; 2. MAP: Establishes context to frame risks related to an AI system, its intended purpose, stakeholders, and potential impacts; 3. MEASURE: Employs quantitative, qualitative, or mixed-method tools, techniques, and metrics to analyze, assess, benchmark, and monitor AI risk and trustworthiness characteristics; 4. MANAGE: Allocates resources and implements plans to prioritize, respond to, recover from, and monitor mapped and measured AI risks.",
    source: "NIST AI 100-1 (AI RMF 1.0), Section 5.",
    keyTakeaway: "In NIST AI RMF 1.0, GOVERN is a cross-cutting function while MAP, MEASURE (using qualitative and quantitative methods), and MANAGE are applied iteratively and continuously across the AI lifecycle."
  },
  {
    id: 'fc-34',
    domainId: 'D4',
    topic: 'General Purpose AI (GPAI) Obligations',
    front: 'What obligations does the EU AI Act impose on providers of General Purpose AI (GPAI) models?',
    back: "1. Baseline GPAI Models (Art. 53): Providers must draw up and keep technical documentation (Annex XI, including known or estimated energy consumption) for the AI Office and national authorities, provide information/documentation to downstream AI system providers (Annex XII), establish a policy to comply with EU copyright law (including TDM opt-outs under Directive (EU) 2019/790 Art. 4(3)), and publish a sufficiently detailed summary of training content (open-source GPAI models without systemic risk are exempt from the documentation duties in Art. 53(1)(a)–(b) but must still fulfill copyright and training-summary obligations). 2. GPAI Models with Systemic Risk (Arts. 51 & 55): Designated via high-impact capabilities—presumed when cumulative training compute exceeds 10^25 FLOPs—or by European Commission decision. Providers must additionally perform model evaluations and adversarial testing, assess and mitigate systemic risks, track and report serious incidents and corrective measures to the AI Office (and relevant national authorities), and ensure adequate cybersecurity protection for the model and its physical infrastructure.",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Arts. 51–55.",
    keyTakeaway: "All GPAI providers face Article 53 copyright and training-summary duties (plus documentation duties unless exempt as non-systemic open-source), while systemic-risk GPAI models (presumed above 10^25 FLOPs or designated under Art. 51) face heightened evaluation, adversarial testing, serious-incident reporting, and cybersecurity obligations under Article 55."
  },
  {
    id: 'fc-35',
    domainId: 'D4',
    topic: 'Third-Party AI Supply Chain Due Diligence',
    front: "What risk-based due diligence and governance controls should be applied before onboarding third-party AI vendors?",
    back: "Proportionate third-party AI supply chain due diligence includes: 1. Assurance and Risk Evaluation: Reviewing independent security and AI governance assurance evidence appropriate to the risk tier (e.g., SOC 2 Type II, ISO/IEC 27001 or 42001 certifications, model cards, and red-team/evaluation reports); 2. Contractual and Data Governance Controls: Defining data ownership, retention, deletion, privacy/security obligations, restrictions on training on customer data, and right-to-audit or assurance-reporting clauses; 3. Operational and Supply-Chain Resilience: Assessing SLAs, material model-update notification terms, upstream dependencies (including foundation models and open-source weights), and exit/contingency plans.",
    source: "NIST AI RMF 1.0 GOVERN 6.1 & 6.2; ISO/IEC 42001:2023 (verify supplier clauses against licensed standard).",
    keyTakeaway: "Third-party AI vendor governance applies risk-tiered due diligence, contractual data protections, upstream dependency visibility, and exit planning aligned with NIST AI RMF GOVERN 6.1–6.2."
  },
  {
    id: 'fc-36',
    domainId: 'D4',
    topic: 'Fundamental Rights Impact Assessment (FRIA)',
    front: 'When is a Fundamental Rights Impact Assessment (FRIA) mandatory under the EU AI Act?',
    back: "Under Article 27 of the EU AI Act, a pre-use Fundamental Rights Impact Assessment (FRIA) is mandatory only for specified deployers of Annex III high-risk AI systems (covered by Article 6(2), explicitly excluding Annex III point 2 critical infrastructure): 1) Bodies governed by public law; 2) Private entities providing public services; and 3) Deployers of high-risk AI systems listed in Annex III point 5(b) (creditworthiness or credit-scoring evaluation of natural persons, except financial fraud detection) and point 5(c) (risk assessment and pricing in relation to natural persons for life and health insurance). Prior to first use, covered deployers must assess the intended processes, period and frequency of use, affected categories of natural persons, specific risks of harm to fundamental rights, human oversight implementation, and mitigation measures if risks materialize, updating the assessment when relevant conditions change.",
    source: "Regulation (EU) 2024/1689 (EU AI Act) Art. 27 & Annex III.",
    keyTakeaway: "EU AI Act Article 27 mandates a pre-deployment FRIA for public bodies, private operators of public services, and deployers of Annex III 5(b)/(c) retail credit and life/health insurance AI systems (excluding Annex III point 2), rather than all high-risk AI deployers indiscriminately."
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
    back: 'EU AI Act Article 73 distinguishes reporting deadlines for providers of high-risk AI systems. The general rule is immediately after a causal link or reasonable likelihood is established, and no later than 15 days after awareness. Widespread infringement or a serious incident involving serious and irreversible disruption of critical infrastructure must be reported immediately and no later than 2 days. A death must be reported immediately once a causal link is established or suspected, and no later than 10 days after awareness. Check applicable scope, transition dates and sector-specific provisions; do not wait for the maximum deadline.',
    source: 'EU AI Act Article 73; ISACA AAIG D4',
    keyTakeaway: 'Article 73 has 2, 10 and 15 day outer limits depending on the incident, with immediate reporting triggers.'
  },
  {
    id: 'fc-39',
    domainId: 'D4',
    topic: 'Conformity Assessment Procedures (CE-Marking)',
    front: 'What is an AI Conformity Assessment under the EU AI Act, and what are the two main pathways?',
    back: 'A conformity assessment evaluates whether an in-scope high-risk AI system meets applicable requirements, including Articles 8-15. The provider is responsible for the applicable assessment. Article 43 provides different routes: Annex III points 2-8 generally use internal control under Annex VI; Annex III point 1 may use internal control or a notified body under Annex VII depending on applicable standards and conditions. Product-related AI covered by Annex I follows the relevant sector legislation. Check system category, applicable dates and conditions before selecting a route.',
    source: 'EU AI Act Article 43, Annexes VI & VII; ISACA AAIG D4',
    keyTakeaway: 'Assessment routes depend on system category and conditions; a notified body is not universally required for every biometric system.'
  },
  {
    id: 'fc-40',
    domainId: 'D4',
    topic: 'Adversarial Robustness & Red Teaming',
    front: "What is AI Red Teaming, and what key adversarial attack vectors should governance frameworks evaluate based on system architecture?",
    back: "AI Red Teaming is structured adversarial testing designed to discover security vulnerabilities, safety failures, and undesirable behaviors before or during deployment. Depending on the model architecture (e.g., generative LLMs, RAG pipelines, or predictive ML) and threat model, priority attack vectors include: 1) Direct and indirect prompt injection; 2) Jailbreaking and safety-guardrail bypass; 3) Training or fine-tuning data poisoning and backdoor triggers; 4) Model inversion, membership inference, and training-data extraction; and 5) Resource-exhaustion or denial-of-wallet attacks. Findings must be documented, remediated, and retested alongside ongoing production monitoring.",
    source: "NIST AI RMF 1.0 MEASURE 2.6 & 2.7; NIST AI 600-1 (Generative AI Profile); OWASP Top 10 for LLM Applications.",
    keyTakeaway: "AI red teaming scopes adversarial testing to the system's architecture and threat profile, validating security and safety controls prior to release and complementing continuous production monitoring."
  }
];

export const INITIAL_FLASHCARDS: Flashcard[] = FLASHCARD_DRAFTS.map(card => ({
  ...card, source: draftSource(card.source), reviewStatus: 'unreviewed' as const,
})).map(normalizeFlashcardDomain);
