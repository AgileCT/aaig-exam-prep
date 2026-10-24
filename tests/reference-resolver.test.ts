import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveReferences } from '../src/services/referenceResolver';

test('resolveReferences maps known standard citations to official URLs', () => {
  const source = 'ISO/IEC 42001:2023 Cl. 5; NIST AI RMF 1.0 GOVERN 1.2; EU AI Act Art. 14';
  const refs = resolveReferences(source);

  assert.equal(refs.length, 3);
  assert.ok(refs.some(r => r.category === 'ISO' && r.url.includes('iso.org')));
  assert.ok(refs.some(r => r.category === 'NIST' && r.url.includes('nist.gov')));
  assert.ok(refs.some(r => r.category === 'EU_AI_ACT' && r.url.includes('eur-lex.europa.eu')));
});

test('resolveReferences includes explicit sourceUrl when supplied', () => {
  const refs = resolveReferences('Custom Enterprise Governance Policy', 'https://governance.example.com/spec');
  assert.equal(refs.length, 1);
  assert.equal(refs[0].url, 'https://governance.example.com/spec');
});

test('resolveReferences returns empty array on empty input', () => {
  assert.deepEqual(resolveReferences(''), []);
});
