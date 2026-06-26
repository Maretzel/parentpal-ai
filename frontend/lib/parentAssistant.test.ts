import { describe, expect, it } from "vitest";
import { createParentAssistantAnswer, parseParentAssistantRequest } from "./parentAssistant";

describe("parseParentAssistantRequest", () => {
  it("returns a trimmed question when the body is valid", () => {
    const result = parseParentAssistantRequest({
      question: "  Create a bedtime routine  ",
    });

    expect(result).toEqual({
      question: "Create a bedtime routine",
    });
  });

  it("throws when the body is null", () => {
    expect(() => parseParentAssistantRequest(null)).toThrow(
      "Question is required.",
    );
  });

  it("throws when question is missing", () => {
    expect(() => parseParentAssistantRequest({})).toThrow(
      "Question is required.",
    );
  });

  it("throws when question is not a string", () => {
    expect(() => parseParentAssistantRequest({ question: 123 })).toThrow(
      "Question is required.",
    );
  });
});