import assert from 'node:assert/strict';
import { test } from 'node:test';
import React, { act } from 'react';
import { setupDom } from './dom';
import { ApiKeyModal } from '../src/components/ApiKeyModal';
import { AITutorModal } from '../src/components/AITutorModal';
import { QuestionGeneratorModal } from '../src/components/QuestionGeneratorModal';
import { AIConfig, defaultAIConfig } from '../src/services/ai';
import { getAIConfig, getAIConfigPreference, saveAIConfig } from '../src/services/storage';

// React's input event support is detected when react-dom first loads.
const cleanupBootstrap = setupDom();
const { createRoot } = await import('react-dom/client');
cleanupBootstrap();

function enter(element: HTMLInputElement, value: string) {
  Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!.call(element, value);
  element.dispatchEvent(new window.Event('input', { bubbles: true }));
}
function click(container: HTMLElement, label: string) {
  const button = [...container.querySelectorAll('button')].find(item => item.textContent?.includes(label));
  assert.ok(button, label); button.click();
}
test('legacy Gemini migration, session default, remember and full clearing', () => {
  const cleanup = setupDom();
  try {
    localStorage.setItem('aaig_gemini_api_key', 'legacy');
    assert.equal(getAIConfig().provider, 'gemini');
    assert.equal(getAIConfig().apiKey, 'legacy');
    const config = { ...defaultAIConfig('openai'), apiKey: 'openai-fixture' };
    saveAIConfig(config);
    assert.deepEqual(getAIConfig(), config);
    assert.equal(getAIConfigPreference(), false);
    assert.equal(localStorage.getItem('aaig_gemini_api_key'), null);
    saveAIConfig(config, true);
    sessionStorage.clear();
    assert.deepEqual(getAIConfig(), config);
    assert.equal(getAIConfigPreference(), true);
    saveAIConfig({ ...config, apiKey: '' });
    assert.equal(getAIConfig().apiKey, '');
    assert.equal(localStorage.length, 0);
    assert.equal(sessionStorage.length, 0);
  } finally { cleanup(); }
});
test('failed migration restores old config and legacy key without retaining new credentials', () => {
  const cleanup = setupDom();
  const originalSession = globalThis.sessionStorage;
  try {
    localStorage.setItem('aaig_gemini_api_key', 'old-key');
    const values = new Map<string, string>();
    let fail = true;
    Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => { if (key === 'aaig_gemini_api_key' && fail) { fail = false; throw new Error('storage disabled'); } values.delete(key); },
    } });
    assert.throws(() => saveAIConfig({ ...defaultAIConfig('openai'), apiKey: 'new-key' }), /not saved/);
    assert.equal(values.has('aaig_ai_config_v1'), false);
    assert.equal(getAIConfig().apiKey, 'old-key');
    assert.equal(getAIConfig().provider, 'gemini');
  } finally { Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, writable: true, value: originalSession }); cleanup(); }
});
test('provider and endpoint changes clear draft key; save and reopen preserve config', async () => {
  const cleanup = setupDom(); const container = document.getElementById('root')!; const root = createRoot(container);
  let saved: AIConfig = { ...defaultAIConfig(), apiKey: 'gemini-fixture' };
  const render = (isOpen = true) => root.render(<ApiKeyModal isOpen={isOpen} aiConfig={saved} onClose={() => {}} onSaveConfig={config => { saveAIConfig(config); saved = config; }} />);
  try {
    await act(() => render());
    await act(() => { const select = container.querySelector<HTMLSelectElement>('#ai-provider')!; select.value = 'compatible'; select.dispatchEvent(new window.Event('change', { bubbles: true })); });
    assert.equal(container.querySelector<HTMLInputElement>('#gemini-key')!.value, '');
    await act(() => { enter(container.querySelector('#ai-endpoint')!, 'https://example.com/v1'); enter(container.querySelector('#ai-model')!, 'custom-model'); });
    assert.equal(container.querySelector<HTMLInputElement>('#ai-endpoint')!.value, 'https://example.com/v1');
    await act(() => enter(container.querySelector('#gemini-key')!, 'custom-fixture'));
    await act(() => enter(container.querySelector('#ai-endpoint')!, 'https://other.example/v1'));
    assert.equal(container.querySelector<HTMLInputElement>('#gemini-key')!.value, '');
    await act(() => enter(container.querySelector('#gemini-key')!, 'custom-fixture'));
    await act(() => click(container, 'Save Configuration'));
    assert.equal(saved.provider, 'compatible');
    assert.equal(saved.baseUrl, 'https://other.example/v1');
    await act(() => render(false)); await act(() => render());
    assert.equal(container.querySelector<HTMLInputElement>('#ai-model')!.value, 'custom-model');
    assert.match(container.textContent || '', /other.example/);
  } finally { await act(() => root.unmount()); cleanup(); }
});
test('Tutor and generator use supplied OpenAI config and cancel when model changes', async () => {
  const originalFetch = globalThis.fetch;
  const cleanup = setupDom(); const container = document.getElementById('root')!; const root = createRoot(container);
  const config = { ...defaultAIConfig('openai'), apiKey: 'openai-fixture' };
  let signal: AbortSignal | undefined;
  globalThis.fetch = async (url, init) => {
    assert.equal(String(url), 'https://api.openai.com/v1/chat/completions');
    assert.equal(JSON.parse(String(init?.body)).model, config.model);
    signal = init?.signal as AbortSignal;
    return new Promise((_resolve, reject) => signal!.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError'))));
  };
  try {
    await act(() => root.render(<QuestionGeneratorModal aiConfig={config} onOpenApiKey={() => {}} onSaveQuestion={() => {}} onSaveFlashcard={() => {}} />));
    await act(() => click(container, 'Generate Question'));
    assert.ok(signal); assert.equal(signal.aborted, false);
    await act(() => root.render(<QuestionGeneratorModal aiConfig={{ ...config, model: 'other-model' }} onOpenApiKey={() => {}} onSaveQuestion={() => {}} onSaveFlashcard={() => {}} />));
    assert.equal(signal.aborted, true);
    signal = undefined;
    await act(() => root.render(<AITutorModal isOpen aiConfig={config} onClose={() => {}} />));
    await act(() => click(container, 'Core Governance Dilemma'));
    assert.ok(signal);
    await act(() => root.render(<AITutorModal isOpen aiConfig={{ ...config, model: 'other-model' }} onClose={() => {}} />));
    assert.equal((signal as AbortSignal).aborted, true);
  } finally { await act(() => root.unmount()); cleanup(); globalThis.fetch = originalFetch; }
});
