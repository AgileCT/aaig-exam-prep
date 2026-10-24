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
  'aaig-pipe-1791941151242-25': [
    { from: 'Mandate the use of automated synthetic data generation', to: 'Create a central data catalogue listing every dataset used for AI, with its source and review date, and share it with model teams under the data policy.', why: 'A catalogue gives visibility, but listing datasets does not set quality thresholds, accountable owners or provenance checks, so the discrepancies would continue.', axis: 'Inventory without enforceable standards' },
    { from: 'Procure and deploy an enterprise data observability', axis: 'Tooling before ownership and quality baselines' },
    { from: 'Task the internal audit department with setting', to: 'Appoint a senior data steward for each business domain to approve third-party datasets before they are ingested.', why: 'Domain stewards help vet new data, but approval by individuals without common quality thresholds and provenance requirements leaves standards inconsistent across domains.', axis: 'Gatekeeping without common standards' },
  ],
  'aaig-pipe-1791941166271-30': [
    { from: 'Mandate that internal engineering teams complete', axis: 'Prototype built before sourcing guidelines exist' },
    { from: 'Prioritize benchmarking technical latency', to: 'Ask the procurement team to run a competitive tender and recommend the option with the best price-to-performance ratio.', why: 'A tender is a sound procurement step, but ranking on price and performance leaves out regulatory exposure, supply chain transparency and risk appetite for a high-impact lending use.', axis: 'Procurement efficiency treated as the governance test' },
    { from: 'Authorize the first-line product management team', to: 'Obtain an independent legal opinion on the licensing terms of the commercial option and decide on that basis.', why: 'Licence terms are one important input, but a legal opinion does not cover strategic fit, lifetime cost or the firm\'s risk appetite for credit decisions.', axis: 'Single expert opinion on a multi-factor decision' },
  ],
  'aaig-pipe-1791941200295-36': [
    { from: 'Deploy an automated model performance monitoring', to: 'Ask each division to submit its AI project plans and rank them by expected financial return for the board to review.', why: 'Collecting plans is useful, but ranking them by return before strategic intent and risk boundaries exist lets financial pull define alignment.', axis: 'Project ranking before strategic intent' },
    { from: 'Conduct comprehensive conformity assessments', axis: 'Operational assessment before strategic intent' },
    { from: 'Authorize business unit leads to independently', to: 'Commission a stakeholder survey on customers\' and employees\' expectations of AI and use the results to draft the bank\'s AI policy.', why: 'Stakeholder input is valuable for shaping values, but drafting policy from a survey before leadership sets strategic intent and accountability leaves the policy without a mandate.', axis: 'Stakeholder input before leadership mandate' },
  ],
  'aaig-pipe-1791941406549-0': [
    { from: 'Delegate final approval of enterprise AI acceptable-use', to: 'Require the chief executive to certify annually that the firm\'s AI use complies with law and with the board\'s risk appetite.', why: 'Executive certification is a useful assurance step, but it does not create the structure, roles and decision rights through which the board directs and oversees AI day to day.', axis: 'Annual certification mistaken for ongoing oversight' },
    { from: 'Deploy an automated model performance monitoring platform', to: 'Add AI as a standing item on the board agenda and ask management to present AI incidents and metrics at every meeting.', why: 'Regular reporting supports oversight, but without a body holding delegated authority and clear accountability the board only receives information and cannot direct the program.', axis: 'Reporting cadence without delegated authority' },
    { from: 'Mandate third-party conformity assessments', axis: 'Third-party assessment before risk appetite and objectives' },
  ],
  'aaig-pipe-1791941406550-1': [
    { from: 'Deploy an enterprise MLOps metadata cataloging', to: 'Ask each business unit to submit its current spreadsheet of AI assets so that the central team can merge them into one register.', why: 'Merging spreadsheets consolidates the inconsistency, because units define and describe AI assets differently, so the combined register cannot be classified or compared.', axis: 'Consolidation before common definitions' },
    { from: 'Mandate that decentralized data science teams immediately', axis: 'Model cards before the taxonomy and templates' },
    { from: 'Direct the Internal Audit function to conduct', to: 'Appoint an AI asset lead in each business unit who will maintain the unit\'s records and answer central queries.', why: 'Local leads give named contacts, but without a shared taxonomy and metadata schema each lead will keep records in a different way.', axis: 'Local roles before shared standards' },
  ],
  'aaig-pipe-1791941424799-5': [
    { from: 'Deploy enterprise-wide automated synthetic data', to: 'Create an approved-sources list of external datasets and require teams to choose only from it, reviewing the list each year.', why: 'A source list helps control ingestion, but without criteria for provenance, consent and bias verification the list has no basis for including or excluding sources.', axis: 'Source list without verification criteria' },
    { from: 'Mandate that decentralized data science teams perform', axis: 'Manual clean-up of data instead of enterprise criteria' },
    { from: 'Empower first-line model developers', to: 'Ask the legal department to review the licence terms of each external dataset before the model teams may use it.', why: 'Licence review addresses intellectual property risk only, and leaves out bias, quality and provenance, which the board\'s low risk appetite also covers.', axis: 'Single-risk review of a multi-risk problem' },
  ],
  'aaig-pipe-1791941421172-6': [
    { from: 'Deploy automated telemetry tooling', to: 'Request a vendor proposal with projected savings and ask the steering committee to approve funding if the projections look attractive.', why: 'Vendor projections are a starting point, but approving funds on them before the firm defines its own outcome metrics and baseline makes later verification impossible.', axis: 'Funding approved on vendor projections' },
    { from: 'Perform a post-implementation benefits audit', axis: 'Post-implementation audit at the planning stage' },
    { from: 'Instruct the engineering leads', to: 'Ask the finance team to set a single payback-period hurdle that all AI initiatives must meet before proceeding.', why: 'A hurdle rate is a legitimate tool, but a single payback test ignores service quality, risk and strategic outcomes, and needs agreed outcome metrics to be applied properly.', axis: 'Single financial test before outcome metrics' },
  ],
  'aaig-pipe-1791941442227-10': [
    { from: 'Execute benchmark performance evaluations', to: 'Run a time-boxed technical proof of concept on both options and use the results to guide the decision taken by the executive team.', why: 'A proof of concept shows technical feasibility, but not vendor transparency, continuing compliance or fit with the firm\'s risk appetite and data sovereignty obligations.', axis: 'Technical feasibility treated as the decision' },
    { from: 'Contract an external auditor', axis: 'Conformity assessment before use cases are defined' },
    { from: 'Authorize the lead application development team', to: 'Ask the chief information security officer to approve whichever option meets the firm\'s security and interoperability requirements.', why: 'Security approval is necessary, but it covers one risk area and does not weigh transparency, regulatory compliance or business fit.', axis: 'Single-function approval of a multi-factor decision' },
  ],
  'aaig-pipe-1791941470950-16': [
    { from: 'Procure an enterprise AI auditing platform', to: 'Commission a review of how peer institutions align AI with strategy and circulate the findings to the executive team.', why: 'Peer practice is helpful input, but a review does not give the firm a mandate, an accountable owner or strategic objectives to align against.', axis: 'Benchmarking before a mandate' },
    { from: 'Perform detailed algorithmic impact assessments', axis: 'Impact assessments before strategic direction' },
    { from: 'Authorize business unit heads to prioritize and fund', to: 'Ask the chief financial officer to set an annual AI investment budget and allocate it across business units by headcount.', why: 'A budget funds activity, but allocating it by headcount ties investment to size rather than strategy, and no objectives or limits exist yet to govern its use.', axis: 'Funding allocated before strategic objectives' },
  ],
  'aaig-pipe-1791941501443-20': [
    { from: 'Instruct individual business units to perform independent', axis: 'Local assessments before an enterprise framework' },
    { from: 'Mandate the implementation of enterprise-wide technical validation', to: 'Request a gap assessment of current AI practices against the NIST AI RMF from an external adviser and present it to the board.', why: 'A gap assessment gives useful insight, but it describes current weaknesses without creating the committee, decision rights and risk limits that fix the fragmentation.', axis: 'Diagnosis without a decision-making structure' },
    { from: 'Assign direct responsibility for AI risk acceptance', to: 'Ask the chief risk officer to approve all AI deployments and to report exceptions to the board each quarter.', why: 'Central approval by one officer addresses fragmentation, but concentrates decisions in one function, with no cross-functional input and no board-defined risk limits.', axis: 'Single approver instead of cross-functional oversight' },
  ],
  'aaig-pipe-1791941501551-21': [
    { from: 'Deploy an automated continuous discovery', to: 'Run a one-time workshop with business unit leaders to agree what should be listed as an AI asset in the inventory.', why: 'A workshop can build shared understanding, but it produces no approved taxonomy, classification criteria or mandatory fields, so the register will drift again.', axis: 'Consensus-building without binding standards' },
    { from: 'Mandate that all business units immediately publish', axis: 'Publishing model cards before standards are set' },
    { from: 'Direct internal audit to conduct an enterprise-wide discovery', to: 'Ask the data protection officer to identify AI systems that process personal data and add them to the inventory first.', why: 'Prioritizing personal-data systems is sensible later, but a partial inventory built without common definitions and classification leaves the other systems unmanaged.', axis: 'Partial inventory before common definitions' },
  ],
  'aaig-pipe-1791942376652-6': [
    { from: 'Procure and deploy an enterprise performance dashboard', to: 'Ask the lending business to forecast the productivity gains it expects, and have finance record those forecasts in the business case.', why: 'Sponsor forecasts are normal inputs, but without an agreed measurement basis and common value criteria they cannot later be checked against actual results.', axis: 'Forecasts without an agreed measurement basis' },
    { from: 'Conduct a small-scale pilot deployment', axis: 'Pilot before baseline and value criteria' },
    { from: 'Mandate the third-line internal audit team', to: 'Ask the steering committee to approve a ceiling on total spend for the initiative and review progress against it quarterly.', why: 'A spending ceiling controls cost, but value realization needs outcome metrics and a baseline, which a spend limit alone does not provide.', axis: 'Cost control mistaken for value governance' },
  ],
  'aaig-pipe-1791943579681-115-bbbve': [
    { from: 'Direct the data engineering team to implement continuous adversarial', to: 'Prepare a technical file for the ranking system and file it with the national authority before deployment in each member state.', why: 'Documentation and notification are part of compliance, but filing alone does not establish continuing risk management, quality management and post-market monitoring.', axis: 'One-off filing mistaken for continuing compliance' },
    { from: 'Contract an accredited third-party notified body', axis: 'Conformity audit before the enterprise risk policy' },
    { from: 'Authorize individual business unit product managers', to: 'Appoint an EU representative and a data protection officer for the subsidiaries and make them responsible for AI compliance.', why: 'These roles are useful, but assigning compliance to two individuals does not create the risk management and quality management processes the Act requires for high-risk systems.', axis: 'Roles named without supporting processes' },
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
  'aaig-pipe-1791941151242-25': 'Set enterprise rules for data origin, quality limits and who is responsible for each domain\'s data, tied to the firm\'s risk limits.',
  'aaig-pipe-1791941166271-30': 'Compare the options on strategic fit, lifetime cost, risk limits and supplier transparency against agreed criteria.',
  'aaig-pipe-1791941200295-36': 'Set out a board-approved statement of strategic intent, accountability and the limits of acceptable AI risk.',
  'aaig-pipe-1791941406549-0': 'Establish a cross-functional AI committee mandated by the board to define accountability, policy and the limits of acceptable risk.',
  'aaig-pipe-1791941406550-1': 'Agree the AI asset taxonomy, risk tiers and mandatory metadata fields with the committee, and publish them to all business units.',
  'aaig-pipe-1791941424799-5': 'Set an enterprise standard on data provenance, consent and bias checks, with thresholds linked to the board\'s risk limits.',
  'aaig-pipe-1791941421172-6': 'Define measurable business outcomes and starting-point performance figures linked to enterprise strategy.',
  'aaig-pipe-1791941442227-10': 'Set up a cross-functional sourcing process that weighs vendor transparency, continuing compliance and the firm\'s risk limits.',
  'aaig-pipe-1791941470950-16': 'Form an executive AI committee to set the firm\'s AI mandate, strategic objectives and the way AI use will be overseen.',
  'aaig-pipe-1791941501443-20': 'Set up a cross-functional AI committee, mandated by the board, to set risk limits, enterprise rules and decision authority.',
  'aaig-pipe-1791941501551-21': 'Set the enterprise taxonomy, classification criteria and rules that define AI assets and mandatory model card fields.',
  'aaig-pipe-1791942376652-6': 'Set baseline operational figures and define target value criteria aligned with enterprise strategy.',
  'aaig-pipe-1791943579681-115-bbbve': 'Build an AI risk management system within quality management procedures, with conformity assessment and post-market monitoring.',
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
