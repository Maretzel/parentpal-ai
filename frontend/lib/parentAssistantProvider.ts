import OpenAI from "openai";
import { PARENT_ASSISTANT_SYSTEM_PROMPT } from "./parentAssistantPrompt";

function createMockParentAssistantAnswer(question: string) {
  return `Here is a demo ParentPal response for: "${question}".

Try this simple approach:
1. Pick one small next step.
2. Keep the routine predictable.
3. Give yourself permission to make it imperfect.

This is a mock response while the real AI provider is disabled.`;
}

type ParentAssistantProviderResult = {
  answer: string;
  provider: "mock" | "openai";
};

async function askOpenAIParentAssistant(question: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const openai = new OpenAI({ apiKey });

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
    reasoning: { effort: "low" },
    instructions: PARENT_ASSISTANT_SYSTEM_PROMPT,
    input: question,
  });

  const answer = response.output_text.trim();

  if (!answer) {
    throw new Error("The assistant did not return an answer.");
  }

  return answer;
}

export async function askParentAssistantProvider(
  question: string,
): Promise<ParentAssistantProviderResult> {
  const provider = process.env.AI_PROVIDER || "mock";

  if (provider === "openai") {
    const answer = await askOpenAIParentAssistant(question);

    return {
      answer,
      provider: "openai",
    };
  }

  return {
    answer: createMockParentAssistantAnswer(question),
    provider: "mock",
  };
}