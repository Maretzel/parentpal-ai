import type {
  ParentAssistantErrorResponse,
  ParentAssistantSuccessResponse,
} from "./parentAssistant";

export async function askParentAssistant(question: string) {
  const result = await fetch("/api/parent-assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  const data = (await result.json()) as
    | ParentAssistantSuccessResponse
    | ParentAssistantErrorResponse;

  if (!result.ok) {
    const errorData = data as ParentAssistantErrorResponse;
    throw new Error(errorData.error || "Something went wrong.");
  }

  const successData = data as ParentAssistantSuccessResponse;

  return successData.answer;
}