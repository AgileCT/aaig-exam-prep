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
  'aaig-pipe-1791942377513-8': [
    { from: 'Deploy real-time monitoring pipelines', to: 'Own the day-to-day operation of the underwriting platform and fix model errors as they occur.', why: 'Day-to-day operation and error correction belong to the management that owns the process, the first line, not to the second line that oversees it.', axis: 'First-line duty assigned to the second line' },
    { from: 'Execute automated post-incident remediation', to: 'Approve each model for release and sign off residual risk on behalf of the business.', why: 'Approving releases and accepting residual risk are management decisions. The second line advises and challenges but does not take them over.', axis: 'Management decision assigned to the second line' },
    { from: 'Provide independent and objective assurance', axis: 'Third-line assurance duty assigned to the second line' },
  ],
  'aaig-pipe-1791943073272-4-jq50e': [
    { from: 'Authorizing the second-line risk management function', axis: 'Sound practice: second-line challenge of fairness criteria' },
    { from: 'Mandating that organizational ethical values', axis: 'Sound practice: values translated into verifiable metrics' },
    { from: 'Requiring an ethical impact assessment', axis: 'Sound practice: impact assessment before release' },
  ],
  'aaig-pipe-1791941483700-19': [
    { from: 'Suspending automated approvals', axis: 'Sound practice: suspension and formal re-authorization' },
    { from: 'Requiring the first-line operations team to log', axis: 'Sound practice: logging the breach with independent verification' },
    { from: 'Mandating an immediate fail-safe fallback', axis: 'Sound practice: fallback with independent bias audit' },
  ],
  'aaig-pipe-1791942430355-17': [
    { from: 'Deploying post-hoc generative adversarial anonymization', to: 'Require a privacy review of every new feature request by the data protection office before it is added to the store.', why: 'A review of each request is a useful check, but it relies on case-by-case approval and does not build minimization into how data enters and persists in the store.', axis: 'Case-by-case approval instead of a structural control' },
    { from: 'Executing comprehensive algorithmic privacy impact assessments', axis: 'Assessment late in the lifecycle instead of at design' },
    { from: 'Authorizing the 1st-line data engineering squads', to: 'Publish a data retention schedule for the feature store and ask teams to delete data when the schedule says so.', why: 'A schedule sets expectations, but without enforcement at ingestion it depends on teams remembering to delete, and over-collection still happens first.', axis: 'Schedule without technical enforcement' },
  ],
  'aaig-pipe-1791941106674-13': [
    { from: 'Direct the data science team to apply synthetic data', to: 'Commission an independent fairness audit of the production model and publish the results to regulators.', why: 'An audit gives evidence, but the director\'s primary duty is to set the limits and decision path that govern the response, not only to document the problem.', axis: 'Evidence gathering mistaken for the governance duty' },
    { from: 'Authorize immediate deployment of an emergency retraining', axis: 'Emergency retraining before limits and review exist' },
    { from: 'Delegate the determination of permissible bias variance', to: 'Ask the chief risk officer to approve every retraining run individually for the next twelve months.', why: 'Approving each run centralizes control, but without defined limits and review criteria the approver has no standard to apply.', axis: 'Case-by-case approval without standards' },
  ],
  'aaig-pipe-1791941502874-22': [
    { from: 'Deploy advanced hyperparameter optimization', to: 'Increase scheduled model validation from quarterly to monthly and report the results to the model risk committee.', why: 'More frequent validation helps, but a fixed calendar still lets degradation run between reviews and ties no response to how bad the drift is.', axis: 'Fixed cadence instead of a threshold-triggered response' },
    { from: 'Retrain and hot-swap the degraded production model', axis: 'Fix applied before root cause analysis' },
    { from: 'Authorize frontline operational staff', to: 'Add the model to the watch list of the model risk team, which will review its performance when the quarterly report is produced.', why: 'A watch list adds attention but not a trigger. The review still waits for the next quarterly cycle however quickly the model degrades.', axis: 'Attention without a trigger' },
  ],
  'aaig-pipe-1791941470913-18': [
    { from: 'Standardizing exclusively on post-hoc local attribution', axis: 'One technique mandated for every system' },
    { from: 'Deploying consumer-facing explanation portals', to: 'Commission a customer research study on how applicants want adverse-action reasons to be worded.', why: 'Understanding customers is useful input, but the committee\'s primary objective is to set requirements that cover all stakeholders and regulatory duties, not to optimize wording for one group.', axis: 'Single stakeholder input mistaken for the objective' },
    { from: 'Requiring independent internal audit teams', to: 'Require every model to be inherently interpretable so that no explanation tool is needed.', why: 'Interpretable models suit some uses, but requiring them everywhere ignores context and decision impact and may sacrifice needed performance.', axis: 'Uniform technical mandate regardless of context' },
  ],
  'aaig-pipe-1791941453475-14': [
    { from: 'Prioritizing the capture of model version lineage', axis: 'Sound practice: lineage and confidence capture for explainability' },
    { from: 'Standardizing log schema retention schedules', axis: 'Sound practice: standardized retention and encryption' },
    { from: 'Granting independent internal audit teams direct', axis: 'Sound practice: independent read-only access for audit' },
  ],
  'aaig-pipe-1791941407823-3': [
    { from: 'Implement automated continuous testing pipelines', to: 'Choose the supplier with the most recognized security certifications and rely on them for assurance.', why: 'Certifications are useful signals, but they describe the supplier\'s own controls, not how accountability, audit rights and risk are shared with the enterprise.', axis: 'Supplier certification mistaken for allocated accountability' },
    { from: 'Execute post-deployment model performance monitoring', axis: 'Monitoring before contractual audit rights exist' },
    { from: 'Authorize the first-line development team', to: 'Keep a second foundation model as a standby so the service can switch suppliers quickly if needed.', why: 'A standby supplier supports resilience, but the committee\'s primary objective is to set the criteria and terms that apply to whichever supplier is used.', axis: 'Resilience measure mistaken for governing criteria' },
  ],
  'aaig-pipe-1791941527214-27': [
    { from: 'Deploy automated model telemetry pipelines', to: 'Hold a lessons-learned workshop after each MEASURE cycle and circulate the findings to all model owners.', why: 'A workshop shares learning, but it does not turn measurement results into decisions, owners and actions, which is what the MANAGE function requires.', axis: 'Learning activity mistaken for risk response' },
    { from: 'Execute automated decommission protocols', axis: 'Decommissioning before the inventory classification is updated' },
    { from: 'Authorize first-line model development teams', to: 'Rank all risks found in MEASURE by severity and publish the ranking in the central inventory.', why: 'Ranking is useful prioritization, but without treatment plans, owners and sign-off nothing is done about the ranked risks.', axis: 'Prioritization without treatment' },
  ],
  'aaig-pipe-1791943131382-17-7wx7z': [
    { from: 'Mandate automated continuous monitoring platforms', to: 'Ask each product team to map its own AI risks to the enterprise risk register and submit the mapping once a year.', why: 'Self-mapping by each team gives coverage, but it produces inconsistent categories and relies on each team\'s own judgement, so the fragmentation the CRO sees would continue.', axis: 'Decentralized mapping without a common structure' },
    { from: 'Direct development squads to execute risk response', axis: 'Risk response before the risk taxonomy exists' },
    { from: 'Authorize the internal audit department to formulate', to: 'Commission an external review of how peer firms align AI risk management with the NIST AI RMF and share the findings.', why: 'A peer review informs the design but does not itself put a governance structure, limits or a risk taxonomy mapping in place.', axis: 'Benchmarking mistaken for implementation' },
  ],
  'aaig-pipe-1791943089288-7-qyc29': [
    { from: 'Deploying automated data retention and purge scripts', axis: 'Deletion after deployment instead of control at ingestion' },
    { from: 'Empowering first-line data science leads', to: 'Train the data science teams on privacy principles and require them to certify once a year that they follow them.', why: 'Training and certification build awareness, but they do not stop unnecessary data entering the pipeline, because no control checks each use.', axis: 'Awareness and attestation instead of a control point' },
    { from: 'Mandating post-hoc model explainability techniques', to: 'Keep a catalogue of privacy-enhancing techniques and recommend them to teams when they design new features.', why: 'Recommendations support good practice, but without a mandatory check at ingestion teams can still collect and keep data they do not need.', axis: 'Optional guidance instead of a mandatory check' },
  ],
  'aaig-pipe-1791942405270-13': [
    { from: 'Mandate that model engineering teams immediately implement', to: 'Commission a fairness audit of the model by an independent team and send the report to the regulators.', why: 'An audit documents the problem, but the committee\'s primary objective is to set the limits and monitoring that govern the response over time.', axis: 'Evidence gathering mistaken for the governance objective' },
    { from: 'Deploy automated feature-reweighting tools', axis: 'Technical fix before data collection policies are reviewed' },
    { from: 'Authorize the first-line model development leads', to: 'Ask the model owner to retrain the model every quarter on the latest applicant data.', why: 'Regular retraining may help, but without agreed limits and monitoring nobody can tell whether the drift or the bias has actually been addressed.', axis: 'Routine maintenance mistaken for governance' },
  ],
  'aaig-pipe-1791942450897-22': [
    { from: 'Deploying continuous automated retraining pipelines', to: 'Add reviewers to the model risk team so that every model can be reviewed by a person every month.', why: 'More reviewers improve coverage, but without agreed limits and automatic triggers, reviews still depend on people noticing the deterioration.', axis: 'Capacity increase instead of defined triggers' },
    { from: 'Decommissioning the model immediately', axis: 'Withdrawal before root cause analysis' },
    { from: 'Authorizing the independent internal audit function', to: 'Publish a dashboard of model accuracy to all business units and ask them to raise concerns.', why: 'Visibility helps, but a dashboard that relies on others to raise concerns has no agreed limit and nobody obliged to act when it is crossed.', axis: 'Visibility without an obligation to act' },
  ],
  'aaig-pipe-1791942429985-18': [
    { from: 'To maximize mathematical interpretability metrics', to: 'To provide every applicant with a full technical description of how the underwriting model works.', why: 'A full technical description is not what most applicants need and does not give them reasons for their own decision. Explainability has to fit the audience.', axis: 'Technical disclosure at the wrong level' },
    { from: 'To procure and implement post-hoc model interpretation toolkits', axis: 'Tooling before stakeholder needs are defined' },
    { from: 'To task the internal audit function', to: 'To give model developers a way to debug errors faster during training and testing.', why: 'Debugging benefits developers, but the governance objective concerns the people affected and the oversight functions, not only the engineering team.', axis: 'Developer convenience mistaken for the governance objective' },
  ],
  'aaig-pipe-1791941180316-32': [
    { from: 'Mandate the automated technical enforcement', to: 'Turn the policy into a one-page summary for staff and test their understanding with a short annual quiz.', why: 'Summaries and quizzes build awareness, but they do not create review cycles or duties, so the policy can still fall out of date or be ignored.', axis: 'Awareness activity mistaken for enforceability' },
    { from: 'Deploy enterprise continuous monitoring tools', axis: 'Monitoring before policy baselines exist' },
    { from: 'Designate the internal audit function to define', to: 'Let each business unit adapt the policy to its own needs and record its version in a central folder.', why: 'Local adaptation makes the policy workable for each unit, but without common review cycles and clear duties the versions drift and cannot be enforced consistently.', axis: 'Local versions without common review' },
  ],
  'aaig-pipe-1791943163595-28-3f1lb': [
    { from: 'To delegate authorization to operational data science teams', to: 'To collect more demographic data about applicants so that the model can be tested for fairness more precisely.', why: 'More demographic data may help testing, but the primary objective is to bring outputs in line with the firm\'s agreed fairness criteria, whatever data is used.', axis: 'Data collection mistaken for the governance objective' },
    { from: 'To immediately retrain the scoring algorithm', to: 'To publish quarterly fairness statistics so that regulators and customers can see how the model performs.', why: 'Publishing figures is a transparency step, but it does not itself correct drift or bring the model back within agreed criteria.', axis: 'Disclosure mistaken for correction' },
    { from: 'To implement continuous runtime monitoring dashboards', axis: 'Monitoring before fairness thresholds are evaluated' },
  ],
  'aaig-pipe-1791943315649-58-7qd1l': [
    { from: 'Require the direct technical execution of automated red-teaming', to: 'Approve each supplier contract personally and sign off the residual risk on behalf of the business.', why: 'Approving contracts and accepting residual risk are management decisions. The second line sets criteria and challenges, but does not take them over.', axis: 'Management decision assigned to the second line' },
    { from: 'Implement real-time telemetry pipelines', axis: 'Production monitoring before contractual terms are final' },
    { from: 'Assume full operational ownership for retraining', to: 'Maintain the register of approved suppliers and remove any supplier that has a security incident.', why: 'A register is a useful tool, but removal on an incident alone is not a risk-based due diligence approach, and keeping the list is not the second line\'s primary objective.', axis: 'Administrative list mistaken for the oversight objective' },
  ],
  'aaig-pipe-1791943198675-33-0tu1t': [
    { from: 'Mandate universal post-hoc feature attribution', axis: 'One technique mandated for every pipeline' },
    { from: 'Commission a third-line review to penalize', to: 'Ask the model vendor to supply an explanation module and use it for all reporting.', why: 'A vendor module may suit some decisions, but it does not define who needs which explanation or what regulation requires of the firm.', axis: 'Vendor tool mistaken for requirements' },
    { from: 'Empower first-line machine learning engineers', to: 'Limit the firm to inherently interpretable models, whatever the decision or its impact.', why: 'Interpretable models fit some uses, but a blanket limit ignores context and decision impact and may sacrifice needed performance.', axis: 'Uniform technical mandate regardless of context' },
  ],
  'aaig-pipe-1791941505157-23': [
    { from: 'Verify that the technical procurement team can inspect', axis: 'Technical inspection mistaken for allocated accountability' },
    { from: 'Execute continuous automated red-teaming', to: 'Rely on the supplier\'s published model card and responsible-AI statement as the basis of assurance.', why: 'Supplier-published statements describe what the supplier chooses to say and are not verified, enforceable commitments to the institution.', axis: 'Supplier self-description mistaken for assurance' },
    { from: 'Delegate final supply chain risk acceptance', to: 'Limit the integration to non-critical decisions for the first year and review the arrangement then.', why: 'A cautious start limits exposure, but it does not establish who is accountable, what can be audited, or how risk is allocated in the meantime.', axis: 'Cautious scope mistaken for governing terms' },
  ],
  'aaig-pipe-1791942379061-5': [
    { from: 'Deploy an automated data-profiling and lineage-tagging tool', to: 'Ask each business unit to keep its own data quality policy and review it each year with its governance lead.', why: 'Separate unit policies give structure, but without common thresholds and a named person accountable for each dataset, each unit still defines quality in its own way.', axis: 'Unit-level policies without common standards' },
    { from: 'Mandate that individual data engineering teams', axis: 'Remediation before the policies are ratified' },
    { from: 'Direct the Internal Audit team', to: 'Appoint a data steward in each business unit and let each steward set the quality rules for the datasets that unit owns.', why: 'Stewards are useful, but local rules recreate the inconsistency. The framework has to come first and the stewards then apply it.', axis: 'Local rules without enterprise standards' },
  ],
  'aaig-pipe-1791942403792-10': [
    { from: 'Negotiate custom service level agreements', to: 'Negotiate service levels and indemnity clauses with the vendor before the firm has assessed the risks of the sourcing options.', why: 'Contract terms matter, but negotiating them before the options and their risks are assessed commits the firm too early.', axis: 'Contract terms before an initial risk assessment' },
    { from: 'Mandate red-teaming benchmarks', to: 'Ask two business sponsors to rank the options by expected benefit and take the option with the higher ranking.', why: 'Sponsor ranking captures expected benefit, but not risk appetite, compliance duties or the cost of the option over its lifecycle.', axis: 'Single-criterion ranking' },
    { from: 'Delegate the sourcing determination', to: 'Ask the procurement team to pick the supplier with the lowest bid and record the choice for the governance committee.', why: 'The lowest bid fits cost, but cost is only one factor. Strategy, risk and compliance duties have to be weighed before the choice.', axis: 'Cost as the sole criterion' },
  ],
  'aaig-pipe-1791942404379-12': [
    { from: 'Deploying automated network monitoring agents', to: 'Ask each business unit to name an owner for each AI application and share the list with the risk function once a year.', why: 'A list shows what is in use, but it sets no rules and no approval route, so accountability across units stays unclear.', axis: 'Inventory without rules' },
    { from: 'Conducting detailed algorithmic impact assessments', to: 'Run an awareness campaign on responsible AI use and ask all employees to confirm that they have read the guidance.', why: 'Awareness raises understanding, but it does not set approval routes or decision rights across business units.', axis: 'Awareness mistaken for oversight' },
    { from: 'Delegating AI tool evaluation', to: 'Delegate AI tool evaluation and compliance sign-off to the business unit managers who will use the tools.', why: 'Delegation speeds up work, but sign-off by the units that use the tools leaves no enterprise-wide accountability.', axis: 'Delegation without enterprise criteria' },
  ],
  'aaig-pipe-1791942454013-23': [
    { from: 'Mandate continuous real-time telemetry monitoring', axis: 'Technical monitoring inside the vendor\'s infrastructure' },
    { from: 'Execute recurring forensic bias audits', to: 'Ask the supplier to complete the firm\'s standard security questionnaire once at onboarding and file the answers.', why: 'A questionnaire records the supplier\'s claims at one point in time. It sets no tiers, expectations or audit rights.', axis: 'One-off self-assessment' },
    { from: 'Formally execute commercial procurement contracts', to: 'Approve the supplier arrangement once the business owner confirms that the commercial terms are acceptable.', why: 'Commercial acceptance is a business decision. The governance objective is risk tiering and assurance rights that continue through the arrangement.', axis: 'Commercial approval mistaken for oversight' },
  ],
  'aaig-pipe-1791942470081-25': [
    { from: 'Deploy automated data profiling pipelines', to: 'Ask business units to name a data owner for each dataset, who then decides what quality is acceptable.', why: 'Owners are needed, but if each owner decides acceptable quality alone, the standards differ and nobody verifies them independently.', axis: 'Ownership without common criteria' },
    { from: 'Mandate immediate data cleansing sprints', axis: 'Remediation before the framework exists' },
    { from: 'Authorize the independent internal audit function', to: 'Hire an outside data consultancy to cleanse the training data and certify it as fit for purpose.', why: 'A one-off cleanse and certificate fixes today\'s data, but sets no owners, criteria or verification that continue as the data changes.', axis: 'One-off cleanse mistaken for governance' },
  ],
  'aaig-pipe-1791943105269-12-9ueky': [
    { from: 'Allow the first-line MLOps engineering team', axis: 'Operating team adjusting its own limits' },
    { from: 'Retrain the production model immediately', to: 'Add the macroeconomic variables to the monitoring report and ask the model owner to watch them every week.', why: 'More visibility helps, but watching a dashboard is not a control until limits and the required responses are agreed.', axis: 'Visibility without an obligation to act' },
    { from: 'Conduct a comprehensive third-line independent assurance', to: 'Ask the model validation team to review the model every quarter and report its findings to the credit committee.', why: 'A periodic review is good practice, but the degradation continues between reviews and nothing defines when the firm must act.', axis: 'Periodic review without triggers' },
  ],
  'aaig-pipe-1791943144401-22-8tbz6': [
    { from: 'Deploying automated model monitoring toolsets', to: 'Ask each business unit to confirm every quarter that it follows the new AI policy and to report any exceptions to the board.', why: 'Self-confirmation raises awareness, but without gated approvals nobody checks a use case before it goes ahead.', axis: 'Attestation instead of a gate' },
    { from: 'Mandating pre-deployment algorithmic conformity', to: 'Publish the AI policy on the intranet and run a training course on it for all staff who build or buy AI tools.', why: 'Training makes the rules known, but it creates no approval step that can stop or condition a non-compliant use case.', axis: 'Awareness mistaken for enforcement' },
    { from: 'Empowering individual product development teams', axis: 'Self-certification by the teams being governed' },
  ],
  'aaig-pipe-1791943166460-26-wrliw': [
    { from: 'Mandate that all first-line data science teams populate', axis: 'Documentation before a schema is agreed' },
    { from: 'Procure and deploy an automated metadata harvesting tool', to: 'Ask each business unit to list the AI systems it knows about in a spreadsheet and send it to the committee within 30 days.', why: 'A quick list shows what units remember, but with no common taxonomy or required fields the entries cannot be compared or risk-tiered.', axis: 'Unstructured list before a taxonomy' },
    { from: 'Direct the internal audit team to conduct an independent baseline', to: 'Rank the business units by their expected AI risk and ask the head of the highest-risk unit, who is accountable for it, to build its inventory first.', why: 'Starting with one unit may help, but without a common taxonomy and minimum fields each unit builds a different inventory.', axis: 'Sequencing by unit before common standards' },
  ],
  'aaig-pipe-1791943170521-27-c05z1': [
    { from: 'Mandate that data engineering teams apply differential privacy', to: 'Ask data science teams to document why each attribute is used and keep the documentation with the model record.', why: 'Documentation records intent, but nothing stops unneeded attributes entering training, so minimization depends on each team\'s judgement.', axis: 'Documentation without a gate' },
    { from: 'Commission a third-line audit of inference logs', axis: 'After-the-fact detection instead of prevention' },
    { from: 'Authorize first-line data science teams to perform', to: 'Let the privacy office review a sample of training datasets each quarter and ask teams to delete any attributes it finds unnecessary.', why: 'A sampled review finds some problems, but the data has already been used for training and unsampled datasets are never checked.', axis: 'Sampled review after ingestion' },
  ],
  'aaig-pipe-1791943088709-8-8nnep': [
    { from: 'Deploying automated in-processing bias mitigation', to: 'Ask the model team to retrain the model on recent applicants and publish the new accuracy figures to the risk committee.', why: 'Retraining on recent data may reduce the drift, but accuracy figures alone do not show that fairness criteria and legal duties are met.', axis: 'Accuracy reporting mistaken for fairness' },
    { from: 'Maximizing operational throughput', axis: 'Performance goal that ignores fairness' },
    { from: 'Tasking the independent third-line', to: 'Pause all new loan decisions until the second line has reviewed every model parameter and the governance committee has signed it off.', why: 'Pausing is a containment option, not the governance objective, and it removes the service without setting the criteria the firm must meet.', axis: 'Containment mistaken for the objective' },
  ],
  'aaig-pipe-1791943062361-2-m01ua': [
    { from: 'Mandate automated technical guardrails', axis: 'Technical blocking before the rules exist' },
    { from: 'Conduct comprehensive conformity assessments', to: 'Create a central register of the AI guidelines that business units issue and ask the policy team to flag contradictions each quarter.', why: 'A register shows the inconsistency, but flagging contradictions afterwards does not give the units one standard to follow.', axis: 'Detecting inconsistency instead of preventing it' },
    { from: 'Authorize internal audit to draft operational prompt', to: 'Ask each business unit to write its own AI usage guidelines and send a copy to the risk function for the record.', why: 'Local guidelines respond quickly, but copies filed for the record create no common standard and nobody checks consistency.', axis: 'Local guidelines without a common standard' },
  ],
  'aaig-pipe-1791943222206-37-po9vv': [
    { from: 'Deploying continuous automated model performance telemetry', to: 'Ask the risk committee to review the MEASURE results each quarter and decide case by case which findings need action.', why: 'A quarterly review informs decisions, but with no set limits every case is argued afresh and some findings are never acted on.', axis: 'Case-by-case review without defined limits' },
    { from: 'Conducting post-incident forensic', axis: 'Reactive review after harm has occurred' },
    { from: 'Empowering frontline data science project leads', to: 'Give each model owner a monthly target for open MEASURE findings and report the progress to the committee.', why: 'Targets for closing findings measure activity, but they do not connect a metric result to a defined treatment decision.', axis: 'Activity target instead of a trigger' },
  ],
  'aaig-pipe-1791943243672-41-65gxx': [
    { from: 'Procure an enterprise AI observability', to: 'Survey the business units for the AI use cases they plan and rank them by expected revenue before agreeing any structure.', why: 'A ranked list shows ambition, but nobody yet decides which initiatives fit the strategy or who may approve them.', axis: 'Ranking by revenue before decision rights' },
    { from: 'Perform rigorous algorithmic audits', axis: 'Assessing candidate models before the strategy is aligned' },
    { from: 'Authorize first-line business unit product owners', to: 'Ask the chief executive to appoint an AI sponsor in each business unit to push initiatives forward in line with unit targets.', why: 'Sponsors drive delivery, but unit-by-unit targets do not align the initiatives to one enterprise strategy or set who decides.', axis: 'Unit sponsors without enterprise alignment' },
  ],
  'aaig-pipe-1791943238742-43-l38z6': [
    { from: 'Executing end-to-end data pipeline', to: 'Running the day-to-day controls over each model and fixing issues as they arise within the approved limits.', why: 'Day-to-day control and fixing issues are management duties of the first line. The second line oversees and challenges them.', axis: 'First-line duty assigned to the second line' },
    { from: 'Remediating detected algorithmic drift', to: 'Approving each model for release into production and accepting the residual risk on behalf of the business.', why: 'Release approval and risk acceptance belong to the management that runs the system. The second line advises and challenges, it does not decide for them.', axis: 'Management decision assigned to the second line' },
    { from: 'Providing independent, objective assurance', axis: 'Third-line duty assigned to the second line' },
  ],
  'aaig-pipe-1791943269969-47-mryb2': [
    { from: 'Conducting post-hoc empirical extraction', to: 'Require a privacy review of each model after it has been trained, and remove the attributes that the review finds unnecessary.', why: 'A review after training finds problems late, when the model has already learned from the unnecessary attributes.', axis: 'Review after training instead of at intake' },
    { from: 'Delegating final feature-selection', to: 'Ask each team\'s privacy champion to approve its feature list and keep the approval with the model record.', why: 'Local approval depends on each team\'s own judgement, and nothing applies a common test of purpose and necessity before ingestion.', axis: 'Local approval without a common gate' },
    { from: 'Deploying differential privacy', to: 'Add differential privacy noise to stored data and use synthetic data wherever it is available, whatever the effect on accuracy.', why: 'Technical protection helps, but applying it everywhere regardless of need harms utility and does not show that each attribute is justified at intake.', axis: 'Technical obfuscation in place of intake control' },
  ],
  'aaig-pipe-1791943199628-31-3294z': [
    { from: 'Commission business unit product owners', axis: 'Reconciliation after implementation, before value metrics exist' },
    { from: 'Direct the internal audit function to establish quantitative', to: 'Ask finance to set one hurdle rate for all AI projects and reject any proposal whose forecast return falls below it.', why: 'A single hurdle rate is a useful filter, but it ignores strategic value and risk, and nothing yet defines how benefits will be measured.', axis: 'Single financial filter' },
    { from: 'Procure and deploy an enterprise-wide automated', to: 'Ask each sponsor to present a business case for its pilot and approve the pilots with the highest forecast return first.', why: 'Business cases are needed, but with no common metrics the forecasts cannot be compared or checked later.', axis: 'Forecasts without common metrics' },
  ],
  'aaig-pipe-1791943294885-53-cjlfm': [
    { from: 'Mandate the implementation of post-hoc attribution', to: 'Ask the vendor to supply an explanation report for every decision and keep the reports in case the regulator asks.', why: 'Reports for every decision give material, but they do not set what each audience needs to know or what the law requires the firm to say.', axis: 'Volume of documentation instead of audience needs' },
    { from: 'Authorize frontline model developers', axis: 'Developers deciding legal thresholds' },
    { from: 'Deploy customer-facing interactive', to: 'Publish a general description of how the model works on the firm\'s website for customers and regulators.', why: 'A general description is transparency at one level. It does not give an applicant the reasons for their own decision.', axis: 'Generic disclosure for all audiences' },
  ],
  'aaig-pipe-1791943171040-25-5puc0': [
    { from: 'Mandate the deployment of centralized', to: 'Ask the board to receive a yearly AI governance presentation from the chief technology officer and record any questions raised.', why: 'An annual presentation informs the board, but it creates no structure with decision rights between meetings.', axis: 'Annual information instead of a structure' },
    { from: 'Delegate operational risk acceptance', to: 'Let each business unit leader accept AI risks and approve policy exceptions for the systems that the unit runs.', why: 'Unit leaders know their systems, but unit-by-unit risk acceptance has no enterprise limits and no independent challenge.', axis: 'Risk acceptance fragmented across units' },
    { from: 'Conduct comprehensive third-party conformity', to: 'Commission an outside review of AI practices at peer firms and adopt the structure that most of them use.', why: 'Peer practice is useful input, but copying it does not tie the structure to this firm\'s strategy, risk limits and board duties.', axis: 'Imitation of peers' },
  ],
  'aaig-pipe-1791943294203-50-49u23': [
    { from: 'Conduct live penetration testing', to: 'Ask the vendors to run a proof of concept at their own cost and pick the one whose results look strongest after four weeks.', why: 'A proof of concept shows technical fit, but not lifecycle cost, explainability or third-party risk, so it informs the choice only in part.', axis: 'Proof of concept as the only basis' },
    { from: 'Prioritize selecting the vendor', to: 'Select the vendor with the highest benchmark accuracy and the lowest fee, then record the choice for the committee.', why: 'Accuracy and price are real factors, but picking on them alone ignores lifecycle cost, explainability and third-party risk.', axis: 'Two metrics as the whole decision' },
    { from: 'Delegate the final buy-versus-build', to: 'Let the sponsoring executive decide after consulting procurement on price and legal on contract terms.', why: 'Consultation on price and terms is useful, but one sponsor\'s judgement does not weigh capability, explainability and risk against agreed limits.', axis: 'Single decision-maker with partial consultation' },
  ],
  'aaig-pipe-1791943382925-72-rsjps': [
    { from: 'Automating continuous retraining', to: 'Ask the model owner to compare accuracy with the launch figure once a quarter and write a short note on any change.', why: 'A quarterly note records the change, but between notes the model can drift well beyond what the firm can accept.', axis: 'Infrequent check without limits' },
    { from: 'Commissioning an immediate architectural', axis: 'Redesign before revised performance metrics exist' },
    { from: 'Tasking the third-line internal audit team', to: 'Have the second line sample model outputs each month and report the error rate to the risk committee.', why: 'Sampling gives some assurance, but with no set limit and no required response the report does not trigger action.', axis: 'Sampling without a trigger' },
  ],
  'aaig-pipe-1791942414357-14': [
    { from: 'Prioritizing the capture of tamper-evident', axis: 'Sound practice: tamper-evident capture balanced with privacy' },
    { from: 'Establishing data logging formats', axis: 'Sound practice: formats, retention and baselines set before launch' },
    { from: 'Assigning independent verification of logging', axis: 'Sound practice: independent verification of logging controls' },
  ],
  'aaig-pipe-1791943115211-14-nny8a': [
    { from: 'Scheduling periodic retrospective audits', axis: 'Sound practice: retrospective audits of high-risk decisions' },
    { from: 'Establishing immutable, time-stamped', axis: 'Sound practice: immutable time-stamped logging' },
    { from: 'Authorizing the second-line risk function', axis: 'Sound practice: second-line review of alert calibration' },
  ],
  'aaig-pipe-1791943330756-59-in7ze': [
    { from: 'Prioritizing escalation protocols', axis: 'Sound practice: escalation by aggregate enterprise impact' },
    { from: 'Formally defining quantitative residual', axis: 'Sound practice: tolerance bands and escalation set before monitoring starts' },
    { from: 'Tasking second-line risk management', axis: 'Sound practice: second-line challenge of threshold changes' },
  ],
  'aaig-pipe-1791943346650-64-3nlj2': [
    { from: 'Empowering second-line risk functions', axis: 'Sound practice: second-line challenge with power to stop deployments' },
    { from: 'Mandating that technical development teams', axis: 'Sound practice: fairness metrics tracked before release' },
    { from: 'Requiring multi-disciplinary stakeholder', axis: 'Sound practice: stakeholder consultation before fairness thresholds' },
  ],
  'aaig-pipe-1791943564576-114-jdy9q': [
    { from: 'Capturing comprehensive input prompts', axis: 'Sound practice: write-once tamper-evident capture' },
    { from: 'Establishing continuous automated baseline', axis: 'Sound practice: drift alerts set before logging expands' },
    { from: 'Requiring the internal audit function', axis: 'Sound practice: independent assessment of monitoring controls' },
  ],
  'aaig-pipe-1791943983566-199-mxwfl': [
    { from: 'Establishing dynamic operational key risk', axis: 'Sound practice: indicators that escalate before a breach' },
    { from: 'Calibrating model-level tolerance', axis: 'Sound practice: model thresholds calibrated to board-approved appetite' },
    { from: 'Mandating that the second-line risk', axis: 'Sound practice: second-line challenge of metrics' },
  ],
  'aaig-pipe-1791943026259-0-006uc': [
    { from: 'Direct operational product teams', axis: 'Thresholds set by product teams before the mandate' },
    { from: 'Deploy centralized model monitoring', to: 'Ask each product team to report its AI risks to the board in its own format once a year.', why: 'Unit reports give the board some visibility, but with no common format and no decision rights they cannot be compared or acted upon.', axis: 'Reporting without a mandate' },
    { from: 'Require the internal audit function', to: 'Ask the board to appoint an AI specialist to its audit committee before any other step is taken.', why: 'Expertise on the board helps, but it does not create the mandate that sets who decides on AI and how much risk is accepted.', axis: 'Expertise added before a mandate' },
  ],
  'aaig-pipe-1791943242476-42-b4cm9': [
    { from: 'Deploying automated real-time input', to: 'Publish the AI principles in the code of conduct and ask all staff to sign every year that they have read it.', why: 'A signed statement builds awareness, but it adds no procedure or approval step that can stop a use that breaches the principles.', axis: 'Awareness mistaken for control' },
    { from: 'Conducting comprehensive third-party algorithmic', axis: 'Impact assessments before the policy statements exist' },
    { from: 'Empowering individual business unit application', to: 'Let each business unit adopt the principles in its own procedures and report breaches to the ethics office.', why: 'Local procedures adapt the principles to each unit, but without common mandatory controls adherence differs between units.', axis: 'Local procedures without common controls' },
  ],
  'aaig-pipe-1791943290779-52-tsbao': [
    { from: 'Authorize the first-line machine learning', to: 'Ask the model owner to compare live results with the launch figures every month and file the comparison with the model record.', why: 'A monthly comparison records the decline, but with no agreed limit nothing obliges anyone to re-evaluate the model.', axis: 'Monitoring without a limit' },
    { from: 'Retrain the production machine learning model immediately', to: 'Retrain the model on the most recent operational data every week so that it follows the shift.', why: 'Frequent retraining chases the shift and may build in the new bias, and it sets no limit that tells reviewers when the model is no longer acceptable.', axis: 'Retraining as the control' },
    { from: 'Commission an independent third-line', to: 'Ask the second line to review the credit scoring model each quarter and report its view on predictive efficacy and fairness.', why: 'A periodic review gives an independent view, but between reviews the degradation continues and nothing defines when to act.', axis: 'Periodic review without triggers' },
  ],
  'aaig-pipe-1791943271485-48-c6uyk': [
    { from: 'Authorize the immediate operational deployment', to: 'Ask the model owner to oversample the under-represented group and retrain, then report the updated accuracy to the committee.', why: 'Rebalancing the data may help, but the objective of the governance body is fairness and legal compliance, which accuracy figures alone do not show.', axis: 'Technical correction mistaken for the objective' },
    { from: 'Direct engineering teams to maximize', axis: 'Accuracy goal that ignores fairness' },
    { from: 'Empower the first-line model development team', to: 'Have the second line set a new disparate impact threshold that fits the observed drift and apply it to this system.', why: 'Moving a threshold to fit the drift hides the problem. The governance body sets the threshold from fairness criteria and the law, not the other way round.', axis: 'Threshold adjusted to fit the drift' },
  ],
  'aaig-pipe-1791942473141-28': [
    { from: 'Maximizing algorithmic model accuracy', axis: 'Performance target mistaken for risk responsibility' },
    { from: 'Deploying automated model drift', to: 'Setting the AI risk limits for the whole enterprise and approving the exceptions that business units ask for.', why: 'Setting enterprise limits and approving exceptions belongs to the governing body and senior management. The first line works within the limits.', axis: 'Governing-body duty assigned to the first line' },
    { from: 'Conducting independent, objective assurance', axis: 'Third-line duty assigned to the first line' },
  ],
  'aaig-pipe-1791943197132-30-yyz23': [
    { from: 'Conducting exhaustive technical benchmarking', to: 'Run a technical benchmark of vendor latency and uptime across the candidates and favour the fastest one.', why: 'Latency and uptime are real factors, but a technical benchmark does not weigh strategic fit, risk or lifecycle obligations.', axis: 'Technical benchmark as the decision' },
    { from: 'Performing deep technical penetration', to: 'Ask the vendors for references from similar firms and have the model owner choose the supplier with the strongest endorsements.', why: 'References are useful signals, but endorsements say little about the firm\'s own risk, cost and obligations.', axis: 'Endorsements as the sole basis' },
    { from: 'Delegating the ultimate sourcing selection', to: 'Let the business unit that requested the AI choose, with the finance team confirming that the budget is available.', why: 'Budget confirmation checks affordability only, and the requesting unit\'s choice does not weigh risk and lifecycle obligations at enterprise level.', axis: 'Requester decides, budget as the only check' },
  ],
  'aaig-pipe-1791943237518-40-m0yds': [
    { from: 'Instruct internal audit to conduct technical conformity', axis: 'Technical assessment before policies and taxonomies exist' },
    { from: 'Mandate the immediate deployment', to: 'Ask the chief risk officer to present a list of AI incidents to the board each time one occurs and record its comments.', why: 'Incident reports inform the board after the fact, but they set no decision rights or reporting structure for oversight in advance.', axis: 'After-the-fact reporting' },
    { from: 'Assign ultimate accountability', to: 'Appoint one board member as the owner of AI topics to take questions from management and report to the board when needed.', why: 'A single sponsor gives management a contact, but oversight needs a structure with decision rights, not reliance on one person.', axis: 'Single sponsor instead of a structure' },
  ],
  'aaig-pipe-1791943386735-73-ro93k': [
    { from: 'Mandate the universal deployment', to: 'Require a short plain-language note on every model decision so that customers and regulators can read it.', why: 'A standard note helps readability, but one format cannot meet the different needs of customers, regulators and reviewers.', axis: 'One format for all audiences' },
    { from: 'Integrate automated counterfactual', axis: 'Customer-facing tooling before risk classification' },
    { from: 'Authorize the internal audit function to design', to: 'Ask the vendor to certify that the model is explainable and rely on the certificate in regulatory discussions.', why: 'A vendor certificate is the supplier\'s own claim. It does not set what the firm\'s stakeholders and regulators need explained.', axis: 'Vendor claim mistaken for requirements' },
  ],
  'aaig-pipe-1791943411137-77-o3n8u': [
    { from: 'Mandating automated continuous statistical', to: 'Ask the risk function to collect the MEASURE results in one report each quarter and share it with the business units.', why: 'A shared report spreads the results, but nothing obliges the units to act on them or sets who reviews a breach.', axis: 'Reporting without an obligation to act' },
    { from: 'Performing post-deployment independent', to: 'Make each model team responsible for investigating its own breaches and deciding whether the result needs to be reported.', why: 'Self-investigation is a normal first step, but when the team that owns the model decides what is reported, oversight depends on its judgement.', axis: 'Self-reporting by the team that owns the model' },
    { from: 'Delegating discretionary authority', axis: 'Operating team adjusting its own thresholds' },
  ],
  'aaig-pipe-1791943405753-78-721my': [
    { from: 'Conduct continuous penetration testing', to: 'Ask the supplier for its latest independent security audit report and file it with the contract.', why: 'An audit report gives evidence about security, but not about the supplier\'s AI risk practices, transparency or the firm\'s legal obligations.', axis: 'Security evidence mistaken for AI risk assurance' },
    { from: 'Verify that the model vendor', to: 'Choose the supplier with the best record on service availability and the shortest time to resolve support tickets.', why: 'Availability and support speed matter for operations, but they do not show that the supplier\'s AI risk practices fit the firm\'s limits.', axis: 'Operational service quality mistaken for risk assurance' },
    { from: 'Empower the retail lending', axis: 'Business sign-off on technical documentation' },
  ],
  'aaig-pipe-1791943428696-83-84pke': [
    { from: 'Deploy automated model observability', to: 'Run the day-to-day controls over each model and fix failures as they appear in operations.', why: 'Running controls and fixing failures is management work of the first line. The second line oversees and challenges it.', axis: 'First-line duty assigned to the second line' },
    { from: 'Execute granular technical audits', axis: 'Technical audit before the risk appetite is set' },
    { from: 'Assume direct operational ownership', to: 'Give independent assurance to the audit committee on whether the whole AI governance system works.', why: 'Independent assurance to the audit committee is the role of the third line. The second line is part of management.', axis: 'Third-line duty assigned to the second line' },
  ],
  'aaig-pipe-1791943444776-87-34yu5': [
    { from: 'Deploy synthetic data generation', to: 'Ask data stewards to classify each source by sensitivity and keep the classification in the data catalogue.', why: 'Classification is a useful input, but it does not test whether each feature is needed for the business objective before it enters training.', axis: 'Classification without a necessity test' },
    { from: 'Authorize the first-line AI engineering', to: 'Let each model team decide which features to keep after training, based on how much each one improves the results.', why: 'Keeping features that improve results ignores whether the data was needed in the first place, and the decision is taken after intake.', axis: 'Performance used to justify data intake' },
    { from: 'Implement post-hoc differential privacy', axis: 'Output protection instead of intake control' },
  ],
  'aaig-pipe-1791943445534-88-jxmit': [
    { from: 'Require internal audit to perform', to: 'Ask the risk committee to pause the model until the drift is understood and let the operations team investigate on its own.', why: 'A pause is a containment option, but the primary objective is to keep outcomes within approved limits through formal review, not an open-ended stop.', axis: 'Containment mistaken for the objective' },
    { from: 'Mandate immediate hyperparameter', to: 'Maximize predictive accuracy for the groups that are now most common among applicants and report the results monthly.', why: 'Optimizing for the current mix may raise accuracy, but it does not address fairness or the approved limits.', axis: 'Accuracy goal that ignores fairness' },
    { from: 'Authorize the first-line data science', to: 'Let the model team decide what level of disparate impact is acceptable for this system until the next annual review.', why: 'The acceptable level is set by the governance body from fairness criteria and the law, and a decision by the model team in the meantime skips formal review.', axis: 'Model team setting its own threshold' },
  ],
  'aaig-pipe-1791943645628-131-2yf79': [
    { from: 'Deploy automated telemetry tooling', to: 'Ask finance to set a minimum return for every AI project and review the actual return once each year.', why: 'A minimum return is a useful test, but value criteria also cover non-financial benefits and risk, and an annual check is late.', axis: 'Financial return as the only value test' },
    { from: 'Mandate that subsidiary product teams', to: 'Ask each subsidiary to calculate the projected net present value of its use cases and send the results to headquarters.', why: 'Projected values are inputs, but without common criteria each subsidiary will calculate them in a different way.', axis: 'Calculations before common criteria' },
    { from: 'Instruct the internal audit department', to: 'Ask each product team to nominate a business sponsor for its pilot and report on its progress every month.', why: 'Sponsors and progress reports improve ownership, but they do not set the common criteria against which value is judged.', axis: 'Sponsorship without value criteria' },
  ],
  'aaig-pipe-1791943365683-65-3cvpi': [
    { from: 'Mandate that the Chief Technology Officer', to: 'Ask the chief technology officer to report quarterly to the board on the status of each AI project and any incidents.', why: 'Status reports inform the board, but they do not create the structure and limits through which the board exercises oversight.', axis: 'Reporting without a structure' },
    { from: 'Delegate complete authority', to: 'Let each business unit set its own AI risk classification and sign off its own systems, with a yearly summary to the board.', why: 'Unit classification is practical, but without common thresholds and independent challenge the board cannot compare risk across units.', axis: 'Unit-by-unit classification' },
    { from: 'Commission an external third-party independent conformity', to: 'Commission an outside review of the firm\'s AI systems against international safety standards before the board agrees any structure.', why: 'An external review gives useful findings, but the board still has to set the structure and limits that tell management what to do with them.', axis: 'External assessment before the mandate' },
  ],
  'aaig-pipe-1791943426620-81-keney': [
    { from: 'Procure and implement an automated AI governance platform', to: 'Ask each business unit to propose its three most valuable AI ideas and rank them by expected revenue.', why: 'Ranking ideas shows ambition, but without agreed objectives and risk limits the ranking has no strategic basis.', axis: 'Ranking ideas before objectives' },
    { from: 'Classify proposed AI use cases', axis: 'Use-case assessment before strategy' },
    { from: 'Direct internal audit to establish acceptable operational use', to: 'Let the head of technology choose two pilot use cases and fund them from the innovation budget.', why: 'Pilots can produce learning, but choosing them before objectives and limits are set leaves the strategy to the technology function.', axis: 'Pilots chosen before objectives' },
  ],
  'aaig-pipe-1791943389729-70-17fxn': [
    { from: 'Conduct technical benchmarking and automated latency', to: 'Choose the commercial model if its benchmark scores beat the in-house prototype by an agreed margin.', why: 'A benchmark margin tests performance only and ignores compliance duties, lifecycle cost and lock-in.', axis: 'Performance margin as the sole test' },
    { from: 'Deploy shortlisted third-party foundation', to: 'Start a limited pilot of the commercial model with a small team and decide after three months.', why: 'A pilot gives evidence, but starting it before the criteria are set means the evidence is not tied to compliance, cost or lock-in.', axis: 'Pilot before criteria' },
    { from: 'Authorize the first-line project engineering', to: 'Let the project team that will use the model make the choice, based on how quickly it can be delivered.', why: 'Delivery speed matters to the project, but the choice affects enterprise risk and cost beyond the project.', axis: 'Project team deciding on speed' },
  ],
  'aaig-pipe-1791943495559-97-m8kn4': [
    { from: 'Implement automated technical observability', to: 'Ask each decentralized team to adopt the NIST AI RMF functions in its own way and share lessons at a monthly forum.', why: 'Local adoption and shared lessons build skills, but they do not give the enterprise common limits, owners or reviews.', axis: 'Local adoption without common limits' },
    { from: 'Execute enterprise-wide black-box', to: 'Run a one-time maturity assessment of each team against the framework and publish the scores.', why: 'A maturity assessment shows gaps, but it does not put an enterprise structure of limits, owners and reviews in place.', axis: 'Assessment mistaken for the structure' },
    { from: 'Task the independent internal audit function', to: 'Ask the independent audit function to set the bias thresholds and approve the risk mitigations for high-risk systems.', why: 'Audit must stay independent of management decisions. Setting thresholds and approving mitigations are management responsibilities.', axis: 'Audit performing management decisions' },
  ],
  'aaig-pipe-1791943537900-108-aanfq': [
    { from: 'Delegate final approval of demographic parity', axis: 'Developers setting their own fairness limits' },
    { from: 'Maximize algorithmic predictive throughput', axis: 'Commercial target ahead of fairness' },
    { from: 'Retrain the production model immediately with newly', to: 'Retrain the model on the newly collected data and compare the accuracy with the previous version.', why: 'Retraining may reduce drift, but comparing accuracy does not show whether the fairness criteria are met or who reviews the result.', axis: 'Retraining as the objective' },
  ],
  'aaig-pipe-1791943556657-113-zrxeu': [
    { from: 'Direct engineering teams to implement post-hoc', to: 'Require model developers to attach a feature-importance chart to every credit decision for the case file.', why: 'A chart for every decision may help reviewers, but it sets no rules on who needs which explanation or how oversight works.', axis: 'Tool output for every decision' },
    { from: 'Empower frontline loan officers', axis: 'Frontline staff setting explanation thresholds' },
    { from: 'Commission an external third-line audit', to: 'Ask an outside expert to review the inference logic of the model and report on what can and cannot be explained.', why: 'An expert review shows what is technically explainable, but it does not set what the firm must provide to customers and regulators.', axis: 'Technical review before requirements' },
  ],
  'aaig-pipe-1791943619721-127-i8i43': [
    { from: 'Commission an independent third-party privacy impact', to: 'Ask the privacy office to run an impact assessment on the data pipeline once the retention model has been agreed.', why: 'An impact assessment is useful, but running it after the retention model is agreed means minimization is checked late.', axis: 'Impact assessment after the design' },
    { from: 'Authorize the lead data science team', to: 'Let each team remove the attributes that it considers unnecessary and record the list in its own repository.', why: 'Local removal relies on each team\'s own view of necessity, and nothing checks the choice before data is ingested.', axis: 'Local removal without a gate' },
    { from: 'Deploy advanced synthetic data generation', to: 'Apply differential privacy to all raw customer data and use synthetic data wherever possible before training.', why: 'Technical protection helps, but applied to everything it harms utility and does not show that each feature is needed.', axis: 'Blanket technical protection' },
  ],
  'aaig-pipe-1791943648083-132-a8ehk': [
    { from: 'Implementing automated continuous retraining', to: 'Retrain the model on a fixed calendar, every quarter, whether or not performance has changed.', why: 'A fixed calendar retrains when nothing is wrong and may miss a sudden decline. Retraining should follow agreed triggers.', axis: 'Calendar retraining without triggers' },
    { from: 'Conducting retrospective independent third-party', to: 'Commission an outside assurance review of the model\'s performance logs after each fiscal year ends.', why: 'A yearly outside review gives independent assurance, but the degradation can continue for months before it is found.', axis: 'Retrospective assurance' },
    { from: 'Authorizing first-line engineering teams', to: 'Let the model owner set the alert sensitivity and review the alerts every week, reporting to the team lead.', why: 'The owner knows the model, but setting its own alert limits without approval means oversight depends on the owner\'s judgement.', axis: 'Owner setting its own alert limits' },
  ],
  'aaig-pipe-1791943931121-186-4ck0r': [
    { from: 'Procure and deploy an automated metadata discovery', to: 'Ask the IT department to export the list of all cloud services that use machine learning from its asset records.', why: 'Exporting what IT already tracks gives a start, but without a definition of an AI asset the list will miss some systems and include others.', axis: 'Existing records before a definition' },
    { from: 'Mandate that decentralized project teams immediately', axis: 'Documentation before a definition' },
    { from: 'Direct the internal audit team to identify third-party', to: 'Ask the procurement team to list the third-party AI services under contract and tier them by contract value.', why: 'Contract value says little about risk, and a list built from contracts before the definition is agreed omits internal and embedded AI.', axis: 'Contract list tiered by value' },
  ],
  'aaig-pipe-1791943895020-178-cpb1m': [
    { from: 'Mandate automated real-time latency', axis: 'Technical filtering of the interface' },
    { from: 'Execute technical red-teaming against the vendor', axis: 'Technical testing before risk criteria' },
    { from: 'Authorize the IT procurement department', to: 'Let the procurement team accept the downstream AI risks once the vendor has signed the standard warranty terms.', why: 'Signed warranties allocate some liability, but accepting risk is a management decision that needs an assessment, not a signature.', axis: 'Warranty mistaken for risk acceptance' },
  ],
  'aaig-pipe-1791943269040-45-lpuih': [
    { from: 'Mandate the enterprise-wide procurement', to: 'Ask the audit committee to review each AI system every year with the system owner and report any weaknesses.', why: 'An annual review gives assurance after the fact, but it does not set who is accountable or the limits within which management acts.', axis: 'Annual assurance instead of accountability' },
    { from: 'Authorize first-line model development teams', to: 'Let model development teams set their own risk acceptance thresholds so that delivery is not delayed.', why: 'Teams know their models, but self-set thresholds lack enterprise limits and independent challenge.', axis: 'Development teams setting their own risk acceptance' },
    { from: 'Direct the internal audit function to execute pre-deployment', to: 'Ask a board member with technology experience to review each major AI project and report to the board.', why: 'One experienced member can brief the board, but oversight needs defined accountability and limits, not reliance on one person\'s review.', axis: 'Individual review instead of accountability' },
  ],
  'aaig-pipe-1791943518869-101-61lzd': [
    { from: 'Procure and deploy an enterprise-wide automated monitoring', to: 'Run a survey of employees on how they use AI at work and summarize the results for the committee.', why: 'A survey shows current use, but it does not set the principles and approval rules that strategy requires.', axis: 'Fact-finding before principles' },
    { from: 'Conduct formal algorithmic impact and conformity', axis: 'Assessments before the principles and rules' },
    { from: 'Task internal audit with reviewing and approving', to: 'Ask the architecture team to publish approved design patterns for AI integration and require teams to use them.', why: 'Design patterns help consistency in engineering, but they do not set the principles and approval rules that connect AI to strategy.', axis: 'Technical standards before principles' },
  ],
  'aaig-pipe-1791943515176-102-okmhl': [
    { from: 'Conduct comprehensive algorithmic bias and performance', to: 'Test the current vendor models for bias and performance before the organization standardizes its risk definitions.', why: 'Testing gives useful evidence, but doing it before risk definitions are standard means the results cannot be judged against common limits.', axis: 'Testing before risk definitions are standard' },
    { from: 'Deploy automated data loss prevention', to: 'Ask each department to nominate an AI contact who answers staff questions about acceptable use.', why: 'Contacts help staff, but without binding rules and roles there is nothing consistent for the contacts to apply.', axis: 'Help desk instead of rules' },
    { from: 'Delegate the approval of domain-specific', to: 'Let business unit managers approve the AI guidelines for their own domains, based on local department goals.', why: 'Local approval fits local goals, but it produces guidelines that differ and cannot be held to one enterprise standard.', axis: 'Local approval of guidelines' },
  ],
  'aaig-pipe-1791943759533-157-mrv74': [
    { from: 'Direct frontline data science teams', to: 'Ask each credit portfolio team to document how it applies the MEASURE results and share the notes quarterly.', why: 'Documentation of local practice shows variety, but it does not connect MEASURE outputs to MANAGE actions in a consistent way.', axis: 'Local documentation instead of a feedback loop' },
    { from: 'Deploy automated risk response orchestration', to: 'Add MANAGE actions to the quarterly business review so that the units report what they did about each risk.', why: 'Review reports show what happened, but without an agreed loop from results to actions they do not drive the mitigation.', axis: 'Reporting without a loop' },
    { from: 'Authorize the internal audit team to unilaterally redefine', to: 'Let the chief risk officer redefine the risk appetite statement every year without consulting the board.', why: 'The risk appetite is set or approved by the governing body, so redefining it alone breaks the link between MEASURE results and approved limits.', axis: 'Appetite redefined by management alone' },
  ],
  'aaig-pipe-1791943737090-153-3s2x0': [
    { from: 'Standardize enterprise-wide on feature attribution', to: 'Standardize on one explanation method for every model so that all reports look the same.', why: 'A single method simplifies reporting, but different stakeholders and risk levels need different kinds of explanation.', axis: 'One method for all models' },
    { from: 'Deploy real-time user-facing explainability', to: 'Give users an explanation page for every decision as soon as possible, and refine it later.', why: 'Explanations given early to everyone may not match what each group needs, and refining later leaves gaps for high-risk decisions.', axis: 'Explanations for all before needs are known' },
    { from: 'Task internal audit with designing and calibrating', to: 'Ask the audit function to design the interpretability metrics and explanations that business units will use.', why: 'Audit has to stay independent of management, and designing the metrics for the business units makes it part of the process it later assures.', axis: 'Audit designing management metrics' },
  ],
  'aaig-pipe-1791943885266-177-6c8rd': [
    { from: 'Mandating automated continuous telemetry', to: 'Ask the model teams to write MAP documentation for each model and file it with the model record.', why: 'MAP documents capture context, but filing them does not link them to the limits under GOVERN or stop a model from going live.', axis: 'Documentation filed without a gate' },
    { from: 'Executing full post-deployment adversarial', to: 'Run a workshop for risk and product staff once a year to share the context risks found in MAP.', why: 'Workshops share knowledge, but they do not build the context risks into the decisions that approve models.', axis: 'Knowledge sharing instead of integration' },
    { from: 'Authorizing second-line model risk management', to: 'Have the second line define the business context of each model and carry out the mitigation for the developers.', why: 'The business context and the mitigation belong to the first line that builds and runs the model. The second line challenges them.', axis: 'Second line doing first-line work' },
  ],
  'aaig-pipe-1791943700289-142-t6qml': [
    { from: 'Deploying automated technical monitoring tools', to: 'Hold a cross-department meeting each month where managers explain how they handle AI cases.', why: 'Meetings share practice, but explaining differences does not remove them or settle who is accountable.', axis: 'Discussion without binding rules' },
    { from: 'Performing comprehensive impact assessments and conformity reviews', to: 'Ask each department to assess its own AI use against the principles and report the gaps to leadership.', why: 'Self-assessment shows the gaps, but without common binding rules each department measures itself differently.', axis: 'Self-assessment without common rules' },
    { from: 'Empowering first-line business unit operational managers', to: 'Let department managers interpret the principles for their own cases and approve exceptions that they find reasonable.', why: 'Local interpretation produces the inconsistency the firm is trying to remove, and exceptions approved by those who benefit have no independent check.', axis: 'Local interpretation and exceptions' },
  ],
  'aaig-pipe-1791943732362-150-ey9df': [
    { from: 'Benchmark technical performance and model latency', axis: 'Technical benchmark as the decision' },
    { from: 'Execute an in-depth third-party algorithmic bias audit', to: 'Ask the vendor for a reference customer in the same sector and follow that customer\'s choice.', why: 'A reference shows that another firm chose the product, not that it fits this firm\'s risks, cost and regulatory duties.', axis: 'Peer choice as the basis' },
    { from: 'Authorize the lead machine learning engineer', to: 'Let the procurement lead finalize terms once the vendor\'s functional capability has been demonstrated.', why: 'Demonstrated capability supports the choice, but finalizing terms before weighing risk and regulation commits the firm early.', axis: 'Terms agreed on capability alone' },
  ],
  'aaig-pipe-1791943598252-121-nry2o': [
    { from: 'Procure an automated AI governance tool', to: 'Ask the chief information officer to recommend three AI use cases that would improve operating efficiency.', why: 'Use cases for efficiency may be valuable, but picking them before the strategy and risk limits are set puts the priorities in the hands of technology.', axis: 'Use cases picked before the strategy' },
    { from: 'Authorize internal audit to design baseline', axis: 'Audit designing management controls' },
    { from: 'Perform algorithmic impact assessments and risk mapping', axis: 'Pilot assessments before strategy' },
  ],
  'aaig-pipe-1791943914843-181-pmvpd': [
    { from: 'Deploy enterprise-wide automated model monitoring platforms', to: 'Ask the committee to review each business unit\'s AI plans one by one, with the owner of each plan presenting it.', why: 'Reviewing plans one by one gives detail, but with no agreed objectives and appetite each plan is judged by a different standard.', axis: 'Plan-by-plan review before objectives' },
    { from: 'Conduct formal AI impact assessments and algorithmic risk scoring', axis: 'Use-case scoring before objectives' },
    { from: 'Empower decentralized business unit leaders', axis: 'Local capital allocation on local returns' },
  ],
  'aaig-pipe-1791943034620-1-q7092': [
    { from: 'Procure an enterprise AI observability platform', to: 'Ask each business unit head for a list of AI projects already under way and the budget committed to each.', why: 'A project list shows current activity, but without objectives and approval authority it cannot show what is aligned with strategy.', axis: 'Inventory before objectives' },
    { from: 'Direct the internal audit activity', to: 'Ask the head of risk to write mandatory testing thresholds for generative AI platforms before any new platform is approved.', why: 'Testing thresholds are needed, but setting them before objectives and approval authority are defined puts technical rules ahead of strategy.', axis: 'Testing thresholds before strategy' },
    { from: 'Conduct comprehensive algorithmic impact assessments on all proposed', axis: 'Pilot assessments before objectives' },
  ],
  'aaig-pipe-1791943467675-90-it88i': [
    { from: 'Conduct extensive empirical model performance', to: 'Select the option that gives the best accuracy in a head-to-head test on the firm\'s own data.', why: 'A head-to-head test shows accuracy on the firm\'s data, but not risk class, lifetime cost or supplier assurance.', axis: 'Accuracy as the only test' },
    { from: 'Negotiate indemnification clauses', to: 'Agree indemnity and intellectual property terms with the leading vendor before the system\'s risk class is known.', why: 'Strong terms are valuable, but agreeing them before the risk class is known may fix protections that do not match the risk.', axis: 'Contract terms before risk classification' },
    { from: 'Assign the definitive sourcing choice', to: 'Assign the sourcing choice to the legal team, since contract terms drive most of the risk.', why: 'Contract terms are one part of the risk, and the choice also depends on strategy, cost and supplier assurance.', axis: 'Single function deciding' },
  ],
  'aaig-pipe-1791943564664-110-4uy56': [
    { from: 'Deploy runtime API telemetry', to: 'Open contract talks with the leading vendor now, and complete the capability evaluation while talks continue.', why: 'Parallel talks save time, but they weaken the firm\'s position and risk committing before the evaluation is done.', axis: 'Negotiation before evaluation' },
    { from: 'Prioritize the sourcing pathway', to: 'Choose the route with the lowest first-year cost and the highest throughput in the vendor\'s own benchmarks.', why: 'First-year cost and vendor-reported throughput ignore transparency, IP rights and ongoing assurance duties.', axis: 'Cost and vendor benchmarks as the decision' },
    { from: 'Authorize the operational development team', to: 'Let the development team choose the route that passes its functional tests soonest.', why: 'Passing functional tests shows fitness for use, but the team\'s choice does not weigh transparency, IP and assurance for the enterprise.', axis: 'Team deciding on functional tests' },
  ],
  'aaig-pipe-1791943914843-183-kyc4x': [
    { from: 'Deploy automated model monitoring telemetry', to: 'Run the monitoring of each model day to day and fix the issues it shows, as part of the delivery process.', why: 'Day-to-day monitoring and fixing are part of management\'s delivery work. The second line oversees and challenges it.', axis: 'First-line duty assigned to the second line' },
    { from: 'Perform retrospective bias remediation', axis: 'Remediation before the risk taxonomy' },
    { from: 'Assume direct operational ownership', axis: 'Operational approval taken from management' },
  ],
  'aaig-pipe-1791943647350-133-4g5z3': [
    { from: 'Mandate post-hoc local surrogate', axis: 'One technique mandated everywhere' },
    { from: 'Deploy automated model observability dashboards', to: 'Show feature attributions for each scoring decision to the operations team so that it can explain results on request.', why: 'Attributions help operations answer questions, but they do not set what customers and regulators must be told.', axis: 'Technical output for operations' },
    { from: 'Direct the internal audit function to establish operational explainability', to: 'Ask the legal team to write the consumer recourse process and decide what explanation customers receive.', why: 'Recourse and customer notices matter, but one function deciding alone does not set requirements for every stakeholder group.', axis: 'One function deciding' },
  ],
  'aaig-pipe-1791943950598-192-9ij22': [
    { from: 'Retraining the primary production', to: 'Retrain the production model on the latest inference data to bring statistical performance back quickly.', why: 'Retraining may restore the metrics, but it sets no limit and no response when performance falls, and it may hide the cause.', axis: 'Retraining as the control' },
    { from: 'Executing a comprehensive third-line', to: 'Ask the model validation team for a full review of the causes of decay before any change is made to the system.', why: 'A full review of causes is useful, but waiting for it means the degraded model keeps running with no limit that triggers a response.', axis: 'Root-cause study before any response' },
    { from: 'Authorizing the first-line machine learning engineering', to: 'Let the model owner decide when the error rate is too high and switch the model off if needed.', why: 'The owner knows the model, but a case-by-case decision has no agreed limit and may be influenced by delivery pressure.', axis: 'Owner\'s case-by-case judgement' },
  ],
  'aaig-pipe-1791943988538-197-p3hhf': [
    { from: 'Mandating automated algorithmic bias', to: 'Ask the AI oversight committee to receive a quarterly report on operational risks from the business units.', why: 'A quarterly report informs the committee, but without enterprise limits and set feedback loops GOVERN does not steer operations.', axis: 'Reporting without limits' },
    { from: 'Executing comprehensive MAP and MEASURE', to: 'Complete MAP and MEASURE assessments for each generative AI use case, and agree the enterprise rules afterwards.', why: 'Use-case assessments are useful, but doing them before enterprise limits and categories exist leaves GOVERN out of the loop.', axis: 'Use-case assessments before enterprise rules' },
    { from: 'Authorizing first-line development teams to autonomously', to: 'Let development teams set their own risk tolerances and approve exceptions, reporting them annually to the committee.', why: 'Teams know their systems, but self-set tolerances and exceptions bypass the enterprise limits that GOVERN is meant to provide.', axis: 'Teams setting their own tolerances' },
  ],
  'aaig-pipe-1791943982220-198-6afbl': [
    { from: 'Conducting continuous automated adversarial', to: 'Run adversarial robustness tests on the supplier\'s API every quarter and share the results with the vendor.', why: 'Robustness tests are valuable, but they do not allocate responsibility for risk or fix transparency duties in the contract.', axis: 'Technical testing instead of allocation' },
    { from: 'Establishing real-time production drift dashboards', axis: 'Monitoring before supplier classification' },
    { from: 'Empowering procurement engineers', to: 'Let the procurement team accept the residual AI risks if the vendor holds a recognized external audit certificate.', why: 'A certificate shows that the vendor passed an audit, but accepting residual risk is a management decision that depends on the firm\'s own limits.', axis: 'Certificate mistaken for risk acceptance' },
  ],
  'aaig-pipe-1791943958027-190-xf2br': [
    { from: 'Mandate automated adversarial red-teaming', to: 'Rank the shortlisted models by their results on a standard accuracy test and take the highest ranked.', why: 'A ranking by accuracy ignores strategic fit, cost over time, risk and assurance needs.', axis: 'Accuracy ranking as the decision' },
    { from: 'Negotiate contract indemnification clauses', to: 'Open negotiations with the two lowest-priced vendors and choose the one that accepts the strongest audit terms.', why: 'Strong audit terms are valuable, but starting negotiations before criteria and risk limits are set narrows the choice by price.', axis: 'Negotiation before criteria' },
    { from: 'Delegate the final buy-versus-build determination', to: 'Let the business development team decide, provided it records that it accepts the operational risks.', why: 'Recording acceptance does not make the decision independent. The team that wants the product weighs risk for the whole enterprise.', axis: 'Requester accepting its own risk' },
  ],
  'aaig-pipe-1791943650497-130-94yh2': [
    { from: 'Benchmark performance, inference cost', axis: 'Technical feasibility as the decision' },
    { from: 'Sign vendor contracts', axis: 'Contract signature before risk tiering' },
    { from: 'Direct the internal audit function to select', to: 'Ask the audit function to choose the preferred sourcing model and set up the vendor monitoring routines.', why: 'Audit must stay independent of management decisions, and choosing the model and running monitoring are management work.', axis: 'Audit performing management work' },
  ],
  'aaig-pipe-1791943869015-170-3r2zz': [
    { from: 'Perform comprehensive automated latency', to: 'Compare the open-source and commercial options on speed and accuracy using the same test set.', why: 'A speed and accuracy comparison tests technical performance, but not transparency, provenance or fit with the firm\'s risk limits.', axis: 'Technical comparison only' },
    { from: 'Require the procurement department', to: 'Ask procurement to negotiate indemnity clauses and annual external vulnerability audits with every supplier.', why: 'Indemnity and audits are useful terms, but applying them to every supplier without first assessing transparency and provenance is not risk-based.', axis: 'Uniform contract terms before assessment' },
    { from: 'Delegate single-point model selection', to: 'Let the team that manages the API integration choose the model and accept the supplier risk.', why: 'The integration team knows the technical fit, but choosing the model and accepting supplier risk for the enterprise is not its decision to make alone.', axis: 'Integration team accepting supplier risk' },
  ],
  'aaig-pipe-1791944022162-207-p53nt': [
    { from: 'Mandating advanced homomorphic', to: 'Encrypt all training data end to end and apply differential privacy in every training environment.', why: 'Strong technical protection helps, but it does not limit what data is collected, so minimization is not achieved.', axis: 'Protection of everything instead of minimization' },
    { from: 'Performing automated privacy leakage', to: 'Scan the model each month for privacy leakage and remove any data the scan shows to be exposed.', why: 'Scanning finds leakage after the data has been used, while minimization applies before and during model development.', axis: 'Detection after use' },
    { from: 'Authorizing first-line data engineering', to: 'Let each data lead prune high-dimensional consumer data that does not improve the model\'s loss.', why: 'Pruning for model performance ignores whether each data type is needed for the purpose, and each lead decides alone.', axis: 'Performance-based pruning' },
  ],
  'aaig-pipe-1791944117191-227-p3ddh': [
    { from: 'Deploy advanced differential privacy', to: 'Apply differential privacy to raw repositories and use synthetic data wherever it is workable.', why: 'Masking identity helps privacy, but it does not decide which data may enter the pipeline for which purpose.', axis: 'Masking instead of purpose limits' },
    { from: 'Conduct automated data protection impact', to: 'Run a data protection impact assessment for the pipeline once the staging environment is ready.', why: 'An assessment at staging is late. Minimization decisions must be made before data is ingested.', axis: 'Assessment after build' },
    { from: 'Authorize the first-line machine learning', to: 'Let the machine learning leads set retention limits by jurisdiction and decide the minimization trade-offs themselves.', why: 'Technical leads understand the data, but legal retention limits and minimization trade-offs need an enterprise rule, not a team decision.', axis: 'Team setting its own limits' },
  ],
  'aaig-pipe-1791944041150-212-airgq': [
    { from: 'Deploy automated synthetic data pipelines', to: 'Retrain the model every month on fresh data and release it under the model release policy.', why: 'Regular retraining may help, but it is not tied to limits that say when degradation is unacceptable.', axis: 'Calendar retraining' },
    { from: 'Immediately decommission', to: 'Take the operational model out of service now and revert credit operations to manual processing.', why: 'Withdrawing the model may be necessary in an emergency, but doing it before the impact on risk limits is assessed is premature.', axis: 'Withdrawal before assessing impact' },
    { from: 'Task the third-line internal audit team', to: 'Ask the audit function to recalibrate the model settings and adjust the drift sensitivity.', why: 'Audit must stay independent, and recalibrating a model is operational work.', axis: 'Audit doing operational work' },
  ],
  'aaig-pipe-1791944099056-220-u236q': [
    { from: 'Procure an automated AI model governance', to: 'Request a yearly report from each business unit on its AI projects, and discuss the reports at a board meeting.', why: 'Yearly reports give visibility, but the board still needs a body with decision rights and risk limits to act on them.', axis: 'Information without a decision body' },
    { from: 'Conduct exhaustive third-party', to: 'Commission outside conformity assessments of the existing vendor models, then draw up the organization\'s AI standards.', why: 'Assessments produce evidence, but doing them before rules and standards exist leaves the board without a basis for what to approve.', axis: 'Assessments before standards' },
    { from: 'Delegate sole oversight', to: 'Leave oversight and risk acceptance with the product owners who run each AI project, and ask for annual confirmation.', why: 'Product owners know their projects, but oversight by those running them has no independent check or enterprise limits.', axis: 'Oversight by those who run the projects' },
  ],
  'aaig-pipe-1791943597832-120-8zzew': [
    { from: 'Implement enterprise-wide algorithmic fairness', to: 'Ask the board to review each AI incident report and agree a response case by case.', why: 'Case-by-case review reacts to incidents, but it does not set who decides or what limits apply in advance.', axis: 'Incident-driven oversight' },
    { from: 'Commission an independent third-party conformity', to: 'Commission an outside review of the AI models and decide on the internal rules once the review is complete.', why: 'A review gives evidence, but doing it before the rules exist means the board has no basis to judge its findings.', axis: 'Review before rules' },
    { from: 'Delegate AI risk appetite thresholds', axis: 'Appetite set by the units' },
  ],
  'aaig-pipe-1791943849647-165-md05v': [
    { from: 'Mandate the enterprise-wide procurement and integration', to: 'Fund a central team to review every AI project against a standard checklist before launch.', why: 'A review team gives consistency, but without limits, accountabilities and strategy set by a governing body the checklist has no authority.', axis: 'Checklist review without a mandate' },
    { from: 'Instruct the internal audit department', to: 'Ask an outside firm to assess all production systems against ISO/IEC 42001 and have each owner follow up its findings.', why: 'A conformity assessment gives a gap list, but rules built only from findings leave out strategy and the board\'s risk limits.', axis: 'Assessment before the mandate' },
    { from: 'Delegate AI governance authority', to: 'Let each division head set its own AI risk limits and approve its models, with a summary sent to the board.', why: 'Divisions know their risks, but separate limits and approvals leave the board without a common view of enterprise risk.', axis: 'Divisional limits and approvals' },
  ],
  'aaig-pipe-1791944097363-222-p23rc': [
    { from: 'Deploying technical continuous monitoring', to: 'Hold a yearly training session on the AI principles for all staff who develop or buy AI systems.', why: 'Training builds understanding, but it adds no checkpoint that can stop a project that breaches the principles.', axis: 'Training instead of a control' },
    { from: 'Scheduling retrospective algorithmic fairness', to: 'Schedule fairness audits of lending models six months after launch to find non-compliant credit decisions.', why: 'An audit six months after launch finds problems late, after customers have been affected.', axis: 'Late audits' },
    { from: 'Allowing first-line project delivery', to: 'Let project delivery teams certify their own compliance with the ethical principles before launch.', why: 'Self-certification has no independent check, and the team has an interest in launching.', axis: 'Self-certification' },
  ],
  'aaig-pipe-1791943823909-162-a11gg': [
    { from: 'Mandate automated continuous integration', to: 'Add bias checks to the standard build process for every AI model so that failing builds cannot be released.', why: 'Build-time checks catch some problems, but they do not set who can approve a use case or the risk limits that apply.', axis: 'Technical checks instead of authority' },
    { from: 'Require independent internal audit teams', to: 'Ask the audit function to review each AI system after it goes live and report weaknesses to the audit committee.', why: 'A review after go-live finds weaknesses late, and audit cannot also be the approver.', axis: 'Post-implementation audit' },
    { from: 'Empower individual business unit owners', to: 'Let each business unit set and approve its own risk thresholds to suit its operations.', why: 'Local thresholds suit local operations, but they differ between units and cannot be enforced as an enterprise limit.', axis: 'Local thresholds' },
  ],
  'aaig-pipe-1791943691011-141-3u1ro': [
    { from: 'Procure an automated model monitoring', to: 'Ask each business unit to describe its planned AI use cases in one page and send them to the director.', why: 'One-page descriptions show plans, but without decision rights and objectives nobody can say which plans fit.', axis: 'Plans collected before decision rights' },
    { from: 'Perform algorithmic impact assessments and bias testing', to: 'Test the candidate third-party models for bias and run impact assessments before choosing among them.', why: 'Testing candidate models is useful, but it comes after the objectives and decision rights are set.', axis: 'Model testing before objectives' },
    { from: 'Authorize business unit managers', to: 'Let business unit managers set risk criteria for their own pilots and start those pilots in their departments.', why: 'Departmental pilots can start quickly, but separate criteria across units leave strategic alignment and decision rights undefined.', axis: 'Departmental pilots with own criteria' },
  ],
  'aaig-pipe-1791943829229-160-0knam': [
    { from: 'Implement automated model telemetry', to: 'Ask management to send the board a monthly summary of model accuracy and fairness results for each machine learning system.', why: 'Performance summaries inform the board, but the board still has no structure or limits through which to direct AI strategy.', axis: 'Performance reporting instead of an oversight structure' },
    { from: 'Conduct comprehensive technical conformity', to: 'Commission technical conformity assessments of the candidate AI products before the board agrees how it will oversee AI.', why: 'Assessments of candidate products produce evidence, but oversight arrangements should not wait for them.', axis: 'Product assessment before oversight' },
    { from: 'Assign independent assurance', to: 'Let the project managers who build generative AI applications give the final compliance sign-off on them.', why: 'Builders signing off their own work removes independent assurance and board-level oversight.', axis: 'Builders signing off their own work' },
  ],
  'aaig-pipe-1791943617917-125-4ch2u': [
    { from: 'Deploy automated algorithmic bias detection', to: 'Ask each function to nominate an AI contact and hold a monthly meeting where the contacts share issues.', why: 'Contacts and meetings share issues, but they have no mandate or decision rights to resolve them.', axis: 'Coordination without a mandate' },
    { from: 'Conduct detailed algorithmic impact assessments and risk scoring', to: 'Score the risk of every planned AI use case before deciding who is accountable for AI at the executive level.', why: 'Risk scoring helps prioritize, but it comes before the accountability structure that must act on the scores.', axis: 'Risk scoring before accountability' },
    { from: 'Assign internal audit the operational authority', to: 'Give the audit function authority to set AI acceptance criteria and approve models before they go live.', why: 'Audit must stay independent, and approving models is a management decision that audit later assures.', axis: 'Audit approving models' },
  ],
  'aaig-pipe-1791943465809-92-22gqd': [
    { from: 'Task the independent internal audit function with daily', to: 'Have the audit function tune the model\'s decision boundaries and drift sensitivity every day.', why: 'Audit must stay independent, and daily tuning is operational work for management.', axis: 'Audit doing operational work' },
    { from: 'Deploy an automated continuous retraining pipeline', to: 'Retrain the model weekly on all the production data collected since the last run, without selecting or cleaning it.', why: 'Retraining on unselected data may build in the degradation, and no limit tells reviewers when to step in.', axis: 'Retraining on uncurated data' },
    { from: 'Execute an immediate production rollback', to: 'Roll the production model back to the previous version now, then investigate the cause.', why: 'A rollback can be a valid response, but as the standing control it ignores the cause and sets no limit that tells when to use it.', axis: 'Rollback as the standing control' },
  ],
  'aaig-pipe-1791943831726-161-nvn8j': [
    { from: 'Deploy an enterprise telemetry', to: 'Appoint a head of AI delivery and ask for a three-year roadmap of AI projects.', why: 'A roadmap sets delivery plans, but objectives, decision rights and acceptable risk have to come first.', axis: 'Roadmap before objectives' },
    { from: 'Perform algorithmic impact assessments and bias audits', to: 'Assess the impact and bias risk of each prospective use case before the organization writes any AI rules.', why: 'Use-case assessments are useful, but they need the objectives and rules that the mandate provides.', axis: 'Use-case assessment before the mandate' },
    { from: 'Delegate authority to individual business unit leaders', to: 'Let each business unit leader approve AI use cases that meet the unit\'s own return targets.', why: 'Local return targets tell little about enterprise risk and strategy, and separate approvals cannot be aligned.', axis: 'Local return targets decide' },
  ],
  'aaig-pipe-1791944001831-201-ggsrx': [
    { from: 'Deploy enterprise model validation tools', to: 'Ask the technology function to select a standard set of model validation methods for all proposed AI applications.', why: 'A standard validation set is useful for engineering, but strategy and acceptable risk must be set first.', axis: 'Technical standards before strategy' },
    { from: 'Conduct comprehensive algorithmic impact assessments and regulatory', axis: 'Use-case reviews before strategy' },
    { from: 'Authorize first-line business unit owners', to: 'Let business units set their own ethical acceptance criteria for the AI applications they plan.', why: 'Local criteria suit functional goals but differ between units, and they do not follow from an enterprise strategy.', axis: 'Local ethical criteria' },
  ],
  'aaig-pipe-1791944097299-221-8325n': [
    { from: 'Procure an enterprise AI safety', to: 'Commission a market study of AI trends in the sector and present the findings to the executive team.', why: 'A market study informs ideas, but it does not align them with strategy or risk limits.', axis: 'Market study before alignment' },
    { from: 'Perform comprehensive algorithmic impact and data protection', axis: 'Use-case assessments before alignment' },
    { from: 'Mandate that internal audit define', to: 'Ask the audit function to define the operational risk thresholds and approve the criteria for AI pilots.', why: 'Audit must stay independent of the decisions it later assures.', axis: 'Audit setting thresholds' },
  ],
  'aaig-pipe-1791943848698-168-f8m5h': [
    { from: 'Immediately retrain the production credit scoring', to: 'Retrain the credit scoring model with oversampling so that approval rates are similar across demographic groups.', why: 'Equalizing approval rates by retraining is a technical fix that is not first checked against the firm\'s limits and legal duties.', axis: 'Technical parity fix' },
    { from: 'Deploy automated continuous retraining pipelines directly', to: 'Set up continuous retraining of the model on recent applications and review the results once a quarter.', why: 'Continuous retraining changes the model constantly, and a quarterly review does not show whether bias limits are breached.', axis: 'Retraining without limits' },
    { from: 'Delegate authority to the independent internal audit team', to: 'Ask the audit function to calibrate the scoring weights and approve exceptions for the affected demographic groups.', why: 'Audit must stay independent, and calibration and exceptions are management decisions.', axis: 'Audit doing management work' },
  ],
  'aaig-pipe-1791944113567-228-dgi7q': [
    { from: 'Optimize the model', to: 'Tune the model to restore its original predictive accuracy and report the accuracy each month.', why: 'Restoring accuracy does not show that fairness metrics are within the firm\'s limits.', axis: 'Accuracy goal' },
    { from: 'Retrain the production model using newly augmented', to: 'Retrain the production model on augmented synthetic samples to counter the shift in the data distribution.', why: 'Retraining before the cause is understood may not address the drift and sets no limit on fairness.', axis: 'Retraining before the cause is known' },
    { from: 'Delegate the determination', to: 'Let the machine learning team decide how much fairness variance is acceptable and where the limits sit.', why: 'The team knows the model, but acceptable variance and limits are set by the governance body, not by the team being monitored.', axis: 'Team setting its own fairness limits' },
  ],
  'aaig-pipe-1791944042203-213-dbyap': [
    { from: 'Mandate maximum mathematical fidelity', axis: 'Fidelity as the objective' },
    { from: 'Procure and implement enterprise-grade', to: 'Buy an explainability product for the production environment and write the explanation rules afterwards.', why: 'A product helps produce explanations, but it should follow the rules on what must be explained to whom.', axis: 'Product before rules' },
    { from: 'Authorize first-line model development teams', axis: 'Teams setting their own trade-offs' },
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
  'aaig-pipe-1791942377513-8': 'Set the risk management approach and challenge how the first line applies it.',
  'aaig-pipe-1791943073272-4-jq50e': 'Letting the model team set its own acceptable demographic disparity limits, based on the model\'s test performance.',
  'aaig-pipe-1791941483700-19': 'Letting the engineering team widen the tolerance band in production while retraining is under way, so the service keeps running without interruption.',
  'aaig-pipe-1791942430355-17': 'Enforce purpose-bound schema checks at the point of ingestion so unneeded features never reach the store.',
  'aaig-pipe-1791941106674-13': 'Set the acceptable limits and require a formal review before any retraining begins on the drifted data.',
  'aaig-pipe-1791941502874-22': 'Link drift alerts to agreed limits so that a breach starts formal validation and a defined chain of decisions.',
  'aaig-pipe-1791941470913-18': 'Making sure explanation capabilities fit who needs them, how large the decision impact is, and what regulation requires.',
  'aaig-pipe-1791941453475-14': 'Letting operations staff summarize or prune inference logs on their own whenever storage runs short on the platform.',
  'aaig-pipe-1791941407823-3': 'Set the criteria and binding contract terms that fix who answers for outcomes, who can audit, and who bears which risk.',
  'aaig-pipe-1791941527214-27': 'Turn MEASURE thresholds into risk treatment plans with second-line sign-off and ongoing residual risk checks.',
  'aaig-pipe-1791943131382-17-7wx7z': 'Set up an enterprise AI structure that defines risk limits and maps AI risks into the enterprise risk categories.',
  'aaig-pipe-1791943089288-7-qyc29': 'Add a mandatory second-line check of purpose and privacy impact before data enters training pipelines.',
  'aaig-pipe-1791942405270-13': 'Set limits and ongoing monitoring that connect shifts in the applicant population to the firm\'s tolerance for harm.',
  'aaig-pipe-1791942450897-22': 'Agree drift limits tied to what the firm can accept, which start predefined review and remediation steps.',
  'aaig-pipe-1791942429985-18': 'To let affected people and oversight functions understand, check and challenge model outputs.',
  'aaig-pipe-1791941180316-32': 'Set review cycles linked to the firm\'s risk limits and give first-line owners explicit compliance duties.',
  'aaig-pipe-1791943163595-28-3f1lb': 'To bring model outputs back in line with the firm\'s risk limits and the fairness criteria its rules set.',
  'aaig-pipe-1791943315649-58-7qd1l': 'Define risk-based due diligence criteria and the contract assurances that show a supplier meets the firm\'s risk limits.',
  'aaig-pipe-1791943198675-33-0tu1t': 'Set explanation requirements by stakeholder need, decision impact and legal duties to inform people.',
  'aaig-pipe-1791941505157-23': 'Make sure the supplier agreement lets the institution inspect the supplier\'s practices, share risk fairly and enforce its rights.',
  'aaig-pipe-1791942379061-5': 'Agree common rules for data provenance and quality, with a named person accountable for each dataset.',
  'aaig-pipe-1791942403792-10': 'Set a multi-criteria evaluation covering strategy, risk appetite, compliance duties and total cost.',
  'aaig-pipe-1791942404379-12': 'Mandate an enterprise AI acceptable use policy and a steering committee approval process for all business units.',
  'aaig-pipe-1791942454013-23': 'Set supplier risk tiers, expectations for transparency and contractual assurance rights that fit the firm\'s appetite for risk.',
  'aaig-pipe-1791942470081-25': 'Agree one set of data quality and provenance criteria with named owners and independent verification.',
  'aaig-pipe-1791943105269-12-9ueky': 'Set predefined performance thresholds that trigger escalation and model fallback procedures when they are crossed.',
  'aaig-pipe-1791943144401-22-8tbz6': 'Set up a committee that enforces gated approvals and maps risks to agreed enterprise tolerances.',
  'aaig-pipe-1791943166460-26-wrliw': 'Define an enterprise AI asset taxonomy and the minimum metadata each entry must have, aligned with risk appetite.',
  'aaig-pipe-1791943170521-27-c05z1': 'Enforce ingestion gating that limits inputs to verified, purpose-bound attributes confirmed through formal impact assessments.',
  'aaig-pipe-1791943088709-8-8nnep': 'Ensure outcomes stay within risk appetite, legal non-discrimination duties and the fairness criteria the firm has set.',
  'aaig-pipe-1791943062361-2-m01ua': 'Issue one AI policy, approved by senior leadership, that sets the principles and says who decides what.',
  'aaig-pipe-1791943222206-37-po9vv': 'Set risk limits for each metric so that crossing a limit starts a defined escalation and risk treatment step.',
  'aaig-pipe-1791943243672-41-65gxx': 'Set up an executive committee to define who decides on AI and link AI initiatives to the firm\'s strategy.',
  'aaig-pipe-1791943238742-43-l38z6': 'Setting risk limits, checking compliance with the AI rules, and giving objective challenge to the teams that run the models.',
  'aaig-pipe-1791943269969-47-mryb2': 'Set up a second-line gating step that requires each feature to be justified and tokenized before data enters the pipeline.',
  'aaig-pipe-1791943199628-31-3294z': 'Agree how value will be measured: common metrics linked to strategic goals, with a named person who decides.',
  'aaig-pipe-1791943294885-53-cjlfm': 'Set explanation requirements for each audience, including the notices that the law requires for adverse decisions.',
  'aaig-pipe-1791943171040-25-5puc0': 'Set up an executive AI committee with defined decision rights and regular reports to the board.',
  'aaig-pipe-1791943294203-50-49u23': 'Compare buying and building on skills, cost over time, explainability and third-party risk against the firm\'s risk limits.',
  'aaig-pipe-1791943382925-72-rsjps': 'Monitor drift against performance limits set by risk level, with escalation and review when a limit is crossed.',
  'aaig-pipe-1791942414357-14': 'Letting the operations team edit or delete inference log entries during incident triage so the records match the final findings.',
  'aaig-pipe-1791943115211-14-nny8a': 'Permitting production support teams to truncate anomalous inference logs when storage runs short.',
  'aaig-pipe-1791943330756-59-in7ze': 'Letting the model operations teams change the thresholds themselves to stop repeated drift alerts from reaching the risk function.',
  'aaig-pipe-1791943346650-64-3nlj2': 'Letting business units waive fairness evaluations when the AI model is bought from a third party instead of built in-house.',
  'aaig-pipe-1791943564576-114-jdy9q': 'Allowing AI engineers to shorten the retention period of audit logs whenever storage capacity runs low on the platform.',
  'aaig-pipe-1791943983566-199-mxwfl': 'Permitting business units to temporarily adjust risk tolerance thresholds when delivery deadlines are tight, as long as the changes are logged.',
  'aaig-pipe-1791943026259-0-006uc': 'Approve a written mandate that sets who decides on AI, who answers for results and how much risk is acceptable.',
  'aaig-pipe-1791943242476-42-b4cm9': 'Turn the AI principles into a policy with mandatory procedures and stage-gate approvals for every business unit.',
  'aaig-pipe-1791943290779-52-tsbao': 'Set predefined degradation limits linked to the firm\'s risk appetite that start a formal model re-evaluation.',
  'aaig-pipe-1791943271485-48-c6uyk': 'Ensure model outcomes remain consistent with the firm\'s non-discrimination policy and with regulatory fairness duties.',
  'aaig-pipe-1791942473141-28': 'Identifying, assessing and managing the operational risks of the AI systems they run, within the limits that leadership has approved.',
  'aaig-pipe-1791943197132-30-yyz23': 'Judge each option against the sourcing policy criteria: strategy, risk added and long-term commitments.',
  'aaig-pipe-1791943237518-40-m0yds': 'Give a standing group of senior leaders clear decision rights over AI and a regular reporting line to the board.',
  'aaig-pipe-1791943386735-73-ro93k': 'Set explainability requirements that fit each stakeholder, the law and the right of affected people to contest decisions.',
  'aaig-pipe-1791943411137-77-o3n8u': 'Set limits on the key metrics so that a breach sends the case to second-line risk review within a set time.',
  'aaig-pipe-1791943405753-78-721my': 'Ensure that the supplier\'s AI risk practices, transparency and controls fit the firm\'s risk limits and legal obligations.',
  'aaig-pipe-1791943428696-83-84pke': 'Set the AI risk rules and policy limits within delegated authority, and challenge the teams that run the models.',
  'aaig-pipe-1791943444776-87-34yu5': 'Require the second line to approve each feature against a stated business need before data is ingested.',
  'aaig-pipe-1791943445534-88-jxmit': 'Keep performance and disparate impact within the limits the firm has approved, through formal review and mitigation steps.',
  'aaig-pipe-1791943645628-131-2yf79': 'Define how value will be judged and how much risk is acceptable, linked to the firm\'s strategic priorities.',
  'aaig-pipe-1791943365683-65-3cvpi': 'Approve a board-level mandate that creates an executive AI committee and sets the risk the firm is willing to accept.',
  'aaig-pipe-1791943426620-81-keney': 'Set the strategic objectives for AI and the limits of acceptable risk, approved by executive leadership.',
  'aaig-pipe-1791943389729-70-17fxn': 'Set criteria by risk tier covering compliance duties, lifetime cost and vendor lock-in risk.',
  'aaig-pipe-1791943495559-97-m8kn4': 'Set up an executive AI committee that sets risk limits, names risk owners and requires second-line reviews.',
  'aaig-pipe-1791943537900-108-aanfq': 'Set drift limits that link to the firm\'s approved fairness criteria and start a review when they are crossed.',
  'aaig-pipe-1791943556657-113-zrxeu': 'Set interpretability rules and oversight checks that meet regulatory duties and the firm\'s appetite for risk.',
  'aaig-pipe-1791943619721-127-i8i43': 'Admit a feature only after its need is justified and its data is pseudonymized, per committee rules.',
  'aaig-pipe-1791943648083-132-a8ehk': 'Set performance bands with predefined thresholds that trigger retraining or escalation.',
  'aaig-pipe-1791943931121-186-4ck0r': 'Agree what counts as an AI asset, which systems are in scope, and who keeps each entry up to date.',
  'aaig-pipe-1791943895020-178-cpb1m': 'Ensure third-party AI risks are identified, assessed and managed within the firm\'s risk limits and legal duties.',
  'aaig-pipe-1791943269040-45-lpuih': 'Appoint an accountable executive for AI and have the board approve the limits for management.',
  'aaig-pipe-1791943518869-101-61lzd': 'Agree the AI principles and how AI work will be approved, in line with the firm\'s strategy and risk limits.',
  'aaig-pipe-1791943515176-102-okmhl': 'Publish enterprise rules for AI, with binding principles, named roles and risk limits, signed off by leadership.',
  'aaig-pipe-1791943759533-157-mrv74': 'Link MEASURE results to MANAGE actions through set feedback loops overseen by a central committee.',
  'aaig-pipe-1791943737090-153-3s2x0': 'Match the depth of explanation to the stakeholder and to how much harm a wrong decision could cause.',
  'aaig-pipe-1791943885266-177-6c8rd': 'Build context-of-use categories into model onboarding gates and link MAP records to GOVERN limits.',
  'aaig-pipe-1791943700289-142-t6qml': 'Bring the inconsistent departmental practices under common binding rules with a named leadership approver.',
  'aaig-pipe-1791943732362-150-ey9df': 'Weigh buying against building on risk, total cost and regulatory requirements before any procurement terms are agreed.',
  'aaig-pipe-1791943598252-121-nry2o': 'Set the enterprise AI strategy and the amount of risk the governing body will accept.',
  'aaig-pipe-1791943914843-181-pmvpd': 'Agree the objectives AI must serve and write the firm\'s appetite for AI risk into its governance.',
  'aaig-pipe-1791943034620-1-q7092': 'Define the AI strategic objectives and who has the authority to approve AI work, within agreed risk limits.',
  'aaig-pipe-1791943467675-90-it88i': 'Judge buying and building on risk class, lifetime cost and the assurance the supplier will keep providing.',
  'aaig-pipe-1791943564664-110-4uy56': 'Compare build and buy on model transparency, IP rights and ongoing assurance duties.',
  'aaig-pipe-1791943914843-183-kyc4x': 'Set the AI risk rules and limits for management to work within, and give credible, objective challenge to how they are applied.',
  'aaig-pipe-1791943647350-133-4g5z3': 'Define explainability requirements for each stakeholder that fit regulatory mandates and the business context.',
  'aaig-pipe-1791943950598-192-9ij22': 'Set preset performance limits that switch to an approved backup model and start incident escalation.',
  'aaig-pipe-1791943988538-197-p3hhf': 'Set enterprise risk limits, assign decision rights and require feedback loops to the AI oversight committee.',
  'aaig-pipe-1791943982220-198-6afbl': 'Ensure that responsibility for risk and the supplier\'s transparency duties are set out in the contract.',
  'aaig-pipe-1791943958027-190-xf2br': 'Use set evaluation criteria that cover strategic fit, cost over time, risk and third-party assurance needs.',
  'aaig-pipe-1791943650497-130-94yh2': 'Weigh the options on risk, lifetime oversight effort and regulator expectations on transparency.',
  'aaig-pipe-1791943869015-170-3r2zz': 'Evaluate each supplier on model transparency, supply chain provenance and fit with the firm\'s risk limits.',
  'aaig-pipe-1791944022162-207-p53nt': 'Limit model data to validated, purpose-bound features through a mandatory architecture gate.',
  'aaig-pipe-1791944117191-227-p3ddh': 'Require a written purpose for each data use, with filtering and tokenization applied before data is ingested.',
  'aaig-pipe-1791944041150-212-airgq': 'Agree performance bands in advance, with a remediation plan and escalation route on breach.',
  'aaig-pipe-1791944099056-220-u236q': 'Establish an executive AI group to set risk limits and approve AI rules, with decision rights assigned to it.',
  'aaig-pipe-1791943597832-120-8zzew': 'Form a cross-functional group that decides who may approve AI use and reports on AI risk to the board.',
  'aaig-pipe-1791943849647-165-md05v': 'Set up a cross-functional AI committee that sets the risk limits, assigns accountabilities and ties AI to strategy.',
  'aaig-pipe-1791944097363-222-p23rc': 'Build mandatory ethical checkpoints and stage-gate approvals into the procedures for developing systems.',
  'aaig-pipe-1791943823909-162-a11gg': 'Give one committee the authority to approve AI at each stage gate and to enforce set risk limits.',
  'aaig-pipe-1791943691011-141-3u1ro': 'Write down who decides on AI, the strategic objectives it serves and how much risk is acceptable.',
  'aaig-pipe-1791943829229-160-0knam': 'Create a committee, mandated by the board, that sets AI risk limits and decides who approves AI uses.',
  'aaig-pipe-1791943617917-125-4ch2u': 'Put in place an executive AI committee with a written mandate and clear decision rights across functions.',
  'aaig-pipe-1791943465809-92-22gqd': 'Monitor performance against predefined limits that trigger human review and fallback procedures.',
  'aaig-pipe-1791943831726-161-nvn8j': 'Approve a mandate for AI that states the objectives, who decides, and how much risk is accepted.',
  'aaig-pipe-1791944001831-201-ggsrx': 'Formulate an AI strategy and a statement of acceptable risk, approved by executive leadership and the governing body.',
  'aaig-pipe-1791944097299-221-8325n': 'Establish an executive body that weighs each AI opportunity and its constraints against strategy and risk limits.',
  'aaig-pipe-1791943848698-168-f8m5h': 'Ensure the model\'s changed risk profile is checked against the firm\'s limits to see whether they are breached.',
  'aaig-pipe-1791944113567-228-dgi7q': 'Make sure monitoring ties performance and fairness metrics to the firm\'s and regulators\' limits.',
  'aaig-pipe-1791944042203-213-dbyap': 'Define explainability rules by risk tier, with minimum transparency levels that match regulatory impact and stakeholder needs.',
};

