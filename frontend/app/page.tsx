import { ChildCard } from "@/components/ChildCard";
import { ScheduleList } from "@/components/ScheduleList";
import { TaskList } from "@/components/TaskList";
import { AIAssistant } from "@/components/AIAssistant";
import {
  schedule,
} from "@/data/dashboard";
import { getChildren } from "@/lib/childrenRepository";
import { getTasks } from "@/lib/tasksRepository";

export default async function Home() {
  const children = await getChildren();
  const tasks = await getTasks();

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
              key={child.id}
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

        <AIAssistant />
      </section>
    </main>
  );
}