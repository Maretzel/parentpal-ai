export type ParentAssistantRequest = {
  question: string;
};

export type ParentAssistantSuccessResponse = {
  answer: string;
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
    throw new Error("Question is required.");
  }

  const question = body.question.trim();

  if (!question) {
    throw new Error("Question is required.");
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