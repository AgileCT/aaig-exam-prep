import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { generateAIText, defaultAIConfig, validateAIConfig } from '../src/services/ai';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

for (const provider of ['gemini', 'openai', 'anthropic', 'compatible'] as const) {
  test(`${provider} routes a snapshot with safe headers and extracts text`, async () => {
    const config = { ...defaultAIConfig(provider), model: 'fixture-model', apiKey: 'secret-fixture', ...(provider === 'compatible' ? { baseUrl: 'https://example.com/v1' } : {}) };
    globalThis.fetch = async (url, init) => {
      assert.equal(String(url).includes(config.apiKey), false);
      assert.equal(init?.redirect, 'error');
      assert.equal(init?.credentials, 'omit');
      const headers = new Headers(init?.headers);
      assert.equal(headers.get(provider === 'gemini' ? 'x-goog-api-key' : provider === 'anthropic' ? 'x-api-key' : 'authorization'), provider === 'openai' || provider === 'compatible' ? 'Bearer secret-fixture' : 'secret-fixture');
      const body = JSON.parse(String(init?.body));
      assert.equal(body.model || decodeURIComponent(String(url).split('/models/')[1]?.split(':')[0] || ''), config.model);
      assert.match(String(init?.body), /study/);
      assert.equal(String(url), provider === 'gemini' ? 'https://generativelanguage.googleapis.com/v1beta/models/fixture-model:generateContent' : provider === 'anthropic' ? 'https://api.anthropic.com/v1/messages' : provider === 'openai' ? 'https://api.openai.com/v1/chat/completions' : 'https://example.com/v1/chat/completions');
      if (provider === 'openai') { assert.ok(body.max_completion_tokens); assert.equal(body.temperature, undefined); }
      if (provider === 'anthropic') assert.equal(headers.get('anthropic-dangerous-direct-browser-access'), 'true');
      return Response.json(provider === 'gemini' ? { candidates: [{ content: { parts: [{ text: 'reply' }] } }] } : provider === 'anthropic' ? { stop_reason: 'end_turn', content: [{ type: 'text', text: 'reply' }] } : { choices: [{ finish_reason: 'stop', message: { content: 'reply' } }] });
    };
    assert.equal(await generateAIText(config, 'study'), 'reply');
  });
  test(`${provider} rejects errors, malformed and truncated output without exposing key`, async () => {
    const config = { ...defaultAIConfig(provider), model: 'fixture-model', apiKey: 'secret-fixture', baseUrl: 'https://example.com/v1' };
    for (const status of [401, 429]) {
      globalThis.fetch = async () => new Response('secret-fixture', { status });
      await assert.rejects(generateAIText(config, 'study'), error => error instanceof Error && error.message.includes(String(status)) && !error.message.includes(config.apiKey));
    }
    globalThis.fetch = async () => Response.json({});
    await assert.rejects(generateAIText(config, 'study'), /empty|invalid/i);
    globalThis.fetch = async () => new Response('not json');
    await assert.rejects(generateAIText(config, 'study'), /invalid JSON/i);
    globalThis.fetch = async () => Response.json(provider === 'gemini' ? { promptFeedback: { blockReason: 'SAFETY' } } : provider === 'anthropic' ? { stop_reason: 'refusal', content: [] } : { choices: [{ finish_reason: 'content_filter', message: { content: null } }] });
    await assert.rejects(generateAIText(config, 'study'), /blocked/i);
    globalThis.fetch = async () => Response.json(provider === 'gemini' ? { candidates: [{ finishReason: 'MAX_TOKENS' }] } : provider === 'anthropic' ? { stop_reason: 'max_tokens' } : { choices: [{ finish_reason: 'length' }] });
    await assert.rejects(generateAIText(config, 'study'), /truncated/i);
  });
}
test('custom endpoint rejects unsafe or ambiguous URLs', () => {
  for (const baseUrl of ['http://example.com', 'https://user:pass@example.com', 'https://@example.com', 'https://example.com?q=x', 'https://example.com#x', 'https://example.com?', 'https://example.com#']) {
    assert.throws(() => validateAIConfig({ ...defaultAIConfig('compatible'), model: 'fixture', apiKey: 'key', baseUrl }), /HTTPS|endpoint/i);
  }
});

test('malformed Gemini parts are classified as invalid rather than network failure', async () => {
  globalThis.fetch = async () => Response.json({ candidates: [{ content: { parts: { text: 'bad' } } }] });
  await assert.rejects(generateAIText({ ...defaultAIConfig(), apiKey: 'fixture' }, 'study'), error => error instanceof Error && 'kind' in error && error.kind === 'invalid');
});

test('configuration is snapshotted and pre-cancelled calls do not send credentials', async () => {
  const config = { ...defaultAIConfig('openai'), apiKey: 'original' };
  let resolve!: (response: Response) => void;
  globalThis.fetch = async (_url, init) => {
    assert.equal(new Headers(init?.headers).get('authorization'), 'Bearer original');
    return new Promise<Response>(done => { resolve = done; });
  };
  const pending = generateAIText(config, 'study');
  config.apiKey = 'replacement';
  resolve(Response.json({ choices: [{ finish_reason: 'stop', message: { content: 'snapshot response' } }] }));
  assert.equal(await pending, 'snapshot response');
  const controller = new AbortController(); controller.abort();
  globalThis.fetch = async () => { assert.fail('cancelled request must not fetch'); };
  await assert.rejects(generateAIText(config, 'study', { signal: controller.signal }), { name: 'AbortError' });
});

test('default Claude model uses low effort without adding unsupported temperature', async () => {
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    assert.equal(body.model, 'claude-haiku-5-5');
    assert.deepEqual(body.output_config, { effort: 'low' });
    assert.equal(body.temperature, undefined);
    return Response.json({ stop_reason: 'end_turn', content: [{ type: 'text', text: 'Study response' }] });
  };
  assert.equal(await generateAIText({ ...defaultAIConfig('anthropic'), apiKey: 'fixture' }, 'study'), 'Study response');
});

test('provider request timeout and abort are distinct and sanitized', async () => {
  const config = { ...defaultAIConfig('openai'), apiKey: 'fixture-secret' };
  globalThis.fetch = async (_url, init) => new Promise((_resolve, reject) => {
    init!.signal!.addEventListener('abort', () => reject(new DOMException('cancelled', 'AbortError')));
  });
  await assert.rejects(generateAIText(config, 'study', { timeoutMs: 1 }), /timed out/i);
  const controller = new AbortController();
  const pending = generateAIText(config, 'study', { signal: controller.signal });
  controller.abort();
  await assert.rejects(pending, { name: 'AbortError' });
});
