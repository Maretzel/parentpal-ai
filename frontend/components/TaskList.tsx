"use client";

import { useEffect, useState } from "react";

type TaskListProps = {
  tasks: string[];
};

export function TaskList({ tasks }: TaskListProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const completedCount = completedTasks.length;
  const totalCount = tasks.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  useEffect(() => {
    const savedTasks = localStorage.getItem("parentpal-completed-tasks");

    if (savedTasks) {
      setCompletedTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "parentpal-completed-tasks",
      JSON.stringify(completedTasks),
    );
  }, [completedTasks]);

  function toggleTask(task: string) {
    setCompletedTasks((currentTasks) => {
      if (currentTasks.includes(task)) {
        return currentTasks.filter((currentTask) => currentTask !== task);
      }

      return [...currentTasks, task];
    });
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold">Family Tasks</h2>
        <p className="mt-1 text-sm text-slate-500">
          {completedCount} of {totalCount} done - {progressPercentage}%
        </p>
      </div>

      <button
        type="button"
        onClick={() => setCompletedTasks([])}
        disabled={completedTasks.length === 0}
        className="rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
      >
        Clear
      </button>
    </div>
    <div className="mt-4 h-2 rounded-full bg-slate-100">
      <div
        className="h-2 rounded-full bg-teal-600 transition-all"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
      <ul className="mt-4 space-y-3">
        {tasks.map((task) => {
          const isCompleted = completedTasks.includes(task);

          return (
            <li key={task} className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleTask(task)}
                className="h-4 w-4 rounded"
              />
              <span className={isCompleted ? "text-slate-400 line-through" : ""}>
                {task}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}