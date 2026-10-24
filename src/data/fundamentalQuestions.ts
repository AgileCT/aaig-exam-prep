import { Difficulty, DomainId, Question, QuestionType } from '../types';
import { markQuestionUnreviewed } from '../services/questionOrder';

// Hand-authored Fundamental-level items (2026-10-24). Short options, non-financial
// scenarios, and distractors that are plausible actions or concepts that fail on
// the scenario's facts. Citations were written without primary-source access and
// remain unverified; all items load as unreviewed.
interface Spec {
  id: string;
  domainId: DomainId;
  subDomain: string;
  questionType: QuestionType;
  scenarioText: string;
  questionText: string;
  correct: string;
  wrong: [string, string, string];
  position: 0 | 1 | 2 | 3;
  explanation: string;
  why: [string, string, string];
  axes: [string, string, string];
  source: string;
  difficulty?: Difficulty;
}

function build(spec: Spec): Question {
  const options = [...spec.wrong];
  options.splice(spec.position, 0, spec.correct);
  const letters = [0, 1, 2, 3].filter(i => i !== spec.position).map(i => 'ABCD'[i]);
  return {
    id: spec.id, domainId: spec.domainId, subDomain: spec.subDomain, questionType: spec.questionType,
    scenarioText: spec.scenarioText, questionText: spec.questionText, options, correctIndex: spec.position,
    explanation: spec.explanation,
    distractorExplanations: spec.why.map((text, i) => `${letters[i]}: ${text}`),
    distractorAxes: [...spec.axes], source: spec.source, difficulty: spec.difficulty ?? 'Fundamental',
  };
}

