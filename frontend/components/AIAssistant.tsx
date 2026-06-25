type AIAssistantProps = {
  mockResponse: string;
};

export function AIAssistant({ mockResponse }: AIAssistantProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">AI Helper</h2>
      <p className="mt-2 text-sm text-slate-600">
        Ask for quick help with meals, routines, school prep, or bedtime.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Example: Create a simple bedtime routine"
          className="min-h-11 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-teal-600"
        />
        <button className="min-h-11 rounded-md bg-teal-700 px-5 text-sm font-semibold text-white hover:bg-teal-800">
          Ask AI
        </button>
      </div>

      <div className="mt-4 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
        Mock response: {mockResponse}
      </div>
    </section>
  );
}