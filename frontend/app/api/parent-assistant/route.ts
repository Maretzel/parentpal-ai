import {
  createParentAssistantAnswer,
  parseParentAssistantRequest,
  type ParentAssistantErrorResponse,
  type ParentAssistantSuccessResponse,
} from "@/lib/parentAssistant";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question } = parseParentAssistantRequest(body);
    const answer = createParentAssistantAnswer(question);

    return NextResponse.json<ParentAssistantSuccessResponse>({ answer });
  } catch {
    return NextResponse.json<ParentAssistantErrorResponse>(
      { error: "Question is required." },
      { status: 400 },
    );
  }
}