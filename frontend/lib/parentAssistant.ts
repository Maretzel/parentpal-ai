export type ParentAssistantRequest = {
  question: string;
};

export type ParentAssistantSuccessResponse = {
  answer: string;
  provider: "mock" | "openai";
};

export type ParentAssistantErrorResponse = {
  error: string;
};

export function parseParentAssistantRequest(
  body: unknown,
): ParentAssistantRequest {
  if (
    typeof body !== "object" ||
    body === null ||
    !("question" in body) ||
    typeof body.question !== "string"
  ) {
    throw new ParentAssistantValidationError();
  }

  const question = body.question.trim();

  if (!question) {
    throw new ParentAssistantValidationError();
  }

  return { question };
}

export function createParentAssistantAnswer(question: string) {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    throw new Error("Question is required.");
  }

  return `Here is a calm parent-friendly suggestion for: "${trimmedQuestion}". Start with one small step, keep the routine predictable, and avoid trying to solve everything at once.`;
}

export class ParentAssistantValidationError extends Error {
  constructor(message = "Question is required.") {
    super(message);
    this.name = "ParentAssistantValidationError";
  }
}