/**
 * 2026-10-24 review outcome: for these items the reviewer asked for the main
 * explanation to use the same plainer wording as the new correct option. Meaning,
 * framework citations and reasoning are unchanged; the exam terms (risk appetite,
 * decision rights) stay in brackets so the plain wording maps back to them.
 */
export const EXPLANATION_REWRITES: Readonly<Record<string, string>> = {
  'aaig-pipe-1791941016903-0': 'From an ISACA governance perspective and per ISO/IEC 42001 Clause 5 and NIST AI RMF (GOVERN 1.1, 1.2), governance begins with top-down leadership and oversight. A board-approved AI committee with named executive responsibility, authority to decide and agreed risk limits (that is, explicit accountability, decision rights and alignment with the organization\'s risk appetite) is the foundational and most comprehensive governance action the board can take.',
  'aaig-pipe-1791943341335-60-xaq5w': 'Creating a cross-functional AI committee with a mandate to set enterprise AI rules, risk limits and who decides what (that is, enterprise policy, risk appetite and decision rights) represents the foundational top-down governance action required by frameworks like ISO/IEC 42001 (Clause 5) and NIST AI RMF (GOVERN 1.1 and 1.2). Governance requires formal accountability structures that align AI initiatives with the organization\'s risk limits before technical controls or decentralized mechanisms can be effectively maintained.',
  'aaig-pipe-1791943535745-105-0p7tf': 'According to ISO/IEC 42001 (Clause 5 - Leadership) and the NIST AI Risk Management Framework (GOVERN 1.1 & 1.2), effective AI governance requires a top-down mandate where executive leadership and the governing body establish clear decision rights, risk tolerances, and cross-functional structures (such as a board-approved AI committee with a defined mandate). Establishing accountability mechanisms and integrating legal, risk, compliance, and technical domains must precede technical implementations.',
  'aaig-pipe-1791943718126-145-870vw': 'According to ISO/IEC 42001 (Clause 5: Leadership) and NIST AI RMF (GOVERN 1.1, 1.2), effective AI enterprise governance requires top-down leadership, formal oversight structures, and defined decision rights. A cross-functional AI committee mandated by the board, which sets risk appetite, approves enterprise rules and assigns who decides, ensures that risk appetite, enterprise-wide policy, and Three Lines Model accountability are institutionalized before technical or operational deployment scales.',
  'aaig-pipe-1791943347849-61-aq1v4': 'According to ISO/IEC 42001 (Clauses 5.1–5.3) and NIST AI RMF (GOVERN 1.1 and 1.2), the foundational first step in AI enterprise governance is establishing top-down leadership: a board-backed mandate and a cross-functional committee. This mechanism defines strategic objectives, organizational risk appetite, accountability, and who decides (decision rights) before tools are acquired or use cases are advanced.',
  'aaig-pipe-1791943864279-171-tsv4n': 'In ISACA governance frameworks and ISO/IEC 42001 (Clause 6.2), the foundational initial step in value realization and investment governance is establishing top-down criteria, strategic alignment objectives, and formal gating thresholds in an approved enterprise mandate. Defining what constitutes value, how it aligns with corporate strategy, and the stage-gate rules for investment approval precedes operational baseline measurements, telemetry deployment, and independent assurance.',
  'aaig-pipe-1791941200295-36': 'According to ISACA AI governance principles and standards such as ISO/IEC 42001 (Clause 5.1) and NIST AI RMF (GOVERN 1.1, 1.2), the foundational initial step in AI enterprise governance is a board-approved statement of strategic intent, accountability and the limits of acceptable AI risk. It sets the enterprise strategic objectives, establishes organizational decision rights and accountability, and defines risk appetite boundaries before operationalizing or acquiring AI systems.',
  'aaig-pipe-1791941406549-0': 'According to ISO/IEC 42001 (Clauses 5.1 and 5.3) and NIST AI RMF (GOVERN 1.1 and 1.2), effective AI governance requires leadership commitment, clear organizational roles, and top-down oversight. A cross-functional AI committee mandated directly by the board ensures that accountability, policy frameworks, and the limits of acceptable risk (risk appetite alignment) are established across business, legal, compliance, and technical domains before deployment.',
  'aaig-pipe-1791941470950-16': 'According to ISACA governance principles, ISO/IEC 42001 (Clause 5: Leadership), and NIST AI RMF (GOVERN 1.1, 1.2), establishing top-down accountability and strategic direction is the foundational first step. Forming a cross-functional executive AI committee with a clear mandate ensures that organizational roles, decision rights, risk appetite, and strategic objectives are defined before technical implementation or model-specific assessments take place.',
  'aaig-pipe-1791941501443-20': 'According to NIST AI RMF (GOVERN 1.1, 1.2) and ISO/IEC 42001 (Clause 5), sound governance begins with top-down accountability. A cross-functional AI committee mandated by the board establishes the necessary leadership mandate, sets risk limits (risk appetite), defines decision authority, and issues enterprise rules (policies) that guide all subsequent operational activities.',
  'aaig-pipe-1791941180316-32': 'In accordance with ISO/IEC 42001 (Clause 5.2 and 6.2) and NIST AI RMF (GOVERN 1.1, 1.2), an AI policy is only effective and enforceable when it directly maps to the organization\'s risk limits (risk appetite), incorporates periodic review cycles to address emerging AI risks, and clearly assigns compliance duties to first-line operational owners. Top-down governance establishes decision rights and enforceability before technical execution.',
  'aaig-pipe-1791942379061-5': 'According to ISO/IEC 42001 (Clause 6 and Annex B.7) and NIST AI RMF (GOVERN 1.2), effective AI governance requires a top-down mandate. The BEST approach is to agree common rules for data provenance and quality, with a named person accountable for each dataset (that is, enterprise data standards, decision rights and risk ownership aligned with risk appetite), before buying tools or carrying out ad-hoc clean-ups.',
  'aaig-pipe-1791942404379-12': 'In accordance with ISO/IEC 42001 (Clause 5 and 6) and NIST AI RMF (GOVERN 1.1 and 1.2), effective AI governance requires top-down foundational controls: an enterprise-wide AI acceptable use policy and an approval process run by a central cross-functional committee. This ensures that risk appetite, ethical boundaries and clear decision rights are set before systems are onboarded, giving consistent accountability across every business unit.',
  'aaig-pipe-1791943144401-22-8tbz6': 'A central cross-functional committee that enforces gated approvals and maps risks to agreed enterprise tolerances is the most effective governance control. Aligned with ISO/IEC 42001 (Clause 5 - Leadership) and NIST AI RMF (GOVERN 1.1 and 1.2), this top-down mechanism (clear decision rights and stage-gate approvals) ensures accountability, unifies decentralized business units, and enforces adherence to enterprise risk appetite and policies before systems are deployed.',
  'aaig-pipe-1791943062361-2-m01ua': 'Issuing one enterprise AI policy approved by senior leadership is the foundational governance mechanism to align decentralized AI activities with enterprise strategy and risk appetite. Under ISO/IEC 42001 (Clause 5.2) and NIST AI RMF (GOVERN 1.1, 1.2), top-down governance must set the principles and say who decides what (decision rights and accountability) before standardized operational procedures and technical controls can be effectively deployed.',
  'aaig-pipe-1791943243672-41-65gxx': 'According to ISO/IEC 42001 (Clauses 5.1 and 5.2) and NIST AI RMF (GOVERN 1.1 and 1.2), setting up an executive committee with a written mandate is the foundational first step. It defines who decides on AI and links AI initiatives to the firm\'s strategy, ensuring executive accountability, cross-functional oversight and alignment with enterprise risk appetite before technical deployment or operational evaluations occur.',
  'aaig-pipe-1791943171040-25-5puc0': 'Setting up an executive AI committee with explicit decision rights and regular reports to the board, within the board-approved risk appetite, is the foundational top-down governance requirement under ISO/IEC 42001 (Clause 5: Leadership) and NIST AI RMF (GOVERN 1.1 & 1.2). Governance begins with structures, accountability, and strategic alignment at the governing body level before lower-level controls or tools can be meaningfully evaluated.',
  'aaig-pipe-1791943026259-0-006uc': 'According to ISO/IEC 42001 (Clause 5: Leadership) and NIST AI RMF (GOVERN 1.1 and 1.2), approving a written mandate that sets who decides on AI, who answers for results and how much risk is acceptable (that is, decision rights, accountability and risk tolerance) is the foundational prerequisite before deploying technical controls or operational frameworks.',
  'aaig-pipe-1791943242476-42-b4cm9': 'According to ISO/IEC 42001 (Clause 5.2 and 6.2) and NIST AI RMF (GOVERN 1.1 and 1.2), high-level ethical principles must be put into practice through an enterprise-wide AI policy with mandatory procedures. Turning organizational values into binding requirements, baseline controls, and lifecycle stage-gate approvals ensures consistent, accountable execution across all lines of business.',
  'aaig-pipe-1791943237518-40-m0yds': 'According to ISO/IEC 42001 (Clause 5: Leadership) and NIST AI RMF GOVERN 1.1 and 1.2, top-level AI governance requires formal leadership structures, clearly delineated roles, explicit decision rights, and alignment with enterprise risk tolerances. Giving a standing cross-functional group of senior leaders clear decision rights over AI, with a regular reporting line to the board, provides the top-down organizational mandate and oversight necessary to bridge business strategy, technical execution, and risk management.',
  'aaig-pipe-1791943386735-73-ro93k': 'From an ISACA governance perspective, explainability is not a one-size-fits-all technical metric, but a risk-based capability tailored to context and audience. The primary governance objective of the AI governance committee under frameworks like NIST AI RMF (GOVERN 1.2, MEASURE 2.8) and ISO/IEC 42001 is to set explainability requirements that fit each stakeholder (e.g., consumers, regulators, operational underwriters), the law (such as the right to explanation/contestability under the EU AI Act) and the firm\'s risk appetite.',
  'aaig-pipe-1791943428696-83-84pke': 'In the IIA Three Lines Model (2020), both first- and second-line roles belong to management. The second line (e.g., Enterprise Risk Management, AI Compliance) sets the AI risk rules and policy limits (risk management frameworks and policy guardrails) under delegated authority, while providing continuous monitoring and objective challenge to the first-line teams that run the models. First-line roles retain direct operational and risk ownership, and the third line (Internal Audit) provides independent assurance to the governing body.',
  'aaig-pipe-1791943365683-65-3cvpi': 'Effective board oversight begins with top-down governance: the board approves a mandate that creates an executive AI committee with formal decision rights and sets how much AI risk the firm is willing to accept (the enterprise risk appetite statement). This aligns with ISO/IEC 42001 Clause 5 (Leadership) and NIST AI RMF GOVERN 1.1 and 1.2, which mandate that organizational leadership establish clear accountability, policies, and risk tolerance before deployment.',
  'aaig-pipe-1791943426620-81-keney': 'In accordance with ISACA governance principles, ISO/IEC 42001 (Clause 5 and 6), and NIST AI RMF (GOVERN 1.1 and 1.2), governance must follow a top-down mandate. Before selecting technical tooling, classifying individual systems, or running pilots, executive leadership must first set the strategic objectives for AI and the limits of acceptable risk (the risk appetite boundaries). This ensures all downstream governance activities, risk tolerances, and resource allocations align directly with organizational mission and board expectations.',
  'aaig-pipe-1791943495559-97-m8kn4': 'According to the NIST AI RMF (GOVERN function) and ISO/IEC 42001 Clause 5, effective governance originates at the top. Setting up an executive AI committee that sets risk limits (the enterprise risk appetite), names first-line risk owners and requires second-line reviews directly operationalizes GOVERN 1.1, 1.2, and 2.1, ensuring cross-functional accountability rather than isolated technical fixes.',
  'aaig-pipe-1791943556657-113-zrxeu': 'At the director level, the primary responsibility of an enterprise AI governance committee is to govern by mandate, policy, and risk appetite. Under ISO/IEC 42001 (Clauses 5 and 6) and NIST AI RMF (GOVERN 1.2, MEASURE 2.8), the committee sets interpretability rules (enterprise requirements and minimum acceptable thresholds for explainability) and oversight checks tailored to context and stakeholder needs, meeting regulatory duties and the firm\'s appetite for risk, before technical execution can be properly directed or evaluated.',
  'aaig-pipe-1791943269040-45-lpuih': 'According to ISO/IEC 42001 (Clause 5) and NIST AI RMF (GOVERN 1.1, 1.2), establishing top-down governance requires leadership commitment through formal structures, defined risk appetite, explicit decision rights, and cross-functional oversight. Appointing an accountable executive for AI and having the board approve the limits for management ensures strategic alignment, assigns clear executive accountability, and provides the foundation for all operational and compliance controls.',
  'aaig-pipe-1791943759533-157-mrv74': 'From an ISACA AI governance perspective and NIST AI RMF guidance, the GOVERN function is the foundational core that orchestrates MAP, MEASURE, and MANAGE. Having a central AI governance committee set risk tolerance (GOVERN 1.2) and oversee set feedback loops that link MEASURE results to MANAGE actions (MANAGE 1.1, 1.3) ensures that technical evaluations directly trigger accountable, enterprise-aligned mitigations rather than operating as isolated technical exercises.',
  'aaig-pipe-1791943737090-153-3s2x0': 'From an enterprise governance perspective (e.g., NIST AI RMF GOVERN 1.2 and MEASURE 2.8, ISO/IEC 42001 Annex A.8), the primary objective of XAI is not merely technical transparency, but matching the depth of explanation to the stakeholder (e.g., regulators, underwriters, impacted consumers) and to how much harm a wrong decision could cause, within the bounds of enterprise risk appetite and formal decision rights. Different stakeholders require fundamentally different levels and formats of explanation to support accountability.',
  'aaig-pipe-1791943700289-142-t6qml': 'According to ISO/IEC 42001 (Clauses 5.1, 5.2) and NIST AI RMF (GOVERN 1.1, 1.2), effective governance requires top-down leadership commitment, shown in one enterprise-wide AI policy with common binding rules and a named leadership approver. This sets authoritative AI principles, aligns with organizational risk tolerance, defines clear decision rights across the Three Lines Model, and eliminates fragmented, departmental guidelines.',
  'aaig-pipe-1791943732362-150-ey9df': 'Weighing buying against building on enterprise risk (risk appetite), total cost of ownership (TCO), and legal/regulatory compliance before any procurement terms are agreed aligns directly with ISO/IEC 42001 and NIST AI RMF (GOVERN). A complete governance evaluation for buy-versus-build decisions must balance strategic alignment, risk exposure (such as vendor lock-in, intellectual property rights, and third-party risk), and long-term maintenance costs against organizational tolerance before committing to an architecture.',
  'aaig-pipe-1791943034620-1-q7092': 'According to ISO/IEC 42001 (Clause 5.1/6.2) and NIST AI RMF (GOVERN 1.1, 1.2), top-down governance means first defining the AI strategic objectives and who has the authority to approve AI work (decision rights), within agreed risk limits (risk appetite), aligned with organizational strategy. Operational, technical, or assessment activities cannot be effectively executed without a clear governance mandate and enterprise risk boundaries.',
  'aaig-pipe-1791943988538-197-p3hhf': 'Under the NIST AI RMF 1.0, the GOVERN function provides the foundational top-down structure that enables and integrates MAP, MEASURE, and MANAGE functions across an enterprise. Setting enterprise risk limits (risk tolerance), assigning cross-functional decision rights and accountability (involving risk, legal, compliance, and business units), and requiring feedback loops to the AI oversight committee represents the most effective strategic control to remediate siloed, ad-hoc risk management.'
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
    explanation: EXPLANATION_REWRITES[question.id] ?? question.explanation,
    options,
    distractorExplanations: edited.map(({ index, edit }, i) =>
      edit.why ? `${'ABCD'[index]}: ${edit.why}` : question.distractorExplanations![i]),
    distractorAxes: edited.map(({ edit }) => edit.axis),
  };
}
