import { describe, expect, it } from "vitest";
import { POST } from "./route";

function createJsonRequest(body: unknown) {
  return new Request("http://localhost/api/parent-assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/parent-assistant", () => {
  it("returns an answer for a valid question", async () => {
    const response = await POST(
      createJsonRequest({ question: "Create a bedtime routine" }),
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toContain("Create a bedtime routine");
  });

  it("returns 400 when the question is missing", async () => {
    const response = await POST(createJsonRequest({}));

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Question is required.");
  });
});