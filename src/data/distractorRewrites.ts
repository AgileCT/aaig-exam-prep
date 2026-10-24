import type { Question } from '../types';

/**
 * 2026-10-24 pilot: replaces the most formulaic distractors (a technical tool,
 * or work handed to the wrong line) with legitimate governance actions that
 * fail on scope or sequence. Each entry lists the question's three wrong options
 * in any order; `from` is a unique prefix of the current option text. Where
 * `to` is omitted the option and its explanation are kept and only the error
 * axis is added. Rewritten text is unreviewed and replaces content that the
 * 2026-10-14 review had revised, so it needs human re-review.
 */
export interface DistractorEdit { from: string; to?: string; why?: string; axis: string }

export const DISTRACTOR_REWRITES: Readonly<Record<string, readonly DistractorEdit[]>> = {
  'aaig-pipe-1791941016903-0': [
    { from: 'Direct business units to conduct conformity', axis: 'Operational assessment before the governing mandate' },
    { from: 'Mandate the deployment of automated algorithmic monitoring', to: 'Commission an external review of the firm\'s AI regulatory obligations and report the findings to the board before choosing a governance structure.', why: 'Understanding obligations is useful input, but board oversight needs a structure with decision rights. The review can be a task of that structure rather than a precondition for it.', axis: 'Sound preparatory analysis that postpones the structural decision' },
    { from: 'Delegate the design, approval, and operational enforcement', to: 'Approve an AI ethics policy and publish it to customers and employees as the main governance instrument of board oversight.', why: 'A statement sets intent, but without decision rights, accountability and risk thresholds it gives the board nothing to oversee against.', axis: 'Statement of intent mistaken for an oversight mechanism' },
  ],
  'aaig-pipe-1791941523762-25': [
    { from: 'Implement automated synthetic data augmentation', to: 'Require each business unit to document training data sources and known quality issues in a shared governance register that is reviewed annually.', why: 'Documentation improves visibility, but without common quality thresholds, owners and lineage checks the register records the inconsistency rather than governing it.', axis: 'Documentation without enforceable standards' },
    { from: 'Deploy continuous data drift monitoring agents', axis: 'Runtime monitoring before data standards exist' },
    { from: 'Direct the internal audit team to independently define', to: 'Appoint a data quality owner in each business unit to agree local acceptance criteria for the datasets that its own models use.', why: 'Local criteria reproduce the inconsistency across units. Enterprise thresholds tied to risk appetite are needed before units adapt them.', axis: 'Local standards in place of enterprise standards' },
  ],
  'aaig-pipe-1791943112438-10-qh1bn': [
    { from: 'Prioritize comprehensive technical benchmarking', to: 'Run a structured pilot of the commercial model on non-sensitive data and let the pilot results decide between licensing and building under the sourcing policy.', why: 'A pilot yields useful evidence, but only on performance and fit. It does not weigh total cost, risk appetite or supply chain transparency, which the decision also depends on.', axis: 'Evidence from one dimension treated as the whole decision' },
    { from: 'Finalize binding third-party service level agreements', axis: 'Contract commitments before requirements and classification' },
    { from: 'Delegate the definitive sourcing decision', to: 'Ask the legal department to choose the option with the strongest contractual indemnities and report its choice to the governance committee.', why: 'Indemnities matter, but legal protection is one factor. Strategic fit, total cost and risk appetite must also be weighed by the committee.', axis: 'Single-function decision on a multi-factor question' },
  ],
  'aaig-pipe-1791943341335-60-xaq5w': [
    { from: 'Direct operational teams to complete comprehensive conformity', axis: 'Operational assessment before the policy framework' },
    { from: 'Mandate the immediate procurement of enterprise-grade', to: 'Appoint an AI risk officer in each division to report incidents and policy breaches to the board every quarter.', why: 'Divisional reporting adds visibility but cannot resolve fragmented decision rights and thresholds. It reports problems without a body able to set enterprise direction.', axis: 'Reporting line added without decision authority' },
    { from: 'Empower business-unit development leads', to: 'Publish enterprise AI principles and a governance framework, and require each business unit to certify that it follows them.', why: 'Principles and certification state expectations, but without a body holding decision rights and risk appetite no one can resolve conflicts or accept exceptions.', axis: 'Self-certification against principles without a deciding body' },
  ],
  'aaig-pipe-1791943535745-105-0p7tf': [
    { from: 'Deploy automated algorithmic bias detection', to: 'Commission an external benchmark of how peer institutions structure AI governance and present the findings to the board for discussion.', why: 'Benchmarking informs design, but it does not create the charter, decision rights or accountability that establish oversight.', axis: 'Benchmarking instead of establishing structure' },
    { from: 'Conduct comprehensive third-party model stress testing', axis: 'Operational testing before enterprise principles' },
    { from: 'Delegate the determination of acceptable risk thresholds', to: 'Adopt a board resolution requiring each business line to attest annually that its AI use complies with applicable law and policy.', why: 'Attestation is a useful assurance input, but it does not establish who decides risk thresholds or how accountability is shared across functions.', axis: 'Attestation mistaken for governance structure' },
  ],
  'aaig-pipe-1791943718126-145-870vw': [
    { from: 'Deploy automated model telemetry', to: 'Require executive management to give the board\'s risk committee a quarterly governance report on all AI use cases and incidents.', why: 'Reporting supports oversight but presumes a defined structure, risk appetite and decision rights that the board has not yet established.', axis: 'Reporting before structure' },
    { from: 'Conduct mandatory conformity assessments', axis: 'Assessments before the risk taxonomy and objectives' },
    { from: 'Authorize individual business unit leaders', to: 'Ask the chief information officer to own AI policy and enforcement, with the board receiving an annual summary.', why: 'Placing ownership with one executive and giving the board only an annual summary lacks cross-functional input and gives the board little real oversight.', axis: 'Concentrating ownership in one executive' },
  ],
  'aaig-pipe-1791941015830-1': [
    { from: 'Procure and integrate an automated AI discovery', to: 'Run an amnesty period in which business units can register shadow AI systems under the governance policy, using their own descriptions.', why: 'Voluntary registration surfaces systems, but without agreed definitions and classification criteria the entries are inconsistent and cannot be tiered.', axis: 'Collection before common definitions' },
    { from: 'Mandate that first-line product teams complete', axis: 'Documentation before taxonomy and templates' },
    { from: 'Direct Internal Audit to independently catalogue', to: 'Ask each subsidiary to nominate an AI owner who will report new systems to the central team as they are introduced.', why: 'Contacts help capture systems going forward, but they do not define what counts as an AI system or how to classify the existing ones.', axis: 'Process for new systems without common definitions' },
  ],
  'aaig-pipe-1791941520433-26': [
    { from: 'Deploy automated drift monitoring and financial tracking', to: 'Commission an external market study of comparable assistant deployments and use it as the baseline for expected savings.', why: 'Market evidence can inform expectations, but without the firm\'s own baseline and success criteria the savings cannot later be verified.', axis: 'External benchmark instead of an internal baseline' },
    { from: 'Authorize first-line customer support unit managers', to: 'Agree the funding envelope and delivery timeline with an accountable sponsor so that the business case can be tabled at the next board meeting.', why: 'Funding and timing belong in a business case, but fixing them before success criteria exist commits money to undefined outcomes.', axis: 'Commitment of funds before success criteria' },
    { from: 'Mandate an independent third-line post-implementation audit', axis: 'Post-implementation assurance at the planning stage' },
  ],
  'aaig-pipe-1791943105271-11-qkes3': [
    { from: 'Procure automated ModelOps monitoring tooling', to: 'Ask finance to model three-year cost scenarios for the platform against the current baseline and present the lowest-cost scenario to the board.', why: 'Cost modelling is part of the case, but without agreed value metrics and risk-adjusted thresholds the scenarios compare costs against undefined benefits.', axis: 'Cost analysis without an agreed value definition' },
    { from: 'Empower first-line business unit managers', to: 'Ask business unit sponsors to submit benefit forecasts, which finance reviews for arithmetic accuracy before approval under the investment policy.', why: 'Forecasts reviewed only for arithmetic accept each sponsor\'s own definition of value, so they cannot be compared or tied to risk appetite.', axis: 'Sponsor-defined value accepted unchallenged' },
    { from: 'Commission an independent external audit', axis: 'External conformity audit before the business case' },
  ],
  'aaig-pipe-1791943347849-61-aq1v4': [
    { from: 'Deploy an enterprise-wide model monitoring', to: 'Survey each business unit\'s current and planned AI projects and rank them in a governance portfolio by expected revenue contribution.', why: 'A portfolio view is useful input, but ranking by revenue before objectives and risk appetite are defined lets commercial pull decide strategic alignment.', axis: 'Portfolio ranking before strategic criteria' },
    { from: 'Direct the internal audit activity to perform', to: 'Ask the chief risk officer to draft an AI risk policy and circulate it to business units for comment.', why: 'A risk policy is an expected output, but drafting it before the charter and decision rights are settled leaves it without authority or an approver.', axis: 'Policy drafting before the mandate' },
    { from: 'Conduct comprehensive algorithmic impact assessments', axis: 'Operational assessment before the governance mandate' },
  ],
  'aaig-pipe-1791943556341-111-w9yo1': [
    { from: 'Procure an enterprise AI observability platform', to: 'Commission a pilot of the dynamic pricing system in one business unit to gather early evidence of its revenue effects and set a baseline.', why: 'A pilot yields usable evidence only if success measures and baselines were agreed beforehand. Otherwise the results cannot be judged.', axis: 'Pilot before success measures' },
    { from: 'Direct the internal audit activity to formulate', axis: 'Independent assurance function assigned a management decision' },
    { from: 'Mandate that operational data science teams', to: 'Ask each business unit to propose its own return targets and consolidate them into a single enterprise business case under the investment policy.', why: 'Units setting their own targets produce inconsistent, non-comparable definitions of value and leave out the enterprise risk view.', axis: 'Unit-defined targets instead of standard metrics' },
  ],
  'aaig-pipe-1791943864279-171-tsv4n': [
    { from: 'Mandate that technical delivery teams baseline', axis: 'Technical baselines before value criteria' },
    { from: 'Deploy continuous post-implementation benefit tracking', to: 'Prepare a three-year benefits forecast for each initiative using the sponsors\' assumptions and present it to the governance committee.', why: 'Forecasts built on sponsors\' assumptions rest on untested and inconsistent definitions of value, so the committee has nothing common to compare.', axis: 'Forecasts built on undefined value criteria' },
    { from: 'Direct the internal audit department to execute', to: 'Appoint a benefits owner for every initiative and require quarterly benefit reports to the steering committee.', why: 'Benefit owners and reporting are essential, but they need agreed value criteria and thresholds to report against, which must be defined first.', axis: 'Accountability roles before value criteria' },
  ],
};

