import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { callAITutor } from '../src/services/tutorPromptPolicy';
import * as storage from '../src/services/storage';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { setupDom } from './dom';
import { QuestionGeneratorModal } from '../src/components/QuestionGeneratorModal';
import { AITutorModal } from '../src/components/AITutorModal';
import { ApiKeyModal } from '../src/components/ApiKeyModal';
import { generateGeminiText } from '../src/services/gemini';
import { isQuestion, parseGeneratedQuestion, parseGeneratedFlashcard, passesLengthGate } from '../src/services/contentValidation';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
    clear: () => values.clear(),
    key: (index: number) => [...values.keys()][index] ?? null,
    get length() { return values.size; },
  };
}

test('Gemini key travels in header, never in request URL', async () => {
  let requestUrl = '';
  let headers: Headers;
  globalThis.fetch = async (url, options) => {
    requestUrl = String(url);
    headers = new Headers(options?.headers);
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Study guidance.' }] } }] }));
  };
  assert.equal(await callAITutor('fixture-key', 'Explain risk ownership', 'standard'), 'Study guidance.');
  assert.equal(new URL(requestUrl).searchParams.has('key'), false);
  assert.equal(headers!.get('x-goog-api-key'), 'fixture-key');
});

test('Tutor rejects non-text model output instead of crashing React rendering', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: { bad: true } }] } }] }));
  await assert.rejects(callAITutor('fixture-key', 'Explain', 'standard'), /invalid|text|response/i);
});

test('Tutor rejects blocked and missing responses with a useful error', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ promptFeedback: { blockReason: 'SAFETY' } }));
  await assert.rejects(callAITutor('fixture-key', 'Explain', 'standard'), /blocked|safety/i);
  globalThis.fetch = async () => new Response(JSON.stringify({ candidates: [] }));
  await assert.rejects(callAITutor('fixture-key', 'Explain', 'standard'), /empty|response/i);
});

test('Non-2xx errors expose actionable status without key or raw provider body', async () => {
  globalThis.fetch = async () => new Response('raw-provider-detail fixture-key', { status: 403 });
  await assert.rejects(callAITutor('fixture-key', 'Explain', 'standard'), error => {
    assert.ok(error instanceof Error);
    assert.match(error.message, /403|permission|key/i);
    assert.doesNotMatch(error.message, /raw-provider-detail|fixture-key/);
    return true;
  });
});

test('API key defaults to session storage and explicit remember preserves legacy preference', () => {
  globalThis.localStorage = memoryStorage();
  globalThis.sessionStorage = memoryStorage();
  storage.saveApiKey(' session-key ', false);
  assert.equal(sessionStorage.getItem('aaig_gemini_api_key'), 'session-key');
  assert.equal(localStorage.getItem('aaig_gemini_api_key'), null);
  storage.saveApiKey('remembered-key', true);
  assert.equal(localStorage.getItem('aaig_gemini_api_key'), 'remembered-key');
  assert.equal(storage.getApiKey(), 'remembered-key');
  assert.equal(storage.getApiKeyPreference(), true);
  storage.saveApiKey('', false);
  assert.equal(storage.getApiKey(), '');
});

test('Malformed legacy custom questions and cards are filtered on load', () => {
  globalThis.localStorage = memoryStorage();
  localStorage.setItem('aaig_custom_questions_v1', JSON.stringify([{ id: 'bad', questionText: { evil: true } }]));
  assert.ok(storage.loadAllQuestions().every(q => q.id !== 'bad'));
  localStorage.setItem('aaig_custom_flashcards_v1', JSON.stringify([{ id: 'bad', domainId: 'D1', topic: 'x', front: 'y' }]));
  assert.ok(storage.loadAllFlashcards().every(card => card.id !== 'bad'));
});

function modelResponse(value: unknown) {
  return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(value) }] } }] }));
}

