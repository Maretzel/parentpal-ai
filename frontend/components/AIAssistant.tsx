"use client";

import { useState } from "react";

type AIAssistantProps = {
  mockResponse: string;
};

export function AIAssistant({ mockResponse }: AIAssistantProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAskAi() {
    if (!question.trim()) {
      setResponse("Please enter a question first.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const result = await fetch("/api/parent-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await result.json();

      if (!result.ok) {
        setResponse(data.error || "Something went wrong.");
        return;
      }

      setResponse(data.answer);
      setQuestion("");
    } catch {
      setResponse("Unable to reach the assistant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">AI Helper</h2>
      <p className="mt-2 text-sm text-slate-600">
        Ask for quick help with meals, routines, school prep, or bedtime.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
                if (event.key === "Enter") {
                handleAskAi();
                }
            }}
          placeholder="Example: Create a simple bedtime routine"
          className="min-h-11 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-teal-600"
        />
        <button
          type="button"
          onClick={handleAskAi}
          disabled={isLoading}
          className="min-h-11 rounded-md bg-teal-700 px-5 text-sm font-semibold text-white hover:bg-teal-800"
        >
            {isLoading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      <div className="mt-4 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
        {isLoading
          ? "Thinking through a calm parent-friendly answer..."
          : response || "Mock response will appear here after you ask a question."}
      </div>
    </section>
  );
}