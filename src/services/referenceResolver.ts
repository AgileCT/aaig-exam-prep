export interface ResolvedReference {
  label: string;
  url: string;
  category: 'ISO' | 'NIST' | 'EU_AI_ACT' | 'COBIT' | 'OECD' | 'IIA' | 'GDPR' | 'ARXIV' | 'OTHER';
}

const KNOWN_DIRECT_LINKS: { pattern: RegExp; url: string; label: string; category: ResolvedReference['category'] }[] = [
  {
    pattern: /ISO\/IEC\s*42001/i,
    url: 'https://www.iso.org/standard/81230.html',
    label: 'ISO/IEC 42001:2023 (AIMS)',
    category: 'ISO',
  },
  {
    pattern: /ISO\/IEC\s*23894/i,
    url: 'https://www.iso.org/standard/77304.html',
    label: 'ISO/IEC 23894:2023 (AI Risk Management)',
    category: 'ISO',
  },
  {
    pattern: /NIST\s*AI\s*RMF/i,
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    label: 'NIST AI RMF 1.0',
    category: 'NIST',
  },
  {
    pattern: /NIST\s*AI\s*600-1/i,
    url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence',
    label: 'NIST AI 600-1 (Generative AI Profile)',
    category: 'NIST',
  },
  {
    pattern: /EU\s*AI\s*Act|Regulation\s*\(EU\)\s*2024\/1689/i,
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
    label: 'EU AI Act (Regulation 2024/1689)',
    category: 'EU_AI_ACT',
  },
  {
    pattern: /COBIT\s*2019/i,
    url: 'https://www.isaca.org/resources/cobit',
    label: 'COBIT 2019 Framework',
    category: 'COBIT',
  },
  {
    pattern: /Three\s*Lines\s*Model/i,
    url: 'https://www.theiia.org/en/content/position-papers/2020/the-iia-three-lines-model/',
    label: 'IIA Three Lines Model (2020)',
    category: 'IIA',
  },
  {
    pattern: /OECD\s*AI/i,
    url: 'https://oecd.ai/en/ai-principles',
    label: 'OECD AI Principles (2024)',
    category: 'OECD',
  },
  {
    pattern: /GDPR/i,
    url: 'https://gdpr-info.eu/',
    label: 'EU GDPR Reference',
    category: 'GDPR',
  },
  {
    pattern: /arXiv:1810\.03993/i,
    url: 'https://arxiv.org/abs/1810.03993',
    label: 'Model Cards Paper (arXiv:1810.03993)',
    category: 'ARXIV',
  },
  {
    pattern: /arXiv:2305\.17493/i,
    url: 'https://arxiv.org/abs/2305.17493',
    label: 'Model Collapse Research (arXiv:2305.17493)',
    category: 'ARXIV',
  },
];

export function resolveReferences(sourceText: string, explicitUrl?: string): ResolvedReference[] {
  if (!sourceText && !explicitUrl) return [];

  const results: ResolvedReference[] = [];
  const seenUrls = new Set<string>();

  if (explicitUrl) {
    results.push({
      label: 'Verified Primary Source',
      url: explicitUrl,
      category: 'OTHER',
    });
    seenUrls.add(explicitUrl);
  }

  for (const entry of KNOWN_DIRECT_LINKS) {
    if (entry.pattern.test(sourceText) && !seenUrls.has(entry.url)) {
      results.push({
        label: entry.label,
        url: entry.url,
        category: entry.category,
      });
      seenUrls.add(entry.url);
    }
  }

  return results;
}
