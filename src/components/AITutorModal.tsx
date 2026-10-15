import React, { useEffect, useRef, useState } from 'react';
import { Question, TutorMode, TutorMessage } from '../types';
import { callAITutor } from '../services/tutorPromptPolicy';
import { AIConfig, defaultAIConfig, PROVIDERS } from '../services/ai';
import { 
  X, 
  Send, 
  HelpCircle, 
  Lightbulb, 
  Repeat, 
  BookOpen,
  Bot
} from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextQuestion?: Question;
  apiKey?: string;
  aiConfig?: AIConfig;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  contextQuestion,
  apiKey,
  aiConfig,
}) => {
  const config = aiConfig || { ...defaultAIConfig(), apiKey: apiKey || '' };
  const [mode, setMode] = useState<TutorMode>('standard');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const request = useRef<AbortController | null>(null);
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: contextQuestion
        ? `Hello! I am your ISACA AAIG Study Tutor. We are currently reviewing the question for [${contextQuestion.subDomain}].\n\nYou can switch coaching modes above (Socratic Coaching, Teach-Back Evaluation, Drill Generator), or ask me directly why a specific option is the optimal governance choice.`
        : 'Hello! I am your ISACA AAIG Study Tutor. What questions do you have regarding AI enterprise governance, NIST AI RMF, ISO 42001, or the EU AI Act?',
      timestamp: Date.now(),
      mode: 'standard',
    }
  ]);

  useEffect(() => {
    setLoading(false);
    return () => {
      request.current?.abort();
      request.current = null;
    };
  }, [isOpen, contextQuestion?.id, config.apiKey, config.provider, config.model, config.baseUrl]);

  if (!isOpen) return null;

  const handleSend = async (userTextToSend?: string, selectedMode: TutorMode = mode) => {
    const text = userTextToSend || input;
    if (!text.trim() || request.current) return;
    const controller = new AbortController();
    request.current = controller;

    const userMsg: TutorMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      mode: selectedMode,
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userTextToSend) setInput('');
    setLoading(true);

    try {
      const reply = await callAITutor({ ...config }, text, selectedMode, contextQuestion, { signal: controller.signal });
      if (controller.signal.aborted || request.current !== controller) return;
      const assistantMsg: TutorMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
        mode: selectedMode,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      if (controller.signal.aborted || request.current !== controller) return;
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `❌ Error: ${err?.message || 'Unknown exception'}`,
          timestamp: Date.now(),
        }
      ]);
    } finally {
      if (request.current === controller) {
        request.current = null;
        setLoading(false);
      }
    }
  };

  const quickPrompts = [
    { label: '🎯 Core Governance Dilemma', text: 'Explain why this question tests governance mandate rather than technical engineering implementation.' },
    { label: '🤔 Socratic Coaching', text: 'Use Socratic mode to probe my understanding without revealing the answer directly.', targetMode: 'socratic' as TutorMode },
    { label: '🔁 Drill Variant', text: 'Generate one brand-new scenario testing this exact same underlying governance principle.', targetMode: 'drill' as TutorMode },
    { label: '🎙️ Teach-Back Prep', text: 'I want to explain this concept in my own words. Please evaluate my explanation against ISACA standards.', targetMode: 'teach-back' as TutorMode },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl h-[85vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  AAIG Study Tutor
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  StudyBase Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Independent practice guidance · AI output is unreviewed
              </p>
            </div>
          </div>

          <button
            onClick={() => { request.current?.abort(); onClose(); }}
            aria-label="Close AI tutor"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="px-4 py-2 text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
          With an API key, study messages and the current practice item go to {PROVIDERS[config.provider].name}. Quota limits and charges may apply.
          Do not submit personal, confidential, or protected ISACA exam/QAE content. Verify AI explanations against original sources.
        </p>

        {/* Mode Selector Tabs (AAISM's 4 Tutor Modes) */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setMode('standard')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              mode === 'standard'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Standard Breakdown
          </button>
          <button
            onClick={() => setMode('socratic')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              mode === 'socratic'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Socratic Coaching
          </button>
          <button
            onClick={() => setMode('teach-back')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              mode === 'teach-back'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" /> Teach-Back (Feynman)
          </button>
          <button
            onClick={() => setMode('drill')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              mode === 'drill'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" /> Drill Generator
          </button>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-slate-400 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <span>Tutor is formulating response...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex items-center gap-2 shrink-0">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => {
                if (qp.targetMode) setMode(qp.targetMode);
                handleSend(qp.text, qp.targetMode ?? mode);
              }}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0 bg-white dark:bg-slate-900">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={
              mode === 'teach-back'
                ? 'Explain the governance concept in your words; the tutor will evaluate...'
                : 'Ask the tutor about this question, concept, or trap analysis...'
            }
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            aria-label="Send message"
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
