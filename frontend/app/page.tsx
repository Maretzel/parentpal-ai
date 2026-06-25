import { ChildCard } from "@/components/ChildCard";
import { ScheduleList } from "@/components/ScheduleList";
import { TaskList } from "@/components/TaskList";
import { AIAssistant } from "@/components/AIAssistant";

const children = [
  {
    name: "Euan Miguel",
    age: 11,
    focus: "Bedtime routine",
  },
  {
    name: "Euell Mikko",
    age: 8,
    focus: "Homework consistency",
  },
];

const schedule = [
  "7:00 AM - Breakfast",
  "8:00 AM - School drop-off",
  "5:30 PM - Homework check",
  "6:30 PM - Dinner",
  "8:00 PM - Bedtime routine",
];

const tasks = [
  "Pack school bags",
  "Prepare lunch boxes",
  "Review homework",
  "Read for 15 minutes",
];

const mockAiResponse =
  "Start with dinner, bath, pajamas, one short story, then lights out. Keep the routine predictable and calm.";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <header>
          <p className="text-sm font-medium text-teal-700">ParentPal AI</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Good morning, Maretzel
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Here is a calm view of today&apos;s family plan.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {children.map((child) => (
            <ChildCard
              key={child.name}
              name={child.name}
              age={child.age}
              focus={child.focus}
            />
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <ScheduleList items={schedule} />

          <TaskList tasks={tasks} />

        </section>

        <AIAssistant mockResponse={mockAiResponse} />
      </section>
    </main>
  );
}