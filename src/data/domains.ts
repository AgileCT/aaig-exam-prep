import type { DomainId, DomainMeta, StudyDomainId } from '../types';

// Core-area names follow the public AAIG outline; subtopics and equal practice
// allocations are this app's study design, not official examination weights.
export const STUDY_DOMAIN_IDS: StudyDomainId[] = ['D1', 'D2', 'D3'];
export const AAIG_DOMAINS: Record<StudyDomainId, DomainMeta> = {
  D1: {
    id: 'D1',
    name: 'AI Enterprise Governance',
    weight: 1,
    description: 'Organizational governance structure, AI Steering Committee charters, decision rights, strategic alignment, and ethical principles.',
    subDomains: [
      'D1.1 AI Governance Structure & Board Oversight',
      'D1.2 Strategic Alignment & Business Objectives',
      'D1.3 Policies, Principles, Charters & Procedures',
      'D1.4 Roles, Responsibilities & Three Lines Model',
      'D1.5 Ethical Frameworks & Responsible AI Principles',
      'D1.6 Regulatory Landscapes & Global Compliance (EU AI Act)',
      'D1.7 Standards Implementation (ISO/IEC 42001 AIMS, ISO 23894)',
      'D1.8 Framework Mapping (NIST AI RMF GOVERN/MAP/MEASURE/MANAGE)',
      'D1.9 Risk Appetite, Tolerance & Continuous Oversight'
    ],
  },
  D2: {
    id: 'D2',
    name: 'Data and AI Architecture Principles',
    weight: 1,
    description: 'Data lifecycle governance, enterprise AI asset inventory, Model Cards, algorithmic bias mitigation, and transparency.',
    subDomains: [
      'D2.1 Data Governance & Data Quality for AI',
      'D2.2 Enterprise AI Asset Inventory & Model Cards',
      'D2.3 Privacy by Design & Data Minimization',
      'D2.4 Algorithmic Bias & Representation Drift',
      'D2.5 Provenance, Lineage & Synthetic Data Usage'
    ],
  },
  D3: {
    id: 'D3',
    name: 'AI Enterprise Integration and Performance Monitoring',
    weight: 1,
    description: 'Business case ROI, Buy vs. Build evaluations, model data and concept drift telemetry, explainability (XAI), and continuous auditability.',
    subDomains: [
      'D3.1 Buy vs. Build & Third-Party Sourcing Decisions',
      'D3.2 Business Case, Value Realization & ROI',
      'D3.3 Model Drift, Degradation & Performance KPIs',
      'D3.4 Explainability, Interpretability & Transparency (XAI)',
      'D3.5 Auditability, Logging & Continuous Assurance',
      'D3.6 Third-Party & Supply Chain AI Risk Management'
    ],
  },
};

export function getDomainMeta(domainId: DomainId): DomainMeta {
  return AAIG_DOMAINS[domainId === 'D4' ? 'D1' : domainId];
}
