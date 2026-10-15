import { defaultAIConfig, generateAIText, AIRequestOptions } from './ai';
export type GeminiRequestOptions = AIRequestOptions;
export function generateGeminiText(apiKey: string, prompt: string, options: GeminiRequestOptions = {}): Promise<string> {
  return generateAIText({ ...defaultAIConfig(), apiKey }, prompt, options);
}
