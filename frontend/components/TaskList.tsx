"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "parentpal-completed-tasks";
const STORAGE_EVENT = "parentpal-completed-tasks-changed";

const EMPTY_COMPLETED_TASKS: string[] = [];

let cachedRawTasks: string | null = null;
let cachedCompletedTasks: string[] = EMPTY_COMPLETED_TASKS;

type Task = {
  id: string;
  title: string;
  is_completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
};

function readCompletedTasks() {
  if (typeof window === "undefined") {
    return EMPTY_COMPLETED_TASKS;
  }

  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    cachedRawTasks = null;
    cachedCompletedTasks = EMPTY_COMPLETED_TASKS;
    return cachedCompletedTasks;
  }

  if (savedTasks === cachedRawTasks) {
    return cachedCompletedTasks;
  }

  cachedRawTasks = savedTasks;
  cachedCompletedTasks = JSON.parse(savedTasks) as string[];

  return cachedCompletedTasks;
}

function subscribeToCompletedTasks(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
  };
}

function saveCompletedTasks(tasks: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function TaskList({ tasks }: TaskListProps) {
  const completedTasks = useSyncExternalStore(
    subscribeToCompletedTasks,
    readCompletedTasks,
    () => EMPTY_COMPLETED_TASKS,
  );

  const completedCount = completedTasks.length;
  const totalCount = tasks.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  function toggleTask(taskId: string) {
    if (completedTasks.includes(taskId)) {
      saveCompletedTasks(
        completedTasks.filter((currentTaskId) => currentTaskId !== taskId),
      );
      return;
    }

    saveCompletedTasks([...completedTasks, taskId]);
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
          onClick={() => saveCompletedTasks([])}
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
          const isCompleted = completedTasks.includes(task.id);

          return (
            <li key={task.id} className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4 rounded"
              />
              <span
                className={isCompleted ? "text-slate-400 line-through" : ""}
              >
                {task.title}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}