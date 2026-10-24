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
