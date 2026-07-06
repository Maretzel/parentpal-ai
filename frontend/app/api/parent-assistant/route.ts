import {
  ParentAssistantValidationError,
  parseParentAssistantRequest,
  type ParentAssistantErrorResponse,
  type ParentAssistantSuccessResponse,
} from "@/lib/parentAssistant";
import { askParentAssistantProvider } from "@/lib/parentAssistantProvider";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question } = parseParentAssistantRequest(body);
    const result = await askParentAssistantProvider(question);

    return NextResponse.json<ParentAssistantSuccessResponse>(result);
    } catch (error) {
    if (error instanceof ParentAssistantValidationError) {
      return NextResponse.json<ParentAssistantErrorResponse>(
        { error: error.message },
        { status: 400 },
      );
    }

    console.error("Parent assistant API error:", error);

    return NextResponse.json<ParentAssistantErrorResponse>(
      { error: "Unable to create an assistant response." },
      { status: 500 },
    );
  }
}