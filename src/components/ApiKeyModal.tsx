import React, { useEffect, useRef, useState } from 'react';
import { X, Key, ExternalLink, ShieldCheck } from 'lucide-react';
import { getAIConfigPreference } from '../services/storage';
import { AIConfig, AIProvider, aiDestination, defaultAIConfig, PROVIDERS, validateAIConfig } from '../services/ai';
import { useAccessibleDialog } from '../hooks/useAccessibleDialog';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey?: string;
  aiConfig?: AIConfig;
  onSaveKey?: (key: string, remember: boolean) => void;
  onSaveConfig?: (config: AIConfig, remember: boolean) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  aiConfig,
  onSaveKey,
  onSaveConfig,
}) => {
  const active = aiConfig || { ...defaultAIConfig(), apiKey: apiKey || '' };
  const [draft, setDraft] = useState<AIConfig>(active);
  const [remember, setRemember] = useState(getAIConfigPreference);
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setDraft({ ...active });
      setRemember(getAIConfigPreference());
      setError('');
    }
  }, [isOpen, active.apiKey, active.provider, active.model, active.baseUrl]);

  useAccessibleDialog(isOpen, onClose, dialogRef);

  if (!isOpen) return null;

  const handleSave = () => {
    try {
      const config = validateAIConfig(draft);
      if (!config.apiKey) throw new Error('Enter an API key, or use Clear Key to remove the saved configuration.');
      if (onSaveConfig) onSaveConfig(config, remember); else onSaveKey?.(config.apiKey, remember);
      onClose();
    }
    catch (error) { setError(error instanceof Error ? error.message : 'API key could not be saved.'); }
  };

  const handleClear = () => {
    try { if (onSaveConfig) onSaveConfig({ ...active, apiKey: '' }, false); else onSaveKey?.('', false); setDraft({ ...active, apiKey: '' }); setRemember(false); onClose(); }
    catch (error) { setError(error instanceof Error ? error.message : 'API key could not be cleared.'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="api-key-dialog-title" tabIndex={-1} className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <h3 id="api-key-dialog-title" className="font-bold text-base text-slate-900 dark:text-white">
              Configure AI API Key
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close API key settings"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Adding your AI API key enables:
          <br />• 🤖 AI Study Tutor across 4 coaching modes (Socratic, Teach-Back, Drill, Standard).
          <br />• ⚡️ Draft question generation with structure and length checks; content still needs review.
          <br />Choose your provider and use its own API key. Changing provider or endpoint clears the draft key.
        </p>

        <div className="space-y-1.5">
          <label htmlFor="ai-provider" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">AI Provider</label>
          <select id="ai-provider" value={draft.provider} onChange={event => { setDraft(defaultAIConfig(event.target.value as AIProvider)); setError(''); }} className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm">
            {Object.entries(PROVIDERS).map(([id, provider]) => <option key={id} value={id}>{provider.name}</option>)}
          </select>
          {draft.provider === 'compatible' && <>
            <label htmlFor="ai-endpoint" className="block pt-2 text-xs font-semibold">HTTPS Base URL</label>
            <input id="ai-endpoint" type="url" value={draft.baseUrl || ''} onChange={event => { const baseUrl = event.target.value; setDraft(previous => ({ ...previous, baseUrl, apiKey: '' })); }} placeholder="https://your-provider.example/v1" className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm" />
            <p className="text-xs text-slate-500">We append /chat/completions. The endpoint must support browser CORS and this API format. Only enter a destination you trust.</p>
          </>}
          <label htmlFor="ai-model" className="block pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">Model ID</label>
          <input id="ai-model" value={draft.model} onChange={event => { const model = event.target.value; setDraft(previous => ({ ...previous, model })); }} placeholder="Enter a model available to your account" className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm" />
          <label htmlFor="gemini-key" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            API Key
          </label>
          <input
            id="gemini-key"
            type="password"
            autoFocus
            autoComplete="off"
            value={draft.apiKey}
            onChange={event => { const apiKey = event.target.value; setDraft(previous => ({ ...previous, apiKey })); }}
            placeholder="Enter your API key"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white font-mono focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
          <label className="flex items-center gap-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} />
            Remember this key on this device
          </label>
        </div>

        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-[11px] text-indigo-700 dark:text-indigo-300 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
          <span>
            Your key stays in this browser session by default. “Remember” stores it in this browser until you clear it.
            AI requests send your key, study messages, and relevant practice question content directly to {PROVIDERS[draft.provider].name} ({aiDestination(draft)}).
            Provider quota limits and charges may apply. Do not submit personal, confidential, or protected ISACA exam/QAE material.
          </span>
        </div>
        {error && <p role="alert" className="text-xs text-rose-600">{error}</p>}

        <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          {PROVIDERS[draft.provider].keyUrl ? <a
            href={PROVIDERS[draft.provider].keyUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Get API Key <ExternalLink className="w-3 h-3" />
          </a> : <span className="text-xs text-slate-500">Get a key from your endpoint operator.</span>}

          <div className="flex flex-wrap justify-end gap-2">
            {active.apiKey && (
              <button onClick={handleClear} className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50">
                Clear Key
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
