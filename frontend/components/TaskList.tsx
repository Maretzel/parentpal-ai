"use client";

import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskCompletionRequest,
  updateTaskTitleRequest,
} from "@/lib/tasksClient";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  is_completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [isUpdatingTaskId, setIsUpdatingTaskId] = useState<string | null>(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const completedCount = currentTasks.filter((task) => task.is_completed).length;
  const totalCount = currentTasks.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [savingTitleTaskId, setSavingTitleTaskId] = useState<string | null>(null);

  async function toggleTask(taskId: string) {
    const task = currentTasks.find((currentTask) => currentTask.id === taskId);

    if (!task) {
      return;
    }

    const nextIsCompleted = !task.is_completed;

    setIsUpdatingTaskId(taskId);

    try {
      const updatedTask = await updateTaskCompletionRequest(
        taskId,
        nextIsCompleted,
      );

      setCurrentTasks((tasksSnapshot) =>
        tasksSnapshot.map((currentTask) =>
          currentTask.id === taskId ? updatedTask : currentTask,
        ),
      );
    } catch {
      // Later we can show a proper error message.
    } finally {
      setIsUpdatingTaskId(null);
    }
  }

  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTaskTitle.trim()) {
      setErrorMessage("Please enter a task title.");
      return;
    }

    setIsCreatingTask(true);
    setErrorMessage("");

    try {
      const createdTask = await createTaskRequest(newTaskTitle);

      setCurrentTasks((tasksSnapshot) => [...tasksSnapshot, createdTask]);
      setNewTaskTitle("");
    } catch {
      setErrorMessage("Unable to add task. Please try again.");
    } finally {
      setIsCreatingTask(false);
    }
  }

  async function handleDeleteTask(taskId: string) {
    setDeletingTaskId(taskId);
    setErrorMessage("");

    try {
      await deleteTaskRequest(taskId);

      setCurrentTasks((tasksSnapshot) =>
        tasksSnapshot.filter((task) => task.id !== taskId),
      );
    } catch {
      setErrorMessage("Unable to delete task. Please try again.");
    } finally {
      setDeletingTaskId(null);
    }
  }

  function startEditingTask(taskId: string, title: string) {
    setEditingTaskId(taskId);
    setEditingTitle(title);
    setErrorMessage("");
  }

  function cancelEditingTask() {
    setEditingTaskId(null);
    setEditingTitle("");
  }

  async function handleSaveTaskTitle(taskId: string) {
    if (!editingTitle.trim()) {
      setErrorMessage("Task title is required.");
      return;
    }

    setSavingTitleTaskId(taskId);
    setErrorMessage("");

    try {
      const updatedTask = await updateTaskTitleRequest(taskId, editingTitle);

      setCurrentTasks((tasksSnapshot) =>
        tasksSnapshot.map((task) =>
          task.id === taskId ? updatedTask : task,
        ),
      );

      cancelEditingTask();
    } catch {
      setErrorMessage("Unable to update task. Please try again.");
    } finally {
      setSavingTitleTaskId(null);
    }
  }

  useEffect(() => {
    async function loadTasks() {
      setIsLoadingTasks(true);
      setErrorMessage("");

      try {
        const loadedTasks = await getTasksRequest();
        setCurrentTasks(loadedTasks);
      } catch {
        setErrorMessage("Unable to load tasks.");
      } finally {
        setIsLoadingTasks(false);
      }
    }

    loadTasks();
  }, []);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Family Tasks</h2>
          <p className="mt-1 text-sm text-slate-500">
            {completedCount} of {totalCount} done - {progressPercentage}%
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-teal-600 transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <form onSubmit={handleCreateTask} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          placeholder="Add a family task"
          className="min-h-11 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-teal-600"
        />
        
        <button
          type="submit"
          disabled={isCreatingTask}
          className="min-h-11 rounded-md bg-teal-700 px-5 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isCreatingTask ? "Adding..." : "Add"}
        </button>
      </form>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}

      {isLoadingTasks && (
        <p className="mt-3 text-sm text-slate-500">Loading tasks...</p>
      )}
      
      <ul className="mt-4 space-y-3">
        {currentTasks.map((task) => {
          const isUpdating = isUpdatingTaskId === task.id;

          return (
            <li key={task.id} className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={task.is_completed}
                disabled={isUpdating}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4 rounded"
              />

              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(event) => setEditingTitle(event.target.value)}
                    className="min-h-9 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-teal-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveTaskTitle(task.id)}
                    disabled={savingTitleTaskId === task.id}
                    className="rounded-md bg-teal-700 px-2 py-1 text-xs font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {savingTitleTaskId === task.id ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditingTask}
                    className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={
                      task.is_completed ? "text-slate-400 line-through" : ""
                    }
                  >
                    {task.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => startEditingTask(task.id, task.title)}
                    className="ml-auto rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    disabled={deletingTaskId === task.id}
                    className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    {deletingTaskId === task.id ? "Deleting..." : "Delete"}
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}