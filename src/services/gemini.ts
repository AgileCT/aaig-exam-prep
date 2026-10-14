export interface GeminiRequestOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  temperature?: number;
  maxOutputTokens?: number;
  json?: boolean;
}

function extractText(data: unknown): string {
  if (!data || typeof data !== 'object') throw new Error('Gemini returned an invalid response. Please retry.');
  const response = data as Record<string, any>;
  if (response.promptFeedback?.blockReason) {
    throw new Error('Gemini blocked this request. Rephrase your study question without sensitive or protected content.');
  }
  const candidate = response.candidates?.[0];
  if (candidate?.finishReason && !['STOP', 'MAX_TOKENS'].includes(candidate.finishReason)) {
    throw new Error('Gemini blocked or could not complete this response. Try a different study question.');
  }
  if (candidate?.finishReason === 'MAX_TOKENS') {
    throw new Error('Gemini response was truncated. Please retry with a narrower topic.');
  }
  const parts = candidate?.content?.parts;
  if (!Array.isArray(parts) || !parts.length) throw new Error('Gemini returned an empty response. Please retry.');
  const textParts = parts.filter(part => part?.thought !== true);
  if (!textParts.length || textParts.some(part => typeof part?.text !== 'string')) {
    throw new Error('Gemini returned an invalid text response. Please retry.');
  }
  const text = textParts.map(part => part.text).join('\n').trim();
  if (!text) throw new Error('Gemini returned an empty response. Please retry.');
  return text;
}

export async function generateGeminiText(apiKey: string, prompt: string, options: GeminiRequestOptions = {}): Promise<string> {
  if (!apiKey.trim()) throw new Error('Configure your Gemini API key first.');
  const controller = new AbortController();
  let timedOut = false;
  const cancel = () => controller.abort();
  if (options.signal?.aborted) controller.abort();
  options.signal?.addEventListener('abort', cancel, { once: true });
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, options.timeoutMs ?? 30_000);
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey.trim() },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: options.temperature ?? 0.4,
          maxOutputTokens: options.maxOutputTokens ?? 1200,
          ...(options.json ? { responseMimeType: 'application/json' } : {}),
        },
      }),
    });
    if (!response.ok) {
      const action = response.status === 429 ? 'Quota or rate limit reached; check your Google account and try later.'
        : [400, 401, 403].includes(response.status) ? 'Check your API key, API restrictions, and model access.'
        : response.status === 404 ? 'The configured Gemini model is unavailable for this account.'
        : 'Google could not complete the request; try later.';
      throw new Error(`Gemini API error (${response.status}). ${action}`);
    }
    let data: unknown;
    try { data = await response.json(); }
    catch { throw new Error('Gemini returned invalid JSON. Please retry.'); }
    return extractText(data);
  } catch (error) {
    if (timedOut) throw new Error('Gemini request timed out. Please retry.');
    if (controller.signal.aborted) throw new DOMException('Request cancelled.', 'AbortError');
    if (error instanceof TypeError) throw new Error('Cannot reach Gemini. Check your connection and try again.');
    throw error;
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener('abort', cancel);
  }
}
