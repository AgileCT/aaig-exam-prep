export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'compatible';
export interface AIConfig { provider: AIProvider; model: string; apiKey: string; baseUrl?: string }
export interface AIRequestOptions { signal?: AbortSignal; timeoutMs?: number; temperature?: number; maxOutputTokens?: number; json?: boolean }
export const PROVIDERS = {
  gemini: { name: 'Google Gemini', model: 'gemini-3.8-flash', keyUrl: 'https://aistudio.google.com/app/apikey' },
  openai: { name: 'OpenAI', model: 'gpt-4.1-mini', keyUrl: 'https://platform.openai.com/api-keys' },
  anthropic: { name: 'Anthropic Claude', model: 'claude-haiku-5-5', keyUrl: 'https://platform.claude.com/settings/keys' },
  compatible: { name: 'OpenAI-compatible endpoint', model: '', keyUrl: '' },
} as const;
export function defaultAIConfig(provider: AIProvider = 'gemini'): AIConfig { return { provider, model: PROVIDERS[provider].model, apiKey: '', ...(provider === 'compatible' ? { baseUrl: '' } : {}) }; }
export function validateAIConfig(input: AIConfig): AIConfig {
  if (!Object.hasOwn(PROVIDERS, input.provider)) throw new Error('Select a supported AI provider.');
  const config: AIConfig = { provider: input.provider, model: input.model.trim(), apiKey: input.apiKey.trim() };
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,199}$/.test(config.model)) throw new Error('Enter a valid model ID.');
  if (input.provider === 'compatible') {
    let url: URL;
    try { url = new URL(input.baseUrl || ''); } catch { throw new Error('Enter a valid HTTPS endpoint base URL.'); }
    if (url.protocol !== 'https:' || url.username || url.password || /[?#]/.test(input.baseUrl || '') || /^https:\/\/[^/]*@/i.test(input.baseUrl || '')) throw new Error('Endpoint must use HTTPS without credentials, query, or fragment.');
    config.baseUrl = url.href.replace(/\/+$/, '');
  }
  return config;
}
export function aiDestination(config: AIConfig): string {
  return config.provider === 'compatible' ? `${config.baseUrl || 'your selected HTTPS endpoint'}/chat/completions` : config.provider === 'gemini' ? 'generativelanguage.googleapis.com' : config.provider === 'openai' ? 'api.openai.com' : 'api.anthropic.com';
}
export class AIRequestError extends Error {
  constructor(public readonly kind: 'invalid' | 'blocked' | 'truncated' | 'http' | 'network' | 'timeout', message: string) { super(message); this.name = 'AIRequestError'; }
}
function extractText(data: unknown, provider: AIProvider): string {
  const invalid = () => new AIRequestError('invalid', 'AI provider returned an empty or invalid text response. Please retry.');
  if (!data || typeof data !== 'object') throw invalid();
  const result = data as Record<string, any>;
  let parts: unknown;
  if (provider === 'gemini') {
    if (result.promptFeedback?.blockReason) throw new AIRequestError('blocked', 'AI provider blocked this request. Rephrase your study question.');
    const candidate = result.candidates?.[0];
    if (candidate?.finishReason === 'MAX_TOKENS') throw new AIRequestError('truncated', 'AI response was truncated. Retry with a narrower topic.');
    if (candidate?.finishReason && candidate.finishReason !== 'STOP') throw new AIRequestError('blocked', 'AI provider blocked or could not complete this response.');
    const candidateParts = candidate?.content?.parts;
    parts = Array.isArray(candidateParts) ? candidateParts.filter((part: any) => part?.thought !== true).map((part: any) => part?.text) : undefined;
  } else if (provider === 'anthropic') {
    if (result.stop_reason === 'max_tokens') throw new AIRequestError('truncated', 'AI response was truncated. Retry with a narrower topic.');
    if (result.stop_reason && result.stop_reason !== 'end_turn') throw new AIRequestError('blocked', 'AI provider blocked or could not complete this response.');
    parts = Array.isArray(result.content) ? result.content.filter((part: any) => part?.type === 'text').map((part: any) => part.text) : undefined;
  } else {
    const choice = result.choices?.[0];
    if (choice?.finish_reason === 'length') throw new AIRequestError('truncated', 'AI response was truncated. Retry with a narrower topic.');
    if (choice?.message?.refusal || (choice?.finish_reason && choice.finish_reason !== 'stop')) throw new AIRequestError('blocked', 'AI provider blocked or could not complete this response.');
    parts = [choice?.message?.content];
  }
  if (!Array.isArray(parts) || !parts.length || parts.some(part => typeof part !== 'string')) throw invalid();
  const text = parts.join('\n').trim();
  if (!text) throw invalid();
  return text;
}
export async function generateAIText(input: AIConfig, prompt: string, options: AIRequestOptions = {}): Promise<string> {
  const config = validateAIConfig({ ...input });
  if (!config.apiKey) throw new Error('Configure your AI API key first.');
  const name = PROVIDERS[config.provider].name;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const tokens = options.maxOutputTokens ?? 1200;
  let url: string;
  let body: unknown;
  const text = options.json ? `${prompt}\nReturn only valid JSON, without Markdown fences.` : prompt;
  if (config.provider === 'gemini') {
    url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent`;
    headers['x-goog-api-key'] = config.apiKey;
    body = { contents: [{ role: 'user', parts: [{ text }] }], generationConfig: { temperature: options.temperature ?? 0.4, maxOutputTokens: tokens, ...(options.json ? { responseMimeType: 'application/json' } : {}) } };
  } else if (config.provider === 'anthropic') {
    url = 'https://api.anthropic.com/v1/messages';
    Object.assign(headers, { 'x-api-key': config.apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' });
    body = { model: config.model, max_tokens: tokens, messages: [{ role: 'user', content: text }], ...(config.model === 'claude-haiku-5-5' ? { output_config: { effort: 'low' } } : {}) };
  } else {
    url = config.provider === 'openai' ? 'https://api.openai.com/v1/chat/completions' : `${config.baseUrl}/chat/completions`;
    headers.Authorization = `Bearer ${config.apiKey}`;
    body = { model: config.model, messages: [{ role: 'user', content: text }], ...(config.provider === 'openai' ? { max_completion_tokens: tokens } : { max_tokens: tokens }) };
  }
  const controller = new AbortController();
  let timedOut = false;
  const cancel = () => controller.abort();
  if (options.signal?.aborted) controller.abort();
  options.signal?.addEventListener('abort', cancel, { once: true });
  const timer = setTimeout(() => { timedOut = true; controller.abort(); }, options.timeoutMs ?? 30_000);
  try {
    if (controller.signal.aborted) throw new DOMException('Request cancelled.', 'AbortError');
    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal: controller.signal, redirect: 'error', credentials: 'omit' });
    if (!response.ok) throw new AIRequestError('http', `${name} API error (${response.status}). ${response.status === 429 ? 'Quota or rate limit reached; check your account and try later.' : [400, 401, 403, 404].includes(response.status) ? 'Check your API key, model access, and endpoint configuration.' : 'Provider could not complete the request; try later.'}`);
    let data: unknown;
    try { data = await response.json(); } catch { throw new AIRequestError('invalid', `${name} returned invalid JSON. Please retry.`); }
    if (controller.signal.aborted) throw new DOMException('Request cancelled.', 'AbortError');
    return extractText(data, config.provider);
  } catch (error) {
    if (timedOut) throw new AIRequestError('timeout', `${name} request timed out. Please retry.`);
    if (controller.signal.aborted) throw new DOMException('Request cancelled.', 'AbortError');
    if (error instanceof TypeError) throw new AIRequestError('network', `Cannot reach ${name}. Check your connection and endpoint browser CORS support. Redirects are not followed.`);
    throw error;
  } finally { clearTimeout(timer); options.signal?.removeEventListener('abort', cancel); }
}
