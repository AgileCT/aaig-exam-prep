import { Question } from '../types';
import { GENERATED_QUESTIONS } from './generatedQuestions';

const BASE_QUESTIONS: Question[] = [
  // =========================================================================
  // DOMAIN 1: AI ENTERPRISE GOVERNANCE (30%)
  // =========================================================================
  {
    id: 'aaig-d1-001',
    domainId: 'D1',
    subDomain: 'D1.1 AI Governance Structure & Board Oversight',
    scenarioText: 'A global financial institution plans to deploy enterprise-wide generative AI copilots across multiple business units. Several departmental heads have already started vendor pilots independently without centralized coordination.',
    questionText: 'What should the Chief AI Governance Officer recommend as the FIRST step?',
    options: [
      'Immediately mandate a technical penetration test and red-teaming assessment on all vendor APIs.',
      'Establish a formal AI Governance Steering Committee with clear charter, decision rights, and risk appetite.',
      'Instruct the IT department to block access to all generative AI endpoints until procurement review finishes.',
      'Deploy an automated monitoring dashboard to capture real-time prompt token consumption and latency metrics.'
    ],
    correctIndex: 1,
    questionType: 'FIRST',
    explanation: 'Under ISACA governance doctrine, establish governance foundation first (charter, decision rights, risk appetite, steering committee) before technical testing, blanket prohibitions, or operational dashboard deployments. Governance sets the mandate and boundaries for all downstream actions.',
    distractorExplanations: [
      'A: Red-teaming is an operational/technical verification step that happens after governance scope and policies are defined.',
      'C: Blanket blockage is an abrupt operational reaction that damages business agility before establishing authorized governance channels.',
      'D: Metric tracking is an ongoing operational monitoring duty, not the primary foundational governance step.'
    ],
    source: 'ISACA AAIG Review Manual D1; NIST AI RMF GOVERN 1.1; ISO/IEC 42001 Cl. 5',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Operational technical testing instead of foundational governance mandate',
      'Abrupt tactical blockage rather than establishing policy decision rights',
      'Operational telemetry deployment before establishing oversight structure'
    ]
  },
  {
    id: 'aaig-d1-002',
    domainId: 'D1',
    subDomain: 'D1.4 Roles, Responsibilities & Three Lines Model',
    scenarioText: 'An enterprise is aligning its emerging AI risk management program with the Institute of Internal Auditors (IIA) Three Lines Model to ensure accountability and defensibility.',
    questionText: 'Which responsibility belongs strictly to the SECOND LINE of defense in AI governance?',
    options: [
      'Designing and executing day-to-day model validation tests during the data science training pipeline.',
      'Establishing enterprise AI risk frameworks, setting compliance policies, and providing independent challenge.',
      'Conducting periodic independent assurance audits directly reporting to the Board Audit Committee.',
      'Accepting residual business risks and determining commercial trade-offs for high-impact use cases.'
    ],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: 'In the Three Lines Model: 1st line (management & development) owns and operates risk; 2nd line (Risk & Compliance) sets policies, frameworks, monitors risk appetite, and challenges 1st line; 3rd line (Internal Audit) provides independent assurance to the board.',
    distractorExplanations: [
      'A: Model validation during development is a 1st line operational control duty.',
      'C: Independent audit reporting directly to the Board is the role of 3rd line (Internal Audit).',
      'D: Accepting residual business risks is the duty of the business asset owner (1st line management), not the risk oversight function.'
    ],
    source: 'ISACA AAIG Review Manual D1; IIA Three Lines Model; COBIT Framework',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Confusing 1st line operational engineering with 2nd line oversight',
      'Confusing 3rd line independent board assurance with 2nd line risk policy',
      'Confusing asset owner risk acceptance authority with compliance oversight'
    ]
  },
  {
    id: 'aaig-d1-003',
    domainId: 'D1',
    subDomain: 'D1.2 Strategic Alignment & Business Objectives',
    scenarioText: 'The Board of Directors questions whether the organization’s significant investments in proprietary AI model research are justified, as several initiatives delivered technical breakthroughs but negligible business value.',
    questionText: 'What is the PRIMARY objective of aligning AI governance with enterprise business strategy?',
    options: [
      'Maximizing the raw parameter count and benchmark performance of proprietary neural network architectures.',
      'Ensuring that AI investments create measurable stakeholder value while operating strictly within approved risk appetite.',
      'Guaranteeing that the enterprise files more generative AI intellectual property patents than its sector peers.',
      'Shifting total compliance and regulatory liabilities onto third-party foundation model infrastructure providers.'
    ],
    correctIndex: 1,
    questionType: 'PRIMARY',
    explanation: 'Strategic alignment in ISACA governance (aligned with COBIT and AAIG) exists to ensure value creation and realization while balancing resource optimization and risk appetite. It is not about vanity benchmarks, patent counts, or liability shifting.',
    distractorExplanations: [
      'A: Parameter counts and model benchmarks are technical vanity metrics disconnected from business ROI.',
      'C: Patent count is an intellectual property metric, not a strategic governance objective.',
      'D: Regulatory accountability cannot be outsourced or entirely transferred away from the deployer.'
    ],
    source: 'ISACA AAIG Review Manual D1; COBIT 2019 EDM01 / EDM02',
    difficulty: 'Fundamental',
    distractorAxes: [
      'Focusing on raw engineering vanity metrics rather than enterprise business outcomes',
      'Conflating IP filing quantity with organizational strategic alignment',
      'Attempting impossible complete liability shifting to external vendors'
    ]
  },
  {
    id: 'aaig-d1-004',
    domainId: 'D1',
    subDomain: 'D1.3 Policies, Principles, Charters & Procedures',
    scenarioText: 'Staff across marketing and customer support have begun pasting customer complaint transcripts into public, consumer-tier LLM chat tools to draft faster replies. The current corporate policy only states: "Act professionally online."',
    questionText: 'Which governance policy update is MOST urgent?',
    options: [
      'Send a company-wide email urging employees to exercise heightened personal discretion when online.',
      'Formulate an enforceable AI Acceptable Use Policy (AUP) defining approved tools, prohibited data classifications, and explicit sanctions.',
      'Install client-side keystroke loggers on every employee laptop without updating written policies.',
      'Demand that consumer-tier LLM vendors sign a custom business associate agreement (BAA) retroactively.'
    ],
    correctIndex: 1,
    questionType: 'MOST',
    explanation: 'An enforceable AI Acceptable Use Policy (AUP) that delineates authorized tools, confidential data boundaries, and mandatory disclosure is the essential governance baseline. Vague guidance, covert surveillance, or unfeasible vendor demands do not provide governance legitimacy.',
    distractorExplanations: [
      'A: Vague emails do not establish binding enterprise policy or enforceable boundaries.',
      'C: Technical surveillance without clear policy creates employee legal/privacy backlash and fails governance standards.',
      'D: Consumer-tier public web vendors will not execute enterprise BAAs retroactively for unauthorized personal usage.'
    ],
    source: 'ISACA AAIG Review Manual D1; ISO/IEC 42001 Cl. 5.2; NIST AI RMF GOVERN 1.2',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Relying on informal, unenforceable general reminders',
      'Premature invasive technical policing before policy codification',
      'Unrealistic retroactive vendor contracting expectations'
    ]
  },
  {
    id: 'aaig-d1-005',
    domainId: 'D1',
    subDomain: 'D1.5 Ethical Frameworks & Responsible AI Principles',
    scenarioText: 'A retail bank discovers that an automated loan qualification algorithm indirectly uses postal codes that heavily correlate with protected racial demographics, causing disparate denial rates.',
    questionText: 'Which ethical governance principle has been breached, and what is the PRIMARY corrective mandate?',
    options: [
      'System availability; the IT team must increase server redundancy across affected bank branches.',
      'Fairness and non-discrimination; the AI Governance Committee must mandate proxy variable audits and fairness-aware retraining.',
      'Intellectual property protection; the data science team must patent the proprietary feature engineering formula.',
      'Cost minimization; the procurement team must negotiate lower transaction API fees with data brokers.'
    ],
    correctIndex: 1,
    questionType: 'PRIMARY',
    explanation: 'Using features that act as proxies for protected demographic attributes breaches fairness and non-discrimination principles (proxy discrimination). Governance requires auditing for disparate impact and eliminating biased proxies.',
    distractorExplanations: [
      'A: System availability is an operational uptime concern, entirely irrelevant to demographic lending fairness.',
      'C: Patenting a biased model compounds regulatory exposure and legal liability.',
      'D: Fee negotiation does not remedy fundamental algorithmic bias or civil rights violations.'
    ],
    source: 'ISACA AAIG Review Manual D1; OECD AI Principles; EU AI Act Art. 10',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Confusing algorithmic fairness with IT infrastructure uptime',
      'Prioritizing IP asset protection over anti-discrimination mandates',
      'Treating civil rights and fairness violations as procurement cost concerns'
    ]
  },

  // =========================================================================
  // DOMAIN 2: DATA AND AI ARCHITECTURE PRINCIPLES (20%)
  // =========================================================================
  {
    id: 'aaig-d2-001',
    domainId: 'D2',
    subDomain: 'D2.2 Enterprise AI Asset Inventory & Model Cards',
    scenarioText: 'A healthcare conglomerate maintains an IT asset database that records server hostnames and software licenses, but executive leadership cannot determine which clinical decision algorithms process patient protected health information (PHI).',
    questionText: 'What critical governance artifact is MOST needed to remediate this visibility gap?',
    options: [
      'An enterprise AI asset inventory and standardized Model Cards capturing intended use, owners, training provenance, and risk tiers.',
      'A centralized repository containing raw training loss curves and GPU power consumption telemetry logs.',
      'An annual employee acknowledgment form confirming that clinicians understand the hospital acceptable use policy.',
      'A blanket non-disclosure agreement signed by all external cloud foundation model vendors and contractors.'
    ],
    correctIndex: 0,
    questionType: 'MOST',
    explanation: 'An enterprise AI asset inventory supplemented by Model Cards provides essential governance context: intended use, limitations, data lineage, responsible owner, risk tier, and dependencies. Simple IT license inventories or raw training logs lack this governance metadata.',
    distractorExplanations: [
      'B: Loss curves and GPU telemetry are technical developer metrics devoid of risk or clinical governance context.',
      'C: Policy acknowledgments do not solve the structural absence of an AI asset inventory.',
      'D: NDAs address confidentiality in procurement, not internal visibility into deployed clinical models.'
    ],
    source: 'ISACA AAIG Review Manual D2; NIST AI RMF MAP 1.1; ISO/IEC 42001 Cl. 8.2',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Technical low-level training telemetry instead of governance asset metadata',
      'General human awareness records instead of structured asset inventories',
      'Legal procurement confidentiality instruments rather than system inventory'
    ]
  },
  {
    id: 'aaig-d2-002',
    domainId: 'D2',
    subDomain: 'D2.4 Algorithmic Bias & Representation Drift',
    scenarioText: 'An automated resume screening AI model achieves 94% aggregate classification accuracy. However, an internal audit reveals that qualified female applicants in engineering categories are systematically ranked lower due to historical hiring dataset imbalances.',
    questionText: 'What does this situation BEST illustrate from an AI data governance perspective?',
    options: [
      'Concept drift caused by sudden changes in macroeconomic employment conditions.',
      'Aggregate metric masking, where overall high accuracy obscures severe localized demographic bias and disparate impact.',
      'Adversarial data poisoning orchestrated by external applicants during resume submission.',
      'A failure of infrastructure availability service level objectives (SLOs) within the talent acquisition platform.'
    ],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: 'Aggregate accuracy often conceals disparate impact and algorithmic bias against protected demographic subgroups. Data governance must mandate disaggregated evaluation metrics (fairness metrics, disparate impact ratios) rather than relying solely on global accuracy.',
    distractorExplanations: [
      'A: Concept drift refers to real-world statistical shifts over time, not historical demographic training bias.',
      'C: This is historical training data bias, not a malicious external adversarial poisoning attack.',
      'D: The issue is algorithmic fairness and data quality, not infrastructure system availability or uptime.'
    ],
    source: 'ISACA AAIG Review Manual D2; NIST AI RMF MEASURE 2.11; EU AI Act Art. 10',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Misidentifying historical bias as temporal macroeconomic concept drift',
      'Conflating systemic historical dataset bias with malicious external poisoning',
      'Confusing ethical fairness failures with IT infrastructure availability SLOs'
    ]
  },
  {
    id: 'aaig-d2-003',
    domainId: 'D2',
    subDomain: 'D2.3 Privacy by Design & Data Minimization',
    scenarioText: 'A consumer lending startup fine-tunes an internal open-weights LLM using unredacted customer loan files containing tax documents, social security numbers, and bank account numbers.',
    questionText: 'Which architectural and governance control should have been implemented FIRST during data pipeline preparation?',
    options: [
      'Purchasing additional server storage to retain all unredacted loan records indefinitely.',
      'Data minimization and automated de-identification/tokenization to purge direct identifiers before training ingestion.',
      'Adding a post-generation disclaimer telling users that model answers might expose real personal data.',
      'Increasing the learning rate parameter during fine-tuning so the model memorizes fewer training tokens.'
    ],
    correctIndex: 1,
    questionType: 'FIRST',
    explanation: 'Privacy by Design and data minimization dictate that Personally Identifiable Information (PII) must be stripped, tokenized, or pseudonymized before entering model training pipelines to prevent memorization and unauthorized data leakage.',
    distractorExplanations: [
      'A: Indefinite retention of unredacted sensitive PII violates data minimization regulations like GDPR.',
      'C: Front-end disclaimers do not mitigate the structural privacy violation of embedding PII into model weights.',
      'D: Adjusting hyperparameter learning rates does not eliminate model extraction or memorization risks.'
    ],
    source: 'ISACA AAIG Review Manual D2; GDPR Article 25; NIST AI RMF GOVERN 2.2',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Increasing storage retention instead of applying data minimization',
      'Superficial legal disclaimers rather than upstream data pipeline controls',
      'Relying on hyperparameter tuning to solve data leakage vulnerabilities'
    ]
  },
  {
    id: 'aaig-d2-004',
    domainId: 'D2',
    subDomain: 'D2.5 Provenance, Lineage & Synthetic Data Usage',
    scenarioText: 'An enterprise decides to supplement its training dataset with commercially purchased synthetic consumer financial records to accelerate model development.',
    questionText: 'What is the PRIMARY governance risk associated with incorporating unvalidated synthetic data?',
    options: [
      'Synthetic data consumes twice as much GPU memory bandwidth as real historical customer records.',
      'Model collapse, amplified statistical hallucinations, and distortion of real-world risk tail distributions.',
      'Inability of the enterprise to copyright the resulting downstream neural network weights under US law.',
      'Immediate revocation of all existing corporate enterprise database software licenses.'
    ],
    correctIndex: 1,
    questionType: 'PRIMARY',
    explanation: 'Unvalidated synthetic data introduces risks of model collapse, loss of real-world edge-case variance, and amplified statistical feedback loops. Governance must validate synthetic data fidelity, diversity, and representation before ingestion.',
    distractorExplanations: [
      'A: Synthetic data format consumes standard memory; GPU bandwidth is not the governance risk.',
      'C: Copyrightability of weights is a secondary legal consideration compared to model failure and risk blindness.',
      'D: Commercial synthetic data does not violate enterprise database software licenses.'
    ],
    source: 'ISACA AAIG Review Manual D2; ISO/IEC 42001 Cl. 8.2; NIST AI RMF MAP 1.5',
    difficulty: 'Director-Level',
    distractorAxes: [
      'Fictional hardware memory constraints rather than statistical degradation',
      'Secondary intellectual property considerations over model reliability',
      'Unfounded software licensing assertions'
    ]
  },

  // =========================================================================
  // DOMAIN 3: AI ENTERPRISE INTEGRATION & PERFORMANCE MONITORING (25%)
  // =========================================================================
  {
    id: 'aaig-d3-001',
    domainId: 'D3',
    subDomain: 'D3.1 Buy vs. Build & Third-Party Sourcing Decisions',
    scenarioText: 'An enterprise must choose between training a bespoke in-house proprietary LLM versus licensing an enterprise SaaS foundation model for internal document summarization.',
    questionText: 'What is the MOST critical governance factor to evaluate during the "Buy vs. Build" assessment?',
    options: [
      'Whether the in-house engineering team prefers working in Python over third-party REST API integrations.',
      'Total cost of ownership, ongoing maintenance liability, data confidentiality rights, and alignment with organizational capabilities.',
      'Selecting whichever vendor promises the lowest price per million input tokens during the initial 30-day promotional window.',
      'Prioritizing building in-house exclusively to ensure the company can publicly claim full AI self-sufficiency.'
    ],
    correctIndex: 1,
    questionType: 'MOST',
    explanation: 'Sound governance evaluates Buy vs. Build through comprehensive lenses: Total Cost of Ownership (TCO including retraining, monitoring, alignment), long-term maintenance overhead, data governance/IP retention, and whether core organizational capabilities align with the chosen path.',
    distractorExplanations: [
      'A: Developer programming language preference is a technical convenience, not an enterprise governance factor.',
      'C: Promotional token pricing ignores total lifecycle costs, exit costs, and contractual data risk.',
      'D: Self-sufficiency claims are vanity-driven and disregard capital efficiency and risk-adjusted return.'
    ],
    source: 'ISACA AAIG Review Manual D3; COBIT 2019 BAI03; NIST AI RMF GOVERN 3.1',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Developer technical convenience instead of enterprise governance evaluation',
      'Short-term promotional pricing ignoring total cost of ownership and data rights',
      'Corporate ego and vanity self-sufficiency ignoring economic feasibility'
    ]
  },
  {
    id: 'aaig-d3-002',
    domainId: 'D3',
    subDomain: 'D3.3 Model Drift, Degradation & Performance KPIs',
    scenarioText: 'A fraud detection AI model deployed in production has experienced a gradual decrease in true positive rates over six months as fraud syndicates alter their transaction behaviors.',
    questionText: 'Which monitoring mechanism should the AI governance framework mandate to trigger automated review or rollback?',
    options: [
      'An annual static paper review of model documentation conducted during corporate audit season.',
      'Statistically calibrated drift and performance thresholds linked to predefined remediation and human escalation workflows.',
      'An automated cron job that deletes and resets all model weights whenever false positive rates rise above zero.',
      'A customer feedback questionnaire asking affected cardholders to rate their checkout satisfaction on a 1-5 scale.'
    ],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: 'Effective performance governance requires defined quantitative thresholds (data drift, concept drift, performance decay) tied directly to actionable escalation protocols (retraining, human-in-the-loop fallback, or controlled rollback).',
    distractorExplanations: [
      'A: Annual static reviews are too infrequent to catch dynamic production model drift in high-velocity fraud domains.',
      'C: Arbitrarily wiping model weights creates catastrophic system downtime and destroys operational capability.',
      'D: Customer satisfaction surveys do not measure underlying statistical fraud detection efficacy or drift.'
    ],
    source: 'ISACA AAIG Review Manual D3; ISO/IEC 42001 Cl. 9.1; NIST AI RMF MEASURE 2.7',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Infrequent manual paper review inadequate for real-time drift management',
      'Catastrophic destructive automated resets lacking governance change control',
      'Subjective customer perception surveys instead of objective statistical metrics'
    ]
  },
  {
    id: 'aaig-d3-003',
    domainId: 'D3',
    subDomain: 'D3.4 Explainability, Interpretability & Transparency (XAI)',
    scenarioText: 'An insurance underwriting AI model denies critical medical coverage to an applicant. The model is an ensemble deep neural network that outputs only a probability score without explanatory factor attribution.',
    questionText: 'From an AI governance standpoint, what is the MOST severe liability created by this deployment?',
    options: [
      'The model requires more server compute power to run inference than a linear regression model.',
      'Inability to provide legally mandated adverse action notices and defend against regulatory allegations of arbitrary denial.',
      'The data science team cannot publish academic research papers about the model architecture.',
      'Competitor insurance firms may copy the user interface layout of the mobile application.'
    ],
    correctIndex: 1,
    questionType: 'MOST',
    explanation: 'In regulated high-stakes decisions (insurance, credit, employment), deployers are legally obligated to provide explainable adverse action rationales. An opaque "black-box" prevents legal contestability and invites massive regulatory fines.',
    distractorExplanations: [
      'A: Server compute costs are minor operational line-items compared to major regulatory sanctions.',
      'C: Academic publishing is completely irrelevant to commercial compliance and fiduciary duties.',
      'D: Competitor UI copying does not relate to explainability and adverse action mandates.'
    ],
    source: 'ISACA AAIG Review Manual D3; EU AI Act Art. 13; Equal Credit Opportunity Act (ECOA)',
    difficulty: 'Director-Level',
    distractorAxes: [
      'Treating regulatory liability as an IT compute hardware cost issue',
      'Prioritizing academic recognition over statutory compliance obligations',
      'Confusing front-end UI competition with core decision contestability'
    ]
  },
  {
    id: 'aaig-d3-004',
    domainId: 'D3',
    subDomain: 'D3.5 Auditability, Logging & Continuous Assurance',
    scenarioText: 'An external compliance auditor requests evidence showing how a customer support AI assistant handled an escalated privacy inquiry three months ago. However, the system only logged aggregated daily request counts.',
    questionText: 'Which logging governance control was DEFICIENT in this architecture?',
    options: [
      'Failure to preserve interaction logs including prompt inputs, retrieved contextual chunks, model outputs, and guardrail decisions.',
      'Failure to install real-time GPU cooling sensor monitors across third-party cloud data centers.',
      'Failure to publish the internal developer chat channels to a publicly accessible external website.',
      'Failure to conduct weekly in-person interviews with every single customer who accessed the web portal.'
    ],
    correctIndex: 0,
    questionType: 'BEST',
    explanation: 'Auditability and continuous assurance require retaining end-to-end transaction telemetry: input prompts, context retrieved via RAG, guardrail triggers, model versioning, and actual output for defined retention periods to ensure defensibility.',
    distractorExplanations: [
      'B: Data center cooling logs belong to physical cloud facility maintenance, not application transaction auditing.',
      'C: Internal chat channels should remain confidential and are not standard application audit trails.',
      'D: Mandatory customer interviews are unfeasible and do not replace automated transaction logging.'
    ],
    source: 'ISACA AAIG Review Manual D3; ISO/IEC 42001 Cl. 9.2; NIST AI RMF MEASURE 2.6',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Physical facility hardware logs instead of application audit telemetry',
      'Inappropriate disclosure of internal employee communications',
      'Impractical manual customer polling instead of technical system logging'
    ]
  },

  // =========================================================================
  // DOMAIN 4: RISK OVERSIGHT & COMPLIANCE FRAMEWORKS (25%)
  // =========================================================================
  {
    id: 'aaig-d4-001',
    domainId: 'D4',
    subDomain: 'D4.1 Regulatory Landscapes & Global Compliance (EU AI Act)',
    scenarioText: 'An enterprise is launching an AI-powered biographical biometric identification system for access control in public spaces across the European Union.',
    questionText: 'Under the EU AI Act risk classification schema, how is this AI application primarily classified?',
    options: [
      'Minimal or No Risk, requiring zero compliance documentation or conformity assessment.',
      'Prohibited AI practice or strictly High-Risk, subject to rigorous conformity assessments and fundamental rights impact assessments.',
      'Limited Risk, requiring only a simple automated transparency watermark notice on video outputs.',
      'General Purpose AI (GPAI) exempt from downstream deployer compliance obligations.'
    ],
    correctIndex: 1,
    questionType: 'PRIMARY',
    explanation: 'Under the EU AI Act, real-time remote biometric identification in public spaces is either outright prohibited (subject to narrow law enforcement exceptions) or classified as High-Risk, demanding mandatory conformity assessments, strict risk management, and fundamental rights impact assessments.',
    distractorExplanations: [
      'A: Biometric identification in public spaces is never classified as minimal risk.',
      'C: Limited risk applies to simple chatbots and deepfakes requiring transparency, not public biometrics.',
      'D: Deployers using biometric systems are directly subject to strict high-risk deployment obligations.'
    ],
    source: 'EU AI Act Articles 5 & 6, Annex III; ISACA AAIG Review Manual D4',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Grossly underestimating regulatory severity as minimal risk',
      'Confusing limited risk transparency obligations with high-risk systemic controls',
      'Incorrectly assuming deployers are exempt under general purpose AI provisions'
    ]
  },
  {
    id: 'aaig-d4-002',
    domainId: 'D4',
    subDomain: 'D4.2 Standards Implementation (ISO/IEC 42001 AIMS, ISO 23894)',
    scenarioText: 'An enterprise is implementing ISO/IEC 42001 to achieve certified compliance for its Artificial Intelligence Management System (AIMS).',
    questionText: 'What is the PRIMARY purpose of the Statement of Applicability (SoA) in ISO/IEC 42001?',
    options: [
      'Listing all hardware GPU serial numbers and verifying physical data center temperature logs.',
      'Documenting which Annex A controls have been selected or excluded, along with the justifications tied to the AI risk assessment.',
      'Certifying that the organization has achieved zero residual risk across all production AI algorithms.',
      'Providing an unredacted copy of all proprietary source code to external regulators on a weekly schedule.'
    ],
    correctIndex: 1,
    questionType: 'PRIMARY',
    explanation: 'In ISO/IEC 42001 (similar to ISO 27001), the Statement of Applicability (SoA) documents which controls from Annex A are selected or excluded, providing documented justification based on the organization’s AI risk assessment and regulatory requirements.',
    distractorExplanations: [
      'A: Hardware serial numbers belong to physical IT inventory, not the AIMS Statement of Applicability.',
      'C: Zero residual risk is unattainable and reflects an impossible, non-standard governance claim.',
      'D: The SoA does not disclose proprietary source code to regulators.'
    ],
    source: 'ISO/IEC 42001:2023 Cl. 6.1.3; ISACA AAIG Review Manual D4',
    difficulty: 'Director-Level',
    distractorAxes: [
      'Confusing management system SoA with low-level physical hardware logs',
      'Claiming unattainable zero residual risk rather than documented risk treatment',
      'Misinterpreting compliance documentation as unconditional source code disclosure'
    ]
  },
  {
    id: 'aaig-d4-003',
    domainId: 'D4',
    subDomain: 'D4.3 Framework Mapping (NIST AI RMF GOVERN/MAP/MEASURE/MANAGE)',
    scenarioText: 'An AI risk officer is mapping internal enterprise controls to the NIST AI Risk Management Framework (NIST AI RMF 1.0).',
    questionText: 'Which core function of the NIST AI RMF is designed to cultivate a culture of risk awareness and establish enterprise-wide oversight policies that crosscut all other functions?',
    options: [
      'MEASURE: because tracking quantitative metrics automatically establishes organizational culture.',
      'GOVERN: because it establishes policies, accountability, organizational structure, and risk culture across the AI lifecycle.',
      'MAP: because contextualizing specific contextual risks eliminates the need for top-down governance oversight.',
      'MANAGE: because allocating day-to-day bug fixes represents the top priority of executive leadership.'
    ],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: 'In NIST AI RMF 1.0, GOVERN is the foundational, cross-cutting function that sets organizational priorities, culture, policies, legal compliance, and workforce expectations, informing and enabling MAP, MEASURE, and MANAGE.',
    distractorExplanations: [
      'A: MEASURE analyzes and tracks metrics, but metrics alone do not create governance policies or culture.',
      'C: MAP identifies context and categorizes risks, but operates under the mandate provided by GOVERN.',
      'D: MANAGE executes risk treatment and response, which is downstream from organizational governance.'
    ],
    source: 'NIST AI RMF 1.0 Section 5.1; ISACA AAIG Review Manual D4',
    difficulty: 'Fundamental',
    distractorAxes: [
      'Assuming technical measurement metrics organically produce organizational culture',
      'Believing bottom-up context mapping replaces executive governance oversight',
      'Treating tactical incident/bug management as foundational executive governance'
    ]
  },
  {
    id: 'aaig-d4-004',
    domainId: 'D4',
    subDomain: 'D4.4 Third-Party & Supply Chain AI Risk Management',
    scenarioText: 'An enterprise is contracting with a cloud vendor for a specialized conversational customer service AI. The vendor contract contains standard indemnification clauses but is silent on whether customer conversations will be retained to train the vendor’s public models.',
    questionText: 'What is the BEST course of action for the enterprise risk officer before signing the agreement?',
    options: [
      'Sign the contract immediately to accelerate time-to-market since the cloud vendor has a strong market brand.',
      'Mandate explicit contractual terms prohibiting customer prompt data retention and secondary training rights, with audit verification clauses.',
      'Rely solely on verbal assurances made by the vendor sales representative during product demonstrations.',
      'Assume all liability on behalf of the customer and purchase excess commercial general liability insurance.'
    ],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: 'Third-party AI governance mandates enforceable contractual restrictions prohibiting vendor retention or reuse of confidential prompts/data for model training, accompanied by audit and verification rights.',
    distractorExplanations: [
      'A: Brand reputation does not protect against data leakage or regulatory penalties under GDPR/CCPA.',
      'C: Verbal vendor representations are legally unenforceable and directly contradict written contracts.',
      'D: Insurance policies do not indemnify against intentional regulatory violations or reputational harm.'
    ],
    source: 'ISACA AAIG Review Manual D4; ISO/IEC 42001 Cl. 8.4; NIST AI RMF GOVERN 3.2',
    difficulty: 'Intermediate',
    distractorAxes: [
      'Blind trust in external vendor brand reputation over legal contracts',
      'Relying on unenforceable verbal sales representations',
      'Passive insurance transfer instead of proactive contractual risk controls'
    ]
  },
  {
    id: 'aaig-d4-005',
    domainId: 'D4',
    subDomain: 'D4.5 Risk Appetite, Tolerance & Continuous Oversight',
    scenarioText: 'A high-impact enterprise AI diagnostic model exhibits residual risk exceeding the board-approved risk tolerance threshold, but business leaders project significant quarterly profits from immediate deployment.',
    questionText: 'Under sound enterprise governance doctrine, what is the REQUIRED action?',
    options: [
      'Proceed with immediate deployment because projected commercial profits automatically override established risk tolerance.',
      'Halt deployment or redesign the system with enhanced controls until residual risk falls within approved tolerance, or obtain formal board-level risk acceptance.',
      'Instruct junior engineers to suppress risk reporting metrics until after the quarterly financial earnings release.',
      'Transfer the excess risk by requiring end-users to click an unconditional liability waiver on the mobile app.'
    ],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: 'Risk appetite and tolerance boundaries set by executive leadership cannot be breached for short-term profit. When residual risk exceeds appetite, the system must be halted/redesigned or escalated for formal executive risk acceptance.',
    distractorExplanations: [
      'A: Commercial revenue benefits never automatically override board-mandated risk appetite limits.',
      'C: Suppressing risk metrics represents deceptive fraud and intentional breach of fiduciary duty.',
      'D: Consumer waivers do not shield deployers from regulatory enforcement for unsafe high-risk systems.'
    ],
    source: 'ISACA AAIG Review Manual D4; COBIT 2019 EDM03; ISO 31000 Risk Management',
    difficulty: 'Director-Level',
    distractorAxes: [
      'Subordinating established board risk tolerance to short-term revenue pressure',
      'Fraudulent suppression of risk reporting metrics',
      'Attempting consumer waivers to bypass regulatory non-compliance'
    ]
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  ...BASE_QUESTIONS,
  ...GENERATED_QUESTIONS,
];

