import { markQuestionUnreviewed } from '../services/questionOrder';
import { build, Spec } from './fundamentalQuestions';

// Replacements for a cluster of near-duplicate AIMS scoping questions.
// These broaden the standards topic into distinct implementation decisions.
// Citations and content are drafts pending source and practitioner review.
const D17 = 'D1.7 Standards Implementation (ISO/IEC 42001 AIMS, ISO 23894)';

const SPECS: Spec[] = [
  {
    id: 'aaig-d1s-401', domainId: 'D1', subDomain: D17, questionType: 'BEST', position: 1,
    scenarioText: 'A company has defined the scope of its AI management system. Its business units now rate similar AI risks differently, making the results hard to compare.',
    questionText: 'What should the company establish before the next risk assessment so that teams apply the same decision rules?',
    correct: 'Document consistent risk criteria, including how to assess and accept risk',
    wrong: ['Select a different risk framework for each product team', 'Set risk ratings after each team has completed its assessment', 'Replace risk assessment with a single annual model accuracy score'],
    explanation: 'Teams need shared criteria before assessing risks so that likelihood, impact and risk acceptability are judged consistently. A single model performance score or team-specific framework would not make risk decisions comparable.',
    why: ['Using different frameworks makes the results less comparable.', 'Setting criteria after assessments allows inconsistent judgments to shape the standard.', 'Accuracy is only one aspect of AI risk and cannot replace a risk assessment process.'],
    axes: ['Fragmented criteria', 'Criteria set after assessment', 'Performance metric mistaken for risk criteria'],
    source: 'ISO/IEC 42001:2023 Cl. 6.1.2 (citation and applicability pending verification).', difficulty: 'Intermediate',
  },
  {
    id: 'aaig-d1s-402', domainId: 'D1', subDomain: D17, questionType: 'FIRST', position: 2,
    scenarioText: 'An AI management system risk assessment identifies a high risk in a customer-facing model. The organization has agreed to treat the risk and needs to choose controls.',
    questionText: 'Which record should explain the selected controls, their applicability, and any exclusions?',
    correct: 'A risk treatment plan linked to the Statement of Applicability',
    wrong: ['A marketing release plan listing the model features', 'A model card containing only intended use and performance metrics', 'An internal audit report written before management selects controls'],
    explanation: 'Risk treatment decisions should be traceable to the risks and selected controls. The Statement of Applicability records which controls apply and explains exclusions, while the treatment plan records how selected actions will be carried out.',
    why: ['A release plan describes product delivery, not risk treatment decisions.', 'A model card is useful system documentation but does not replace control applicability and treatment records.', 'Internal audit provides independent assurance; management owns treatment decisions.'],
    axes: ['Release planning mistaken for risk treatment', 'System description mistaken for control selection', 'Assurance role mistaken for management ownership'],
    source: 'ISO/IEC 42001:2023 Cl. 6.1.3 (citation and applicability pending verification).', difficulty: 'Intermediate',
  },
  {
    id: 'aaig-d1s-403', domainId: 'D1', subDomain: D17, questionType: 'PRIMARY', position: 0,
    scenarioText: 'An enterprise has an AI policy but no measurable objectives for putting it into practice. Business units cannot tell who owns the work or when progress is due.',
    questionText: 'Which plan would best turn the policy into an AI management system objective?',
    correct: 'Assign an owner, resources, a deadline, and a way to measure progress',
    wrong: ['Publish a broad promise to use AI responsibly without an owner or measure', 'Let each engineering team choose its own performance benchmark', 'Set a certification target without assigning implementation work'],
    explanation: 'An objective needs a way to measure progress and a plan that assigns responsibility, resources, timing and evaluation. A general aspiration or certification target alone does not specify how the organization will achieve its intended result.',
    why: ['A general aspiration gives no way to assess progress or accountability.', 'Technical benchmarks alone do not establish enterprise management system objectives.', 'A certification goal does not allocate the work needed to achieve it.'],
    axes: ['Aspiration without measurement', 'Technical metric without management objective', 'Outcome target without an implementation plan'],
    source: 'ISO/IEC 42001:2023 Cl. 6.2 (citation and applicability pending verification).', difficulty: 'Fundamental',
  },
  {
    id: 'aaig-d1s-404', domainId: 'D1', subDomain: D17, questionType: 'BEST', position: 3,
    scenarioText: 'A regulated lender assigns staff to review AI management system controls. Several reviewers have never worked with AI risk documentation, and the organization has no record of their preparation.',
    questionText: 'What is the best way to address the competence gap and show that the support process works?',
    correct: 'Define required competence, provide training or other support, and retain evidence of competence',
    wrong: ['Allow reviewers to learn only by observing model outcomes in production', 'Replace competence requirements with a vendor statement that its system is compliant', 'Ask internal audit to perform the reviews so management need not train staff'],
    explanation: 'The organization should determine the competence needed for assigned work, take appropriate steps to build or obtain it, evaluate whether those steps worked, and retain appropriate evidence.',
    why: ['Production observation alone does not establish that reviewers can perform their assigned work.', 'A vendor statement does not demonstrate the competence of the organization’s own reviewers.', 'Internal audit cannot replace management’s responsibility to resource and support its process.'],
    axes: ['Unstructured exposure mistaken for competence', 'Supplier assurance mistaken for internal capability', 'Assurance function mistaken for management support'],
    source: 'ISO/IEC 42001:2023 Cl. 7.2 (citation and applicability pending verification).', difficulty: 'Intermediate',
  },
  {
    id: 'aaig-d1s-405', domainId: 'D1', subDomain: D17, questionType: 'FIRST', position: 0,
    scenarioText: 'A third-party model provider changes a model version used in a high-impact workflow. The contract allows updates, but the organization has not evaluated how the change affects its approved controls.',
    questionText: 'What should the organization do before relying on the updated model in that workflow?',
    correct: 'Use change control to assess effects on operational controls and risk decisions',
    wrong: ['Accept every provider update because the vendor manages the model', 'Wait for the next annual audit before checking the changed version', 'Repeat the original AIMS scoping exercise without reviewing the model change'],
    explanation: 'Changes that can affect managed AI activities should be handled through the organization’s operational planning and control process. A supplier update does not remove the deployer’s need to assess effects on its own controls and decisions.',
    why: ['Supplier operation does not transfer the organization’s accountability for its use of the model.', 'An annual audit may occur too late to manage a material change before deployment.', 'Repeating AIMS scoping does not evaluate the specific operational effect of this version change.'],
    axes: ['Supplier control mistaken for deployer oversight', 'Periodic assurance mistaken for change control', 'System scope mistaken for operational change assessment'],
    source: 'ISO/IEC 42001:2023 Cl. 8.1 (citation and applicability pending verification).', difficulty: 'Intermediate',
  },
  {
    id: 'aaig-d1s-406', domainId: 'D1', subDomain: D17, questionType: 'MOST', position: 1,
    scenarioText: 'Senior management receives AI incident counts but cannot tell whether controls are meeting their objectives or whether risk levels are changing.',
    questionText: 'Which measurement approach would most improve performance evaluation of the management system?',
    correct: 'Plan what to measure, the method and timing, and how to evaluate results',
    wrong: ['Track only the number of models in production', 'Collect metrics without assigning anyone to analyze the results', 'Use the model provider’s service availability report as the sole performance measure'],
    explanation: 'Performance evaluation needs planned monitoring and measurement, including what is measured, the methods and timing, and how results are analyzed and evaluated. A single volume or availability metric cannot show whether the management system is effective.',
    why: ['Model count does not indicate whether controls or objectives are effective.', 'Unanalyzed data cannot inform management decisions.', 'Provider availability is only one operational measure and does not evaluate the organization’s management system.'],
    axes: ['Activity count mistaken for effectiveness', 'Data collection without evaluation', 'Supplier metric mistaken for system performance'],
    source: 'ISO/IEC 42001:2023 Cl. 9.1 (citation and applicability pending verification).', difficulty: 'Intermediate',
  },
  {
    id: 'aaig-d1s-407', domainId: 'D1', subDomain: D17, questionType: 'BEST', position: 2,
    scenarioText: 'Monitoring finds that an AI system repeatedly exceeds an approved risk threshold. The team corrects each incident, but the same failure returns after later releases.',
    questionText: 'Which response best addresses the repeated nonconformity?',
    correct: 'Investigate the cause, take corrective action, and evaluate whether the action prevents recurrence',
    wrong: ['Close each incident once the threshold returns to range', 'Increase the threshold so future incidents no longer trigger alerts', 'Ask internal audit to modify the production model and own the corrective action'],
    explanation: 'A recurring problem requires the organization to address its cause, take corrective action, and evaluate whether the action is effective. Merely closing incidents or changing the threshold can hide the problem without preventing recurrence.',
    why: ['Returning to range does not explain or prevent the repeated failure.', 'Changing the threshold to suppress alerts does not address the underlying cause.', 'Internal audit must preserve independence and should not own operational corrective actions.'],
    axes: ['Symptom correction mistaken for cause removal', 'Metric manipulation mistaken for correction', 'Independent assurance mistaken for operational ownership'],
    source: 'ISO/IEC 42001:2023 Cl. 10.2 (citation and applicability pending verification).', difficulty: 'Intermediate',
  },
];

export const QUESTION_REPLACEMENTS = SPECS.map(build).map(markQuestionUnreviewed);