const completeQuestion = {
  scenarioText: 'An enterprise assigns accountability.', questionText: 'Who owns this risk?',
  options: ['Board role', 'First line', 'Risk team!', 'Audit team'], correctIndex: 1,
  explanation: 'The owner manages the risk.', distractorExplanations: ['Oversight role.', 'Challenge role.', 'Independent assurance.'],
  source: 'Unverified fixture reference', difficulty: 'Intermediate', questionType: 'FIRST',
};

async function inDom(run: (root: ReturnType<typeof createRoot>, container: HTMLElement) => Promise<void>) {
  const cleanup = setupDom();
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  try { await run(root, container); }
  finally { await act(() => root.unmount()); cleanup(); }
}

function button(container: HTMLElement, label: string): HTMLButtonElement {
  const element = [...container.querySelectorAll('button')].find(item => item.textContent?.includes(label));
  assert.ok(element, `Button missing: ${label}`);
  return element;
}

test('Generator blocks both overly long and overly short correct answers', async () => {
  for (const options of [['x'.repeat(100), 'a', 'b', 'c'], ['x', 'a'.repeat(100), 'b'.repeat(100), 'c'.repeat(100)]]) {
    globalThis.fetch = async () => modelResponse({ ...completeQuestion, options, correctIndex: 0 });
    await inDom(async (root, container) => {
      let saves = 0;
      await act(() => root.render(<QuestionGeneratorModal apiKey="fixture-key" onSaveQuestion={() => { saves++; }} onSaveFlashcard={() => {}} onOpenApiKey={() => {}} />));
      await act(async () => button(container, 'Generate Question').click());
      assert.doesNotMatch(container.textContent ?? '', /Passed Quality Gates|Parity Passed/);
      assert.match(container.textContent ?? '', /length.*fail|failed.*length/i);
      const save = [...container.querySelectorAll('button')].find(item => item.textContent?.includes('Add to My Question Bank'));
      if (save) { assert.equal(save.disabled, true); await act(() => save.click()); }
      assert.equal(saves, 0);
    });
  }
});

test('Generator rejects object text and reports schema failure without render crash', async () => {
  globalThis.fetch = async () => modelResponse({ ...completeQuestion, questionText: { invalid: true } });
  await inDom(async (root, container) => {
    await act(() => root.render(<QuestionGeneratorModal apiKey="fixture-key" onSaveQuestion={() => {}} onSaveFlashcard={() => {}} onOpenApiKey={() => {}} />));
    await act(async () => button(container, 'Generate Question').click());
    assert.match(container.textContent ?? '', /schema/i);
    assert.doesNotMatch(container.textContent ?? '', /Passed Quality Gates/);
  });
});

test('Key dialog discloses Google processing and defaults remember to off', async () => {
  await inDom(async (root, container) => {
    await act(() => root.render(<ApiKeyModal isOpen apiKey="" onClose={() => {}} onSaveKey={() => {}} />));
    assert.match(container.textContent ?? '', /Google/);
    assert.match(container.textContent ?? '', /charges|cost|billing/i);
    assert.doesNotMatch(container.textContent ?? '', /never shared or transmitted elsewhere/);
    const remember = container.querySelector<HTMLInputElement>('input[type="checkbox"]');
    assert.ok(remember);
    assert.equal(remember.checked, false);
  });
});

test('Closing tutor aborts request and does not leave loading stuck when reopened', async () => {
  let signal: AbortSignal | undefined;
  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    signal = options?.signal as AbortSignal;
    signal?.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')), { once: true });
  });
  await inDom(async (root, container) => {
    const props = { apiKey: 'fixture-key', onClose: () => {}, isOpen: true };
    await act(() => root.render(<AITutorModal {...props} />));
    await act(() => button(container, 'Core Governance Dilemma').click());
    assert.equal(signal?.aborted, false);
    await act(() => root.render(<AITutorModal {...props} isOpen={false} />));
    assert.equal(signal?.aborted, true);
    await act(() => root.render(<AITutorModal {...props} />));
    assert.doesNotMatch(container.textContent ?? '', /Tutor is formulating response/);
  });
});