/**
 * Second pass: the correct options of these items were dense with governance
 * keywords (charter, risk appetite, decision rights), so the right answer could
 * be picked by vocabulary alone. The plainer wording keeps the same meaning.
 */
export const CORRECT_REWRITES: Readonly<Record<string, string>> = {
  'aaig-pipe-1791941016903-0': 'Set up a board-approved AI committee with named executive responsibility, authority to decide, and agreed risk limits.',
  'aaig-pipe-1791941523762-25': 'Set enterprise-wide data governance rules for origin, quality limits and lineage checks, tied to the firm\'s risk limits.',
  'aaig-pipe-1791943112438-10-qh1bn': 'Weigh strategic fit, lifetime cost, risk appetite and tolerance, and supply chain transparency in one structured evaluation.',
  'aaig-pipe-1791943341335-60-xaq5w': 'Create a cross-functional AI committee with a mandate to set enterprise AI rules, risk limits and who decides what.',
  'aaig-pipe-1791943535745-105-0p7tf': 'Form a board-approved AI committee that defines the organization\'s risk tolerance, who decides, and shared responsibility across functions.',
  'aaig-pipe-1791943718126-145-870vw': 'Create a cross-functional AI committee, mandated by the board, to set risk appetite, approve rules and assign who decides.',
  'aaig-pipe-1791941015830-1': 'Agree one enterprise definition of an AI system and formal classification criteria linked to the organization\'s risk limits.',
  'aaig-pipe-1791941520433-26': 'Agree measurable baseline metrics and success criteria that link directly to the organization\'s strategic objectives.',
  'aaig-pipe-1791943105271-11-qkes3': 'Define value metrics, business objectives and risk-adjusted return thresholds, approved by the executive team within risk appetite.',
  'aaig-pipe-1791943347849-61-aq1v4': 'Set up a board-backed mandate and committee to define strategic AI objectives, risk appetite and who decides.',
  'aaig-pipe-1791943556341-111-w9yo1': 'Define standard business value metrics and a risk-adjusted baseline linked to the strategic objectives of the enterprise.',
  'aaig-pipe-1791943864279-171-tsv4n': 'Define enterprise value criteria, strategic alignment objectives and investment gating thresholds in an approved mandate.',
};

