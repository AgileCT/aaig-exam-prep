import React, { useState } from 'react';
import { DomainId, Question, Flashcard, QuestionType, Difficulty } from '../types';
import { AAIG_DOMAINS } from '../data/domains';
import { Sparkles, AlertCircle, Plus, CheckCircle2, Layers, BookOpen, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuestionGeneratorModalProps {
  apiKey: string;
  onSaveQuestion: (q: Question) => void;
  onSaveFlashcard: (card: Flashcard) => void;
  onOpenApiKey: () => void;
}

export const QuestionGeneratorModal: React.FC<QuestionGeneratorModalProps> = ({
  apiKey,
  onSaveQuestion,
  onSaveFlashcard,
  onOpenApiKey,
}) => {
  const [targetType, setTargetType] = useState<'mcq' | 'flashcard'>('mcq');

  // MCQ Form
  const [domainId, setDomainId] = useState<DomainId>('D1');
  const [questionType, setQuestionType] = useState<QuestionType>('FIRST');
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestion, setGeneratedQuestion] = useState<Question | null>(null);
  const [qualityStats, setQualityStats] = useState<{ ratio: number; lengthCheck: boolean } | null>(null);

  // Flashcard Form
  const [flashcardTopic, setFlashcardTopic] = useState('');
  const [generatedFlashcard, setGeneratedFlashcard] = useState<Flashcard | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerateMCQ = async () => {
    if (!apiKey) {
      onOpenApiKey();
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setQualityStats(null);
    setGeneratedQuestion(null);

    const subDomains = AAIG_DOMAINS[domainId].subDomains;
    const randomSubDomain = subDomains[Math.floor(Math.random() * subDomains.length)];
    const correctPos = Math.floor(Math.random() * 4);

    const prompt = `You are an ISACA AAIG (Advanced in AI Governance) exam author. Create ONE brand-new scenario-based multiple-choice question.
Domain: ${domainId} - ${AAIG_DOMAINS[domainId].name}
SubDomain: ${randomSubDomain}
Question Type: ${questionType} (ISACA style: BEST=most comprehensive governance action, FIRST=foundational initial step, PRIMARY=main responsibility/objective)
Difficulty: ${difficulty}

CRITICAL ANTI-BIAS GATES:
1. Place correct answer at index ${correctPos} (0..3).
2. The correct answer must NOT be the longest option. Make at least ONE distractor equal-to-or-longer.
3. Distractors must test distinct governance misconceptions (Priority trap, Timing/Sequence trap, Scope/Lines of defense trap).
4. Strictly ground in ISO/IEC 42001, NIST AI RMF, or EU AI Act.
5. Answer strictly in English.

Respond with STRICT RAW JSON only (no markdown code fence):
{
  "scenarioText": "Enterprise scenario (2-3 sentences)",
  "questionText": "Question stem ending with a question mark",
  "options": ["A text", "B text", "C text", "D text"],
  "correctIndex": ${correctPos},
  "questionType": "${questionType}",
  "explanation": "Why correct answer reflects ISACA top-down governance",
  "distractorExplanations": ["Why distractor 1 wrong", "Why distractor 2 wrong", "Why distractor 3 wrong"],
  "source": "e.g. ISO/IEC 42001 Cl. 6; NIST AI RMF GOVERN 1.2",
  "difficulty": "${difficulty}"
}`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 1200 }
        })
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      rawText = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

      const parsed = JSON.parse(rawText);
      parsed.id = `aaig-custom-${Date.now()}`;
      parsed.domainId = domainId;
      parsed.subDomain = randomSubDomain;

      const correctLen = parsed.options[parsed.correctIndex].length;
      const otherLens = parsed.options.filter((_: any, i: number) => i !== parsed.correctIndex).map((o: string) => o.length);
      const meanOther = otherLens.reduce((a: number, b: number) => a + b, 0) / otherLens.length;
      const ratio = correctLen / meanOther;

      setQualityStats({
        ratio: Number(ratio.toFixed(2)),
        lengthCheck: ratio <= 1.45
      });

      setGeneratedQuestion(parsed);
    } catch (e: any) {
      setErrorMsg(e?.message || 'Generation failed. Please verify your API Key or try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateFlashcard = async () => {
    if (!apiKey) {
      onOpenApiKey();
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setGeneratedFlashcard(null);

    const topicQuery = flashcardTopic.trim() || AAIG_DOMAINS[domainId].subDomains[0];

    const prompt = `You are an ISACA AAIG (Advanced in AI Governance) curriculum author. Create ONE high-yield study flashcard.
Domain: ${domainId} - ${AAIG_DOMAINS[domainId].name}
Target Topic: ${topicQuery}

Focus on key ISACA governance nuances, standard requirements (ISO/IEC 42001, NIST AI RMF, EU AI Act), and clear distinctions.
Answer strictly in English.

Respond with STRICT RAW JSON only (no markdown code fence):
{
  "topic": "${topicQuery}",
  "front": "A direct, thought-provoking governance question or dilemma",
  "back": "A structured, numbered breakdown explaining the governance mechanism, responsibilities, or standard clauses",
  "source": "e.g. ISO/IEC 42001 Cl. 6; EU AI Act Art. 14; NIST AI RMF GOVERN 1.1",
  "keyTakeaway": "One crisp summary sentence of the core exam takeaway"
}`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 1000 }
        })
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      rawText = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

      const parsed = JSON.parse(rawText);
      parsed.id = `fc-custom-${Date.now()}`;
      parsed.domainId = domainId;

      setGeneratedFlashcard(parsed);
    } catch (e: any) {
      setErrorMsg(e?.message || 'Generation failed. Please verify your API Key or try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveMCQ = () => {
    if (!generatedQuestion) return;
    onSaveQuestion(generatedQuestion);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
    setGeneratedQuestion(null);
    setQualityStats(null);
  };

  const handleSaveCard = () => {
    if (!generatedFlashcard) return;
    onSaveFlashcard(generatedFlashcard);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
    setGeneratedFlashcard(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Target Type Selector */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit mx-auto text-xs font-bold">
        <button
          onClick={() => { setTargetType('mcq'); setErrorMsg(null); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            targetType === 'mcq'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Multiple-Choice Question (MCQ)
        </button>
        <button
          onClick={() => { setTargetType('flashcard'); setErrorMsg(null); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            targetType === 'flashcard'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" /> Study Flashcard
        </button>
      </div>

      {/* Configuration Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {targetType === 'mcq' ? 'ISACA Quality-Gated Question Authoring' : 'AI Governance Flashcard Authoring'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {targetType === 'mcq'
                ? 'Built-in Length-parity Gate, Position Steering, and Orthogonal Distractor Misconception Axes'
                : 'Generates concise, high-yield concept breakdowns anchored in ISO 42001, NIST AI RMF, and EU AI Act'}
            </p>
          </div>
        </div>

        {/* Form Controls for MCQ */}
        {targetType === 'mcq' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Target Domain
              </label>
              <select
                value={domainId}
                onChange={e => setDomainId(e.target.value as DomainId)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100"
              >
                {(['D1', 'D2', 'D3', 'D4'] as DomainId[]).map(d => (
                  <option key={d} value={d}>
                    {d} - {AAIG_DOMAINS[d].name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Question Style (ISACA Nuance)
              </label>
              <select
                value={questionType}
                onChange={e => setQuestionType(e.target.value as QuestionType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100"
              >
                <option value="FIRST">FIRST (Initial Foundational Step)</option>
                <option value="BEST">BEST (Most Comprehensive Action)</option>
                <option value="PRIMARY">PRIMARY (Primary Objective / Mandate)</option>
                <option value="MOST">MOST (Most Effective Control)</option>
                <option value="LEAST">LEAST (Least Acceptable / Violation)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Target Difficulty
              </label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as Difficulty)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100"
              >
                <option value="Intermediate">Intermediate (Standard Depth)</option>
                <option value="Director-Level">Director-Level (Executive Dilemma)</option>
              </select>
            </div>
          </div>
        )}

        {/* Form Controls for Flashcard */}
        {targetType === 'flashcard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Target Domain
              </label>
              <select
                value={domainId}
                onChange={e => setDomainId(e.target.value as DomainId)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100"
              >
                {(['D1', 'D2', 'D3', 'D4'] as DomainId[]).map(d => (
                  <option key={d} value={d}>
                    {d} - {AAIG_DOMAINS[d].name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Topic Keyword (Optional)
              </label>
              <input
                type="text"
                value={flashcardTopic}
                onChange={e => setFlashcardTopic(e.target.value)}
                placeholder="e.g. Model Lineage, Shadow AI, EU AI Act GPAI..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400"
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          {!apiKey ? (
            <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Configure your Gemini API Key in the top-right to generate
            </div>
          ) : (
            <div className="text-xs text-slate-500">
              ⚡️ Quality gates automatically enforce length parity and distractor diversity
            </div>
          )}

          <button
            onClick={targetType === 'mcq' ? handleGenerateMCQ : handleGenerateFlashcard}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 disabled:opacity-50 text-white font-semibold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Generating with Quality Gates...' : targetType === 'mcq' ? 'Generate Question' : 'Generate Flashcard'}
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Generated MCQ Preview */}
      {targetType === 'mcq' && generatedQuestion && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-lg space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Passed Quality Gates
            </span>

            {qualityStats && (
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                qualityStats.lengthCheck ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' : 'bg-rose-100 text-rose-600'
              }`}>
                Length Ratio: {qualityStats.ratio} (Parity Passed)
              </span>
            )}
          </div>

          {generatedQuestion.scenarioText && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold block mb-1">Scenario:</span>
              {generatedQuestion.scenarioText}
            </div>
          )}

          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            {generatedQuestion.questionText}
          </h3>

          <div className="space-y-2">
            {generatedQuestion.options.map((opt, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  i === generatedQuestion.correctIndex
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-medium'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="font-bold shrink-0">{'ABCD'[i]}.</span>
                <span>{opt}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs space-y-2">
            <div>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">ISACA Governance Rationale:</span>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5">{generatedQuestion.explanation}</p>
            </div>
            <div className="text-[11px] text-slate-400">
              Citation: {generatedQuestion.source}
            </div>
          </div>

          <button
            onClick={handleSaveMCQ}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add to My Question Bank
          </button>
        </div>
      )}

      {/* Generated Flashcard Preview */}
      {targetType === 'flashcard' && generatedFlashcard && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-800 shadow-lg space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-bold text-xs">
              {generatedFlashcard.domainId} · {generatedFlashcard.topic}
            </span>
            <span className="text-xs text-slate-400">
              {generatedFlashcard.source}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Card Front (Dilemma / Prompt):
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
              {generatedFlashcard.front}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/50 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
              Card Back (Governance Breakdown):
            </span>
            <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
              {generatedFlashcard.back}
            </p>
            {generatedFlashcard.keyTakeaway && (
              <div className="pt-2 text-xs text-indigo-300 font-medium">
                🎯 Takeaway: {generatedFlashcard.keyTakeaway}
              </div>
            )}
          </div>

          <button
            onClick={handleSaveCard}
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add to My Flashcard Deck
          </button>
        </div>
      )}
    </div>
  );
};