test('Gemini request timeout aborts a stalled network request', async () => {
  let signal: AbortSignal | undefined;
  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    signal = options?.signal as AbortSignal;
    signal.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')), { once: true });
  });
  await assert.rejects(generateGeminiText('fixture-key', 'Explain', { timeoutMs: 10 }), /timed out/i);
  assert.equal(signal?.aborted, true);
});

test('Duplicate answer options are rejected including whitespace and case variants', () => {
  const duplicate = { ...completeQuestion, id: 'duplicate', domainId: 'D1', subDomain: 'Risk owner', options: ['Risk owner', ' risk OWNER ', 'Board', 'Audit'] };
  assert.equal(isQuestion(duplicate), false);
  globalThis.localStorage = memoryStorage();
  localStorage.setItem('aaig_custom_questions_v1', JSON.stringify([duplicate]));
  assert.ok(storage.loadAllQuestions().every(question => question.id !== 'duplicate'));
});

test('AI item parsing drops supplied review claims and rejects incomplete flashcards', () => {
  const question = parseGeneratedQuestion(JSON.stringify({ ...completeQuestion, reviewStatus: 'verified', reviewedBy: 'Imaginary expert' }), 'D1', 'Risk owner', 'FIRST', 'Intermediate');
  assert.equal(question.reviewStatus, 'unreviewed');
  assert.equal(question.reviewedBy, undefined);
  assert.equal(passesLengthGate(question), true);
  assert.throws(() => parseGeneratedQuestion(JSON.stringify({ ...completeQuestion, correctIndex: 4 }), 'D1', 'Risk', 'FIRST', 'Intermediate'), /schema/i);
  assert.throws(() => parseGeneratedQuestion('not JSON', 'D1', 'Risk', 'FIRST', 'Intermediate'), /JSON/i);
  assert.throws(() => parseGeneratedFlashcard(JSON.stringify({ topic: 'Risk', front: 'Who owns risk?' }), 'D1'), /schema/i);
});

test('Legacy remembered keys remain available until the user chooses session or clear', () => {
  globalThis.localStorage = memoryStorage();
  globalThis.sessionStorage = memoryStorage();
  localStorage.setItem('aaig_gemini_api_key', 'legacy-key');
  assert.equal(storage.getApiKey(), 'legacy-key');
  assert.equal(storage.getApiKeyPreference(), true);
  storage.saveApiKey('legacy-key', false);
  assert.equal(localStorage.getItem('aaig_gemini_api_key'), null);
  assert.equal(sessionStorage.getItem('aaig_gemini_api_key'), 'legacy-key');
});

test('Generator cancels work when switching authoring type', async () => {
  let signal: AbortSignal | undefined;
  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    signal = options?.signal as AbortSignal;
    signal.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')), { once: true });
  });
  await inDom(async (root, container) => {
    await act(() => root.render(<QuestionGeneratorModal apiKey="fixture-key" onSaveQuestion={() => {}} onSaveFlashcard={() => {}} onOpenApiKey={() => {}} />));
    await act(() => button(container, 'Generate Question').click());
    assert.equal(signal?.aborted, false);
    await act(() => button(container, 'Study Flashcard').click());
    assert.equal(signal?.aborted, true);
    assert.equal(button(container, 'Generate Flashcard').disabled, false);
  });
});

test('Changing tutor API key cancels the prior request and releases loading', async () => {
  let signal: AbortSignal | undefined;
  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    signal = options?.signal as AbortSignal;
    signal.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')), { once: true });
  });
  await inDom(async (root, container) => {
    const props = { apiKey: 'fixture-key', onClose: () => {}, isOpen: true };
    await act(() => root.render(<AITutorModal {...props} />));
    await act(() => button(container, 'Core Governance Dilemma').click());
    await act(() => root.render(<AITutorModal {...props} apiKey="replacement-key" />));
    assert.equal(signal?.aborted, true);
    assert.doesNotMatch(container.textContent ?? '', /Tutor is formulating response/);
  });
});
