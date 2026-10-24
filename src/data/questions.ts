import { Question } from '../types';
import { GENERATED_QUESTIONS } from './generatedQuestions';
import { SUPPLEMENTAL_QUESTIONS } from './supplementalQuestions';
import { FUNDAMENTAL_QUESTIONS } from './fundamentalQuestions';
import { EXPANSION_QUESTIONS } from './expansionQuestions';
import { EXPANSION_QUESTIONS_2 } from './expansionQuestions2';
import { applyDistractorRewrite } from './distractorRewrites';
import { applyEvidenceVerification } from './evidenceVerification';
import { applyReviewRecord } from './reviewRecords';
import { RETIRED_QUESTION_IDS } from './retiredQuestions';
import { CORRECT_POSITION_MOVES } from './correctPositionMoves';
import { markQuestionUnreviewed, swapQuestionOptions } from '../services/questionOrder';
import { normalizeQuestionDomain } from '../services/domainTaxonomy';

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
    options: ["Immediately mandate a technical penetration test and red-teaming assessment on all vendor APIs.","Charter an AI Governance Steering Committee with decision rights, while containing urgent pilot risks.","Instruct the IT department to block access to all generative AI endpoints until procurement review finishes.","Deploy an automated monitoring dashboard to capture real-time prompt token consumption and latency metrics."],
    correctIndex: 1,
    questionType: 'FIRST',
    explanation: "When business units initiate uncoordinated vendor pilots without central oversight, the Chief AI Governance Officer should establish a cross-functional AI Governance Steering Committee operating under a formal charter, clear decision rights, and board-approved risk appetite thresholds (while containing any immediate data leakage or compliance exposures in parallel). This top-down governance structure provides the mandate and evaluation criteria needed to govern subsequent red-teaming (Option A), access controls (Option C), and operational telemetry (Option D).",
    distractorExplanations: [
      'A: Red-teaming is an operational/technical verification step that happens after governance scope and policies are defined.',
      'C: Blanket blockage is an abrupt operational reaction that damages business agility before establishing authorized governance channels.',
      'D: Metric tracking is an ongoing operational monitoring duty, not the primary foundational governance step.'
    ],
    source: "NIST AI RMF 1.0 GOVERN 1.2, 1.3 & 2.1; IIA Three Lines Model (2020); ISO/IEC 42001:2023 Cl. 5 (verify against licensed standard).",
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
    questionText: "Under the IIA Three Lines Model, which responsibility is characteristic of the SECOND LINE roles in enterprise AI governance?",
    options: ["Designing and executing day-to-day model validation tests during the data science training pipeline.","Setting AI risk frameworks and policies, and objectively challenging first-line management.","Conducting periodic independent assurance audits directly reporting to the Board Audit Committee.","Accepting residual business risks and determining commercial trade-offs for high-impact use cases."],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: "Under the IIA Three Lines Model (2020), both first- and second-line roles are part of management. First-line roles own and manage operational AI delivery and day-to-day validation controls (Option A) and accept commercial/operational risks within approved appetite (Option D). Second-line roles (Risk and Compliance) provide complementary expertise, establish risk frameworks and policies under delegated authority, monitor adherence to risk appetite, and provide objective challenge to the first line. Independent assurance reporting directly to the Audit Committee belongs exclusively to the third line, Internal Audit (Option C).",
    distractorExplanations: [
      'A: Model validation during development is a 1st line operational control duty.',
      'C: Independent audit reporting directly to the Board is the role of 3rd line (Internal Audit).',
      'D: Accepting residual business risks is the duty of the business asset owner (1st line management), not the risk oversight function.'
    ],
    source: "IIA Three Lines Model (2020) Principles 2–4; NIST AI RMF 1.0 GOVERN 1.2 & 1.3; COBIT 2019 (verify specific governance/management objectives against licensed text).",
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
      'Ensuring that AI investments create measurable stakeholder value within approved risk appetite.',
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
      'Issue an enforceable AI Acceptable Use Policy listing approved tools, prohibited data and sanctions.',
      'Install client-side keystroke loggers on every employee laptop without updating written policies.',
      'Demand that consumer-tier LLM vendors sign a custom business associate agreement (BAA) retroactively.'
    ],
    correctIndex: 1,
    questionType: 'MOST',
    explanation: "When employees input customer complaint transcripts into unvetted public consumer LLMs, formulating and enforcing a specific AI Acceptable Use Policy (AUP)—defining approved enterprise tools, data-classification restrictions (prohibiting confidential or regulated personal data inputs into public models), human review expectations, and compliance consequences—is the essential governance baseline, paired with immediate containment and secure enterprise alternatives.",
    distractorExplanations: [
      'A: Vague emails do not establish binding enterprise policy or enforceable boundaries.',
      'C: Technical surveillance without clear policy creates employee legal/privacy backlash and fails governance standards.',
      'D: Consumer-tier public web vendors will not execute enterprise BAAs retroactively for unauthorized personal usage.'
    ],
    source: "NIST AI RMF 1.0 GOVERN 1.2; NIST AI 600-1 GOVERN 1.2; GDPR Arts. 5(1)(f) & 32; ISO/IEC 42001:2023 Cl. 5.2 (verify against licensed standard).",
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
    options: ["Data minimization; the engineering team must mask applicant names while retaining postal code weights unchanged in production.","Fairness and non-discrimination; the AI Governance Committee must mandate proxy variable audits and fairness-aware retraining.","Technical robustness; the MLOps team must increase training epochs to reinforce existing historical credit approval correlations.","Third-party confidentiality; the legal team must classify the feature-importance matrix as a trade secret to prevent external regulatory inspection."],
    correctIndex: 1,
    questionType: 'PRIMARY',
    explanation: "Using neutral variables (such as postal codes) that strongly correlate with protected demographic attributes and produce unjustified disparate denial rates constitutes proxy discrimination, breaching fairness and non-discrimination principles. Sound AI governance requires proxy-variable and disparate-impact audits, bias mitigation or model redesign, and second-line validation prior to continued use.",
    distractorExplanations: ["A: Masking applicant names while retaining discriminatory postal-code weights does not address proxy discrimination or unjustified disparate denial rates.","C: Reinforcing historical approval correlations may perpetuate the bias rather than assess and mitigate proxy discrimination.","D: Trade-secret classification does not resolve proxy discrimination or substitute for lawful regulatory scrutiny."],
    source: "OECD AI Principles (OECD/LEGAL/0449, 2024) Principle 1.2; NIST AI RMF 1.0 MEASURE 2.11; EU AI Act Art. 10(2)(f)–(g); US ECOA / Regulation B (12 CFR Part 1002).",
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
      'An enterprise AI asset inventory with model cards recording intended use, owners, provenance and risk tier.',
      'A centralized repository containing raw training loss curves and GPU power consumption telemetry logs.',
      'An annual employee acknowledgment form confirming that clinicians understand the hospital acceptable use policy.',
      'A blanket non-disclosure agreement signed by all external cloud foundation model vendors and contractors.'
    ],
    correctIndex: 0,
    questionType: 'MOST',
    explanation: "Traditional IT asset registries tracking only server hostnames and software licenses lack AI-specific governance metadata. Establishing an enterprise AI asset inventory (NIST AI RMF GOVERN 1.6) paired with standardized Model Cards (documenting intended clinical use, out-of-scope uses, accountable owners, PHI data lineage, evaluation conditions, and risk tier) provides executive leadership and risk oversight with essential visibility into clinical AI deployments.",
    distractorExplanations: [
      'B: Loss curves and GPU telemetry are technical developer metrics devoid of risk or clinical governance context.',
      'C: Policy acknowledgments do not solve the structural absence of an AI asset inventory.',
      'D: NDAs address confidentiality in procurement, not internal visibility into deployed clinical models.'
    ],
    source: "NIST AI RMF 1.0 GOVERN 1.6 & MAP 1.1; Mitchell et al., 'Model Cards for Model Reporting' (arXiv:1810.03993); ISO/IEC 42001:2023 (verify inventory clauses against licensed standard).",
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
      'Aggregate metric masking, where high overall accuracy hides severe bias against specific demographic groups.',
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
      'Data minimization and automated de-identification to strip direct identifiers before ingestion.',
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
    options: ["Mandatory reclassification of all downstream internal analytics models as prohibited AI practices under EU AI Act Article 5.","Distorted tail distributions, amplified biases or artifacts, residual privacy leakage, and model collapse.","Automatic invalidation of existing enterprise encryption certificates across cloud storage buckets.","Statutory prohibition against combining third-party datasets with internal historical records under NIST AI RMF."],
    correctIndex: 1,
    questionType: 'PRIMARY',
    explanation: "Incorporating unvalidated synthetic financial data introduces major governance risks: loss or distortion of rare real-world tail events, propagation or amplification of generator biases and statistical artifacts, potential memorization/privacy leakage (e.g., membership inference attacks), and conditional model collapse if models are recursively trained on generated outputs without curated real-world anchoring. Governance requires validating distributional fidelity, bias, provenance, and privacy bounds prior to ingestion.",
    distractorExplanations: ["A: Incorporating synthetic data does not automatically make every downstream analytics model a prohibited practice under EU AI Act Article 5.","C: Synthetic-data ingestion does not automatically invalidate enterprise encryption certificates.","D: NIST AI RMF does not impose a statutory prohibition on combining third-party datasets with internal historical records."],
    source: "Shumailov et al. (arXiv:2305.17493); NIST AI 600-1; NIST AI RMF 1.0 MAP 2.3 & MEASURE 2.6, 2.7, 2.10, 2.11; ISO/IEC 42001:2023 (verify data clauses against licensed standard).",
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
      'Total cost of ownership, maintenance liability, data confidentiality rights and fit with internal capabilities.',
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
      'Calibrated drift and performance thresholds linked to predefined remediation and human escalation workflows.',
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
    scenarioText: "A financial or insurance institution deploys an opaque ensemble deep neural network for retail credit underwriting or life/health insurance risk assessment that outputs only a rejection probability score without factor attribution.",
    questionText: 'From an AI governance standpoint, what is the MOST severe liability created by this deployment?',
    options: ["Mandatory disclosure of proprietary neural network weights to competing institutions under open-data rules.","Inability to provide legally mandated adverse action notices and defend against regulatory allegations of arbitrary denial.","Automatic classification of any deep neural network architecture as an unacceptable prohibited practice under EU AI Act Article 5.","Inability of first-line engineers to compress the model using post-training quantization."],
    correctIndex: 1,
    questionType: 'MOST',
    explanation: "In regulated high-impact consumer decisions (such as credit underwriting under US ECOA / Regulation B, 12 CFR § 1002.9 and CFPB Circular 2022-03, or covered Annex III 5(b) credit and 5(c) life/health insurance decisions subject to EU AI Act Article 13 deployer transparency and Article 86 individual right to explanation), deploying an unexplainable black-box model without validated factor attribution prevents the deployer from issuing legally compliant adverse-action/decision explanations, impairs human oversight, and exposes the firm to enforcement actions.",
    distractorExplanations: ["A: Decision explainability does not require mandatory disclosure of proprietary neural-network weights to competitors.","C: A deep neural-network architecture alone does not automatically make a use case a prohibited practice under EU AI Act Article 5.","D: Whether engineers can quantize the model does not address adverse-action explanations or the governance liability in this scenario."],
    source: "Regulation (EU) 2024/1689 (EU AI Act) Art. 13, Art. 86 & Annex III 5(b)/(c); US ECOA / Regulation B (12 CFR § 1002.9); NIST AI RMF 1.0 MEASURE 2.8 & 2.9.",
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
      'Failure to retain logs of prompts, retrieved context, model outputs and guardrail decisions.',
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
      'Prohibited practice or high-risk, with conformity and fundamental rights impact assessments.',
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
      'Recording which Annex A controls are included or excluded, and why, based on the AI risk assessment.',
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
      'Require contract terms prohibiting prompt data retention and secondary training use, with audit rights.',
      'Rely solely on verbal assurances made by the vendor sales representative during product demonstrations.',
      'Assume all liability on behalf of the customer and purchase excess commercial general liability insurance.'
    ],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: "Under NIST AI RMF 1.0 (GOVERN 6.1 & 6.2) and NIST AI 600-1, third-party AI procurement requires explicit, enforceable contractual terms governing customer prompt/conversation data retention, prohibiting unauthorized secondary training on enterprise/customer data, and establishing risk-proportionate audit or independent assurance verification mechanisms prior to contract execution.",
    distractorExplanations: [
      'A: Brand reputation does not protect against data leakage or regulatory penalties under GDPR/CCPA.',
      'C: Verbal vendor representations are legally unenforceable and directly contradict written contracts.',
      'D: Insurance policies do not indemnify against intentional regulatory violations or reputational harm.'
    ],
    source: "NIST AI RMF 1.0 GOVERN 6.1 & 6.2; NIST AI 600-1; GDPR Art. 28; ISO/IEC 42001:2023 (verify supplier controls against licensed standard).",
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
      'Halt or redesign until residual risk is within tolerance, or obtain formal board-level risk acceptance.',
      'Instruct junior engineers to suppress risk reporting metrics until after the quarterly financial earnings release.',
      'Transfer the excess risk by requiring end-users to click an unconditional liability waiver on the mobile app.'
    ],
    correctIndex: 1,
    questionType: 'BEST',
    explanation: "When residual risk of a high-impact AI system exceeds approved risk tolerance thresholds, commercial profit projections cannot override governance boundaries. Deployment must be halted or the system redesigned/mitigated until residual risk falls within approved tolerance—or, solely where statutory and regulatory safety floors are not violated, formally escalated to the governing body for documented risk acceptance.",
    distractorExplanations: [
      'A: Commercial revenue benefits never automatically override board-mandated risk appetite limits.',
      'C: Suppressing risk metrics represents deceptive fraud and intentional breach of fiduciary duty.',
      'D: Consumer waivers do not shield deployers from regulatory enforcement for unsafe high-risk systems.'
    ],
    source: "NIST AI RMF 1.0 GOVERN 1.2, MANAGE 1.3 & MANAGE 2.4; ISO 31000:2018 & COBIT 2019 EDM03 (verify specific standard clauses against licensed texts).",
    difficulty: 'Director-Level',
    distractorAxes: [
      'Subordinating established board risk tolerance to short-term revenue pressure',
      'Fraudulent suppression of risk reporting metrics',
      'Attempting consumer waivers to bypass regulatory non-compliance'
    ]
  }
];

// Skips items whose correct option is no longer at the recorded origin, so a
// move already written into the source data is never applied twice.
function applyCorrectPositionMove(question: Question): Question {
  const move = CORRECT_POSITION_MOVES[question.id];
  return move && question.correctIndex === move[0] ? swapQuestionOptions(question, move[0], move[1]) : question;
}

export const INITIAL_QUESTIONS: Question[] = [
  ...BASE_QUESTIONS.map(markQuestionUnreviewed).map(normalizeQuestionDomain),
  ...GENERATED_QUESTIONS,
].map(applyCorrectPositionMove).concat(SUPPLEMENTAL_QUESTIONS, FUNDAMENTAL_QUESTIONS, EXPANSION_QUESTIONS, EXPANSION_QUESTIONS_2).map(applyDistractorRewrite).map(applyEvidenceVerification).map(applyReviewRecord);

/** The bank learners practice from: every question except retired near-duplicates. */
export const ACTIVE_QUESTIONS: Question[] = INITIAL_QUESTIONS.filter(question => !RETIRED_QUESTION_IDS.has(question.id));