/** Applies a pilot rewrite, keeping the correct option, its index and the main explanation unchanged. */
export function applyDistractorRewrite(question: Question): Question {
  const edits = DISTRACTOR_REWRITES[question.id];
  if (!edits) return question;
  const wrong = question.options.map((_, i) => i).filter(i => i !== question.correctIndex);
  const edited = wrong.map(index => {
    const matches = edits.filter(edit => question.options[index].startsWith(edit.from));
    if (matches.length !== 1) throw new Error(`Distractor rewrite for ${question.id} must match each wrong option exactly once`);
    return { index, edit: matches[0] };
  });
  if (new Set(edited.map(entry => entry.edit)).size !== wrong.length) throw new Error(`Distractor rewrite for ${question.id} reuses an edit`);
  const options = [...question.options];
  edited.forEach(({ index, edit }) => { if (edit.to) options[index] = edit.to; });
  if (CORRECT_REWRITES[question.id]) options[question.correctIndex] = CORRECT_REWRITES[question.id];
  return {
    ...question,
    options,
    distractorExplanations: edited.map(({ index, edit }, i) =>
      edit.why ? `${'ABCD'[index]}: ${edit.why}` : question.distractorExplanations![i]),
    distractorAxes: edited.map(({ edit }) => edit.axis),
  };
}