const SPECS: Spec[] = [
  {
    id: 'aaig-d1s-101', domainId: 'D1', subDomain: 'D1.4 Roles, Responsibilities & Three Lines Model', questionType: 'BEST', position: 2,
    scenarioText: 'A county benefits office uses an AI tool to sort incoming claim documents. The county has a central risk team and an internal audit department.',
    questionText: 'Who is responsible for managing this tool\'s risks day to day?',
    correct: 'The benefits office managers who operate the tool',
    wrong: ['The county risk team that issues the AI rules', 'The internal audit department that reports to the board', 'The vendor that hosts and supplies the sorting software'],
    explanation: 'Under the Three Lines Model, management that owns and operates the process, the first line, is responsible for managing its risks day to day. The risk team supports and challenges, internal audit gives independent assurance, and a supplier does not take over the organization\'s accountability.',
    why: ['The risk team is a second-line function. It sets the framework and challenges, but does not run the process.', 'Internal audit is the third line. It provides independent assurance and must not manage the risks it audits.', 'A vendor can perform tasks, but the county remains accountable for the risks of using the tool.'],
    axes: ['Second-line oversight mistaken for first-line ownership', 'Third-line assurance mistaken for risk management', 'Outsourced service mistaken for transferred accountability'],
    source: 'IIA Three Lines Model (2020); NIST AI RMF 1.0 GOVERN 2.1.',
  },
  {
    id: 'aaig-d1s-102', domainId: 'D1', subDomain: 'D1.9 Risk Appetite, Tolerance & Continuous Oversight', questionType: 'BEST', position: 0,
    scenarioText: 'A regional airline\'s board is preparing statements to guide the use of AI in crew scheduling and wants the terms used correctly.',
    questionText: 'Which statement correctly distinguishes risk appetite from risk tolerance?',
    correct: 'Appetite is the overall risk sought; tolerance is the acceptable variation for one objective.',
    wrong: ['Appetite covers financial risk only, and tolerance covers only technology and operational risks.', 'Tolerance is set by the board, and appetite is decided separately by each project team.', 'They are two names for the same threshold, used in different policy documents.'],
    explanation: 'Risk appetite is the broad amount and type of risk an organization is willing to pursue to meet its objectives. Risk tolerance is the acceptable deviation from objectives, expressed in measurable terms for specific cases. Both are normally set at the top and apply across risk types.',
    why: ['Both concepts apply to every risk type, not to one category each.', 'Both are set by senior leadership. Project teams operate within them rather than defining them.', 'They are related but distinct: one is broad and directional, the other specific and measurable.'],
    axes: ['Wrongly splitting the concepts by risk category', 'Wrongly assigning authority to project teams', 'Treating two distinct concepts as synonyms'],
    source: 'COBIT 2019 EDM03; ISO 31000:2018 (verify definitions against licensed texts).',
  },
  {
    id: 'aaig-d1s-103', domainId: 'D1', subDomain: 'D1.6 Regulatory Landscapes & Global Compliance (EU AI Act)', questionType: 'FIRST', position: 3,
    scenarioText: 'A mid-sized HR software company wants to add a feature that ranks job applicants for its customers in the EU.',
    questionText: 'What should the company determine FIRST about the feature?',
    correct: 'Whether the feature is high-risk under the EU AI Act',
    wrong: ['Which fairness metric the data science team prefers to report', 'Whether customers will accept a higher price for the ranking module', 'Which notified body it would hire to certify the feature'],
    explanation: 'Classification drives every later obligation. Employment-related uses such as ranking applicants are listed as high-risk, so the company must establish the category before choosing metrics, pricing or conformity routes.',
    why: ['Metric choice matters, but it depends on what obligations apply, which classification decides.', 'Pricing is a commercial question that does not change the legal obligations.', 'Choosing a notified body is premature until the company knows whether, and which, assessment applies.'],
    axes: ['Technical detail chosen before classification', 'Commercial question mistaken for a compliance step', 'Conformity step taken before scoping'],
    source: 'EU AI Act Art. 6 & Annex III point 4 (verify against the Regulation text).',
  },
  {
    id: 'aaig-d1s-104', domainId: 'D1', subDomain: 'D1.5 Ethical Frameworks & Responsible AI Principles', questionType: 'MOST', position: 1,
    scenarioText: 'A school district uses an AI tool to flag students for extra support. After a wrong flag upset a family, parents ask who answers for the tool\'s decisions.',
    questionText: 'Which principle is MOST directly concerned with this question?',
    correct: 'Accountability: named people answer for outcomes and can be challenged',
    wrong: ['Transparency: telling people that an AI tool is being used.', 'Fairness: checking that outcomes do not disadvantage particular groups.', 'Robustness: keeping accuracy steady as conditions change.'],
    explanation: 'The parents are asking who is answerable for the tool\'s outcomes, which is accountability. Transparency, fairness and robustness are related principles, but none of them assigns responsibility to identifiable people.',
    why: ['Transparency informs people that AI is used. It does not say who is answerable.', 'Fairness concerns the distribution of outcomes across groups, not who answers for them.', 'Robustness concerns technical stability, not responsibility.'],
    axes: ['Disclosure mistaken for responsibility', 'Outcome equity mistaken for responsibility', 'Technical stability mistaken for responsibility'],
    source: 'OECD AI Principles (2019, updated 2024); NIST AI RMF 1.0 GOVERN 2.1.',
  },
  {
    id: 'aaig-d1s-105', domainId: 'D1', subDomain: 'D1.7 Standards Implementation (ISO/IEC 42001 AIMS, ISO 23894)', questionType: 'PRIMARY', position: 0,
    scenarioText: 'A manufacturer\'s procurement team is comparing AI suppliers. One supplier holds an ISO/IEC 42001 certificate.',
    questionText: 'What does the certificate PRIMARILY indicate?',
    correct: 'The supplier runs a documented management system for its AI activities.',
    wrong: ['Every model the supplier sells has been tested and shown to be free of bias.', 'The supplier\'s products are approved for sale under the EU AI Act.', 'The supplier\'s AI systems have been independently verified as accurate.'],
    explanation: 'ISO/IEC 42001 is a management system standard. Certification shows that an organization has established, implemented and maintains an AI management system audited against the standard. It is not a product approval, a regulatory conformity decision, or proof of model accuracy or absence of bias.',
    why: ['Certification audits the management system, not the outcome of each model.', 'Regulatory conformity under the EU AI Act is a separate process with its own requirements.', 'The standard does not certify the accuracy of individual AI systems.'],
    axes: ['System certification mistaken for model testing', 'Standard certification mistaken for regulatory approval', 'Management system mistaken for accuracy verification'],
    source: 'ISO/IEC 42001:2023 (verify against licensed standard).',
  },
  {
    id: 'aaig-d1s-106', domainId: 'D1', subDomain: 'D1.8 Framework Mapping (NIST AI RMF GOVERN/MAP/MEASURE/MANAGE)', questionType: 'BEST', position: 3,
    scenarioText: 'A nonprofit adopting the NIST AI RMF wants to know where organization-wide policies, roles and risk culture belong.',
    questionText: 'Which function covers these elements?',
    correct: 'GOVERN, which sets policies, roles and culture for all functions',
    wrong: ['MAP, which establishes the context in which a system will operate', 'MEASURE, which analyzes and tracks identified risks with metrics', 'MANAGE, which prioritizes and acts on risks that have been measured'],
    explanation: 'GOVERN is the cross-cutting function that establishes the policies, accountability structures and culture that the MAP, MEASURE and MANAGE functions rely on.',
    why: ['MAP frames the context and risks of a specific system; it does not set organization-wide policy.', 'MEASURE assesses and tracks risks; it does not establish roles or culture.', 'MANAGE responds to prioritized risks; it depends on the policies GOVERN establishes.'],
    axes: ['Context framing mistaken for policy setting', 'Risk analysis mistaken for policy setting', 'Risk response mistaken for policy setting'],
    source: 'NIST AI RMF 1.0 Section 5 (Core).',
  },
  {
    id: 'aaig-d2s-101', domainId: 'D2', subDomain: 'D2.2 Enterprise AI Asset Inventory & Model Cards', questionType: 'FIRST', position: 1,
    scenarioText: 'A university finds that departments have been running chatbots and grading assistants that central IT did not know about.',
    questionText: 'What should the CIO establish FIRST?',
    correct: 'A full list of the AI systems in use, each with a responsible person',
    wrong: ['A ban on all generative AI tools until the board has reviewed them', 'Annual training for faculty on how large language models work', 'A standard contract clause requiring suppliers to disclose training data'],
    explanation: 'Oversight depends on knowing what exists. An inventory with named responsibility makes later steps, such as risk tiering, policy and training, possible. A blanket ban, training and contract terms all depend on knowing which systems are in use.',
    why: ['A ban acts without knowing what is in use and may push use out of sight.', 'Training helps, but it cannot be targeted until the systems and users are known.', 'Contract terms apply only to systems the university knows it has bought.'],
    axes: ['Drastic restriction before visibility', 'Awareness activity before scoping', 'Contractual control before discovery'],
    source: 'NIST AI RMF 1.0 GOVERN 1.6; ISO/IEC 42001:2023 Annex A (verify against licensed standard).',
  },
  {
    id: 'aaig-d2s-102', domainId: 'D2', subDomain: 'D2.4 Algorithmic Bias & Representation Drift', questionType: 'PRIMARY', position: 2,
    scenarioText: 'A skin-lesion detection tool was trained mostly on images of light skin. In clinics it misses lesions on dark skin far more often.',
    questionText: 'What kind of problem does this PRIMARILY illustrate?',
    correct: 'Training data that under-represents groups the tool serves',
    wrong: ['Concept drift caused by changing disease patterns over time', 'Overfitting caused by training for too long on one dataset', 'Label noise caused by inconsistent diagnoses among clinicians'],
    explanation: 'The gap in performance between groups traces back to who is, and is not, in the training data. That is representation bias. Drift, overfitting and label noise would not explain a performance gap that follows skin tone.',
    why: ['Drift is change over time, and nothing in the scenario changed over time.', 'Overfitting hurts performance on all new data, not only on one group.', 'Label noise would affect all groups, not mainly one.'],
    axes: ['Temporal change mistaken for group-specific error', 'General model fit mistaken for group-specific error', 'Annotation quality mistaken for group-specific error'],
    source: 'NIST AI RMF 1.0 MAP 2.3 & MEASURE 2.11; NIST SP 1270.',
  },
  {
    id: 'aaig-d2s-103', domainId: 'D2', subDomain: 'D2.3 Privacy by Design & Data Minimization', questionType: 'LEAST', position: 0,
    scenarioText: 'A city transit agency is building a model to forecast demand from rider app data.',
    questionText: 'Which practice is LEAST consistent with data minimization?',
    correct: 'Keeping all rider journey histories forever in case models need them',
    wrong: ['Collecting only the rider attributes needed for the demand forecast itself', 'Deleting raw location traces once the demand totals have been produced', 'Replacing rider identifiers with random tokens before any analysis starts'],
    explanation: 'Data minimization limits personal data to what is necessary for a stated purpose and for no longer than needed. Keeping everything indefinitely for unspecified future use conflicts with both limits. The other practices reduce the amount or identifiability of data.',
    why: ['Collecting only needed attributes is the core of minimization.', 'Deleting raw traces after use applies storage limitation.', 'Tokenizing identifiers reduces identifiability while keeping the data useful.'],
    axes: ['Sound practice: collecting only what is needed', 'Sound practice: deleting after use', 'Sound practice: reducing identifiability'],
    source: 'GDPR Art. 5(1)(c) & (e).',
  },
  {
    id: 'aaig-d2s-104', domainId: 'D2', subDomain: 'D2.5 Provenance, Lineage & Synthetic Data Usage', questionType: 'BEST', position: 3,
    scenarioText: 'A publisher is fine-tuning a language model on its own article archive and wants to be able to trace what went into the model.',
    questionText: 'What does a data lineage record show?',
    correct: 'Where data came from and each change made to it before the model',
    wrong: ['How accurate the model was on each separate batch of training data', 'Which employees are permitted to read the stored dataset and when', 'How much storage the dataset uses in each of the environments the team runs'],
    explanation: 'Lineage traces data from its origin through every transformation to its use, which supports reproducibility, rights checks and investigations. Accuracy per batch, access permissions and storage use are different records.',
    why: ['Per-batch accuracy is a performance measure, not a record of origin and change.', 'Access permissions belong to security records, not lineage.', 'Storage use is an infrastructure measure.'],
    axes: ['Performance record mistaken for lineage', 'Access record mistaken for lineage', 'Infrastructure record mistaken for lineage'],
    source: 'NIST AI RMF 1.0 MAP 4.1; ISO/IEC 42001:2023 Annex A.7.5 (verify against licensed standard).',
  },
  {
    id: 'aaig-d2s-105', domainId: 'D2', subDomain: 'D2.1 Data Governance & Data Quality for AI', questionType: 'MOST', position: 2,
    scenarioText: 'A retailer\'s customer table has no purchase date for about 30% of its records. The data team plans to use it to train a repeat-purchase model.',
    questionText: 'Which data quality dimension is MOST directly affected?',
    correct: 'Completeness: values that are required are missing',
    wrong: ['Timeliness: the values are out of date', 'Uniqueness: the same customer appears more than once', 'Validity: the values do not follow the required format'],
    explanation: 'Missing purchase dates are a completeness problem. The other dimensions describe different defects: stale data, duplicates, and badly formatted values.',
    why: ['Nothing in the scenario says the existing values are out of date.', 'Duplicate customers are not mentioned.', 'The problem is absence of values, not their format.'],
    axes: ['Staleness mistaken for missing values', 'Duplication mistaken for missing values', 'Format errors mistaken for missing values'],
    source: 'NIST AI RMF 1.0 MAP 2.3; ISO/IEC 5259 series (verify against licensed standard).',
  },
  {
    id: 'aaig-d3s-101', domainId: 'D3', subDomain: 'D3.3 Model Drift, Degradation & Performance KPIs', questionType: 'BEST', position: 1,
    scenarioText: 'A retailer\'s demand model started performing worse after the company opened in a new country with a much younger customer base. The link between age and purchasing behavior has not changed.',
    questionText: 'What is this BEST described as?',
    correct: 'Data drift: the inputs now differ from the training data',
    wrong: ['Concept drift: the link between inputs and outcomes changed', 'Model collapse: training on a model\'s own outputs', 'Label leakage: future information used during training'],
    explanation: 'The input distribution, here the age mix, has shifted while the relationship between inputs and outcomes is unchanged. That is data drift. Concept drift requires the relationship itself to change.',
    why: ['The scenario states the relationship between age and purchases is unchanged, so this is not concept drift.', 'Model collapse concerns recursive training on generated data, which is not described.', 'Leakage would inflate training performance, not cause a drop after launch.'],
    axes: ['Relationship change mistaken for input change', 'Recursive training problem mistaken for drift', 'Training-time defect mistaken for post-launch drift'],
    source: 'NIST AI RMF 1.0 MEASURE 2.4 & MANAGE 4.1.',
  },
  {
    id: 'aaig-d3s-102', domainId: 'D3', subDomain: 'D3.4 Explainability, Interpretability & Transparency (XAI)', questionType: 'PRIMARY', position: 0,
    scenarioText: 'A housing agency uses a model to rank rental assistance applications. A rejected applicant asks for the reasons.',
    questionText: 'Which capability does the agency MOST need?',
    correct: 'Explanations of the main factors behind each decision',
    wrong: ['Overall accuracy figures for the model across all applicants', 'A general description of the model\'s training algorithm', 'A weekly count of the applications the model has processed'],
    explanation: 'An individual asking for reasons needs a decision-level explanation. Aggregate accuracy, a general description of the algorithm and throughput numbers do not tell a specific applicant why they were rejected.',
    why: ['Aggregate accuracy describes the model overall, not this decision.', 'A general algorithm description does not give case-specific reasons.', 'Volume statistics say nothing about why a decision was made.'],
    axes: ['Model-level metric instead of decision-level reasons', 'Generic description instead of case-specific reasons', 'Operational statistic instead of reasons'],
    source: 'NIST AI RMF 1.0 MEASURE 2.9; GDPR Art. 22 & Recital 71 (where applicable).',
  },
  {
    id: 'aaig-d3s-103', domainId: 'D3', subDomain: 'D3.5 Auditability, Logging & Continuous Assurance', questionType: 'BEST', position: 3,
    scenarioText: 'A telecom\'s support chatbot gave customers wrong refund information. The team cannot tell which model version or source documents produced the answers.',
    questionText: 'Which record would have BEST supported the investigation?',
    correct: 'Logs linking each response to its model version, prompt and sources',
    wrong: ['A monthly report of average customer satisfaction scores by support team', 'A quarterly accuracy score taken from the vendor\'s own benchmark test', 'The complete set of training documents stored offline in the archive'],
    explanation: 'Investigating a specific bad answer needs a record that ties that answer to the exact model version, input and retrieved sources. Satisfaction reports, vendor benchmarks and stored training documents do not link outputs to causes.',
    why: ['Satisfaction scores are aggregated and cannot trace a specific answer.', 'A vendor benchmark is general and does not show what happened in this case.', 'Stored training documents do not show which version or sources produced a given response.'],
    axes: ['Aggregate sentiment instead of traceability', 'General benchmark instead of case traceability', 'Static artifact instead of runtime traceability'],
    source: 'NIST AI RMF 1.0 MEASURE 2.8 & MANAGE 4.3; ISO/IEC 42001:2023 Annex A.6.2.8 (verify against licensed standard).',
  },
  {
    id: 'aaig-d3s-104', domainId: 'D3', subDomain: 'D3.1 Buy vs. Build & Third-Party Sourcing Decisions', questionType: 'MOST', position: 2,
    scenarioText: 'A small logistics firm is choosing between buying a route-optimization tool and building its own.',
    questionText: 'Which factor is MOST important in the decision?',
    correct: 'Whether it can run and monitor the system after launch',
    wrong: ['Which option has the lowest price during the first year', 'Which supplier is the largest and best known in the market', 'Which option has the longest feature list in its brochure'],
    explanation: 'The sourcing decision is about total lifecycle capability and risk: who will operate, monitor and maintain the system. Year-one price, supplier size and feature count do not show whether the firm can manage the system over time.',
    why: ['First-year price ignores the cost and effort of operating the system later.', 'Supplier size does not show fit with the firm\'s needs or capacity.', 'A long feature list does not show the firm can use or oversee the features.'],
    axes: ['Short-term cost instead of lifecycle capability', 'Market position instead of fit', 'Feature count instead of operability'],
    source: 'NIST AI RMF 1.0 GOVERN 6.1 & MAP 4.1; COBIT 2019 APO10.',
  },
  {
    id: 'aaig-d3s-105', domainId: 'D3', subDomain: 'D3.6 Third-Party & Supply Chain AI Risk Management', questionType: 'FIRST', position: 1,
    scenarioText: 'A hospital group wants to use a third-party AI tool to prioritize patients in its emergency departments.',
    questionText: 'What should the group do FIRST?',
    correct: 'Assess the supplier\'s AI practices, data handling and security',
    wrong: ['Sign a contract with a liability cap and plan checks for after go-live', 'Run a pilot on live patient data to see how the tool performs', 'Ask clinicians whether they would like to use the tool'],
    explanation: 'Due diligence on the supplier comes before commitment. It shows whether the supplier\'s practices are acceptable and shapes the contract terms and pilot conditions. Signing first, piloting on live patient data, and gathering preferences all come after, or do not replace, that assessment.',
    why: ['Signing first commits the group before it knows what risks it is accepting.', 'A pilot on live patient data exposes real patients before due diligence.', 'Clinician preferences matter for adoption but do not assess supplier risk.'],
    axes: ['Commitment before due diligence', 'Live testing before due diligence', 'User preference mistaken for risk assessment'],
    source: 'NIST AI RMF 1.0 GOVERN 6.1; ISO/IEC 42001:2023 Annex A.10 (verify against licensed standard).',
  },
];

export const FUNDAMENTAL_QUESTIONS: Question[] = SPECS.map(build).map(markQuestionUnreviewed);
