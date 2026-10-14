import React, { useEffect, useState } from 'react';
import { X, Key, ExternalLink, ShieldCheck } from 'lucide-react';
import { getApiKeyPreference } from '../services/storage';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string, remember: boolean) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
}) => {
  const [val, setVal] = useState(apiKey);
  const [remember, setRemember] = useState(getApiKeyPreference);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setVal(apiKey);
      setRemember(getApiKeyPreference());
      setError('');
    }
  }, [isOpen, apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    try { onSaveKey(val.trim(), remember); onClose(); }
    catch (error) { setError(error instanceof Error ? error.message : 'API key could not be saved.'); }
  };

  const handleClear = () => {
    try { onSaveKey('', false); setVal(''); setRemember(false); onClose(); }
    catch (error) { setError(error instanceof Error ? error.message : 'API key could not be cleared.'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Configure Gemini API Key
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
          Adding your Google Gemini API Key enables:
          <br />• 🤖 AI Study Tutor across 4 coaching modes (Socratic, Teach-Back, Drill, Standard).
          <br />• ⚡️ Draft question generation with structure and length checks; content still needs review.
        </p>

        <div className="space-y-1.5">
          <label htmlFor="gemini-key" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            API Key
          </label>
          <input
            id="gemini-key"
            type="password"
            autoComplete="off"
            value={val}
            onChange={e => setVal(e.target.value)}
            placeholder="AIzaSy..."
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
            AI requests send your key, study messages, and relevant practice question content directly to Google Gemini.
            Google quota limits and charges may apply. Do not submit personal, confidential, or protected ISACA exam/QAE material.
          </span>
        </div>
        {error && <p role="alert" className="text-xs text-rose-600">{error}</p>}

        <div className="flex items-center justify-between pt-2">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Get Gemini Key <ExternalLink className="w-3 h-3" />
          </a>

          <div className="flex gap-2">
            {apiKey && (
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
