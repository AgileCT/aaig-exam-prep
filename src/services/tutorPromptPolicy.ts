import { Question, TutorMode } from '../types';

export const APPROVED_TUTOR_MODES: TutorMode[] = ['standard', 'socratic', 'teach-back', 'drill'];

export function buildTutorSystemPrompt(mode: TutorMode, contextQuestion?: Question): string {
  const baseRules = [
    'You are the ISACA AAIG (Advanced in AI Governance) Expert Study Tutor.',
    'Your goal is to coach the candidate through enterprise AI governance, risk oversight, data architecture, and compliance frameworks.',
    'Always ground explanations in recognized frameworks: ISACA Governance Principles, COBIT, NIST AI RMF 1.0, ISO/IEC 42001 (AIMS), and the EU AI Act.',
    'Emphasize the ISACA Mindset: Governance & strategy first, risk-based prioritization, clear board accountability & three lines model, plan/policy before technical tools.',
    'Keep your tone encouraging, rigorous, and exam-focused. Answer exclusively in English.'
  ];

  let modeSpecific = '';

  switch (mode) {
    case 'socratic':
      modeSpecific = `
SOCRATIC COACHING MODE:
- Do NOT directly give away the solution or final answer.
- Ask ONE thoughtful, probing question that guides the user to reflect on the core governance concept or root cause.
- End your response with a clear question mark '?'. Keep it concise (1-2 sentences).`;
      break;

    case 'teach-back':
      modeSpecific = `
TEACH-BACK (FEYNMAN) EVALUATION MODE:
- The user is attempting to explain a governance concept in their own words.
- Evaluate their explanation according to 3 clear criteria:
  1. What they got RIGHT (affirm accuracy).
  2. What was MISSING (key governance nuance or standard citation).
  3. What was INACCURATE or MISLEADING.
- Give crisp, actionable feedback without unnecessary filler.`;
      break;

    case 'drill':
      modeSpecific = `
DRILL / VARIANT GENERATION MODE:
- The user struggled with a concept.
- Create ONE brand-new, realistic scenario-based multiple-choice question testing the EXACT same underlying governance principle from a different business angle.
- Format strictly as:
  **Scenario & Question:** ...
  A) ...
  B) ...
  C) ...
  D) ...
  **Correct Answer:** [Letter]
  **Key Governance Takeaway:** [One crisp sentence explaining the ISACA rationale]`;
      break;

    case 'standard':
    default:
      modeSpecific = `
STANDARD EXAM TUTOR MODE:
- Provide a clear, structured breakdown:
  1. The Core Governance Dilemma (what is really being tested).
  2. Why the correct answer is the BEST / FIRST ISACA governance choice.
  3. Why the other options fall into classic traps (e.g., operational vs. strategic, premature action, confusing 1st vs 2nd line).
  4. Standard Reference (mention specific sections in ISO 42001, NIST AI RMF, or EU AI Act).`;
      break;
  }

  let questionContextStr = '';
  if (contextQuestion) {
    questionContextStr = `
CURRENT QUESTION CONTEXT:
[Domain]: ${contextQuestion.domainId} - ${contextQuestion.subDomain}
[Scenario]: ${contextQuestion.scenarioText || 'N/A'}
[Question]: ${contextQuestion.questionText}
[Options]:
${contextQuestion.options.map((opt, i) => `${'ABCD'[i]}) ${opt}`).join('\n')}
[Correct Answer Index]: ${contextQuestion.correctIndex} (${'ABCD'[contextQuestion.correctIndex]})
[Official Explanation]: ${contextQuestion.explanation}
[Official Source]: ${contextQuestion.source}
`;
  }

  return `${baseRules.join('\n')}\n\n${modeSpecific}\n\n${questionContextStr}`.trim();
}

/**
 * Direct browser-side Gemini API invocation using user's stored key.
 * If no key is set, returns an intelligent simulated tutor guidance.
 */
export async function callAITutor(
  apiKey: string,
  userMessage: string,
  mode: TutorMode,
  contextQuestion?: Question
): Promise<string> {
  const systemPrompt = buildTutorSystemPrompt(mode, contextQuestion);

  if (!apiKey) {
    // High quality offline fallback response in English
    if (mode === 'socratic' && contextQuestion) {
      return `[Offline Tutor - Socratic Mode] In this scenario, as the AI Governance Officer, what foundational mandate and decision authority must executive leadership establish before any technical tools or pilots are approved? (Tip: Configure your Gemini API Key in the top right to unlock real-time dynamic AI dialogue).`;
    }
    if (contextQuestion) {
      return `[Offline Knowledge Retrieval]\nTested Topic: **${contextQuestion.subDomain}**\n\n**ISACA Official Governance Rationale:**\n${contextQuestion.explanation}\n\n**Standard Citation:**\n${contextQuestion.source}\n\n💡 *Tip: Click 'API Key' in the header to enter your Gemini API Key for unlimited cloud AI conversations, Socratic coaching, and instant drill generation!*`;
    }
    return `Please configure your Gemini API Key in the top right header to unlock the full AI Study Tutor conversational experience!`;
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `${systemPrompt}\n\nCandidate Request: ${userMessage}`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: mode === 'drill' ? 0.4 : 0.6,
      maxOutputTokens: 1000,
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText.slice(0, 150)}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || 'No response received from tutor. Please try again.';
}
