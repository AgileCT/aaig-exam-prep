import assert from 'node:assert/strict';
import { test } from 'node:test';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../src/App';
import { QuestionGeneratorModal } from '../src/components/QuestionGeneratorModal';
import { setupDom } from './dom';

test('failed API key clearing keeps the active key and displays the storage error', async t => {
  const cleanup = setupDom();
  localStorage.setItem('aaig_gemini_api_key', 'remembered-fixture-key');
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  t.after(async () => { await act(() => root.unmount()); cleanup(); });
  await act(() => root.render(<App />));
  const settings = container.querySelector<HTMLButtonElement>('button[aria-label="Configure AI API Key"]')!;
  await act(() => settings.click());
  t.mock.method(Object.getPrototypeOf(localStorage), 'removeItem', () => { throw new Error('Storage denied'); });
  const clear = [...container.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent === 'Clear Key')!;
  await act(() => clear.click());
  assert.match(container.querySelector('[role="alert"]')?.textContent || '', /could not be cleared/);
  assert.ok([...container.querySelectorAll('button')].some(button => button.textContent === 'Clear Key'));
  assert.match(settings.textContent || '', /Key Saved/);
  assert.equal(localStorage.getItem('aaig_gemini_api_key'), 'remembered-fixture-key');
});

test('changing the authoring API key cancels the old request and releases generation controls', async t => {
  const cleanup = setupDom();
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  let signal: AbortSignal | undefined;
  t.mock.method(globalThis, 'fetch', async (_url: unknown, options?: RequestInit) => new Promise((_resolve, reject) => {
    signal = options?.signal as AbortSignal;
    signal.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')), { once: true });
  }));
  t.after(async () => { await act(() => root.unmount()); cleanup(); });
  const props = { onSaveQuestion: () => {}, onSaveFlashcard: () => {}, onOpenApiKey: () => {} };
  await act(() => root.render(<QuestionGeneratorModal {...props} apiKey="fixture-key" />));
  const generate = () => [...container.querySelectorAll<HTMLButtonElement>('button')]
    .find(button => button.textContent?.includes('Generate Question'));
  await act(() => generate()!.click());
  assert.equal(signal?.aborted, false);
  await act(() => root.render(<QuestionGeneratorModal {...props} apiKey="replacement-fixture-key" />));
  assert.equal(signal?.aborted, true);
  assert.equal(generate()?.disabled, false);
  assert.doesNotMatch(container.textContent || '', /Add to My Question Bank/);
});
