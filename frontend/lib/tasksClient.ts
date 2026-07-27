import type { Task } from "./tasksRepository";

export async function updateTaskCompletionRequest(
  taskId: string,
  isCompleted: boolean,
) {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isCompleted }),
  });

  const body = (await response.json()) as
    | { task: Task }
    | { error: string };

  if (!response.ok) {
    const errorBody = body as { error: string };
    throw new Error(errorBody.error || "Unable to update task.");
  }

  const successBody = body as { task: Task };

  return successBody.task;
}

export async function createTaskRequest(title: string) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  const body = (await response.json()) as
    | { task: Task }
    | { error: string };

  if (!response.ok) {
    const errorBody = body as { error: string };
    throw new Error(errorBody.error || "Unable to create task.");
  }

  const successBody = body as { task: Task };

  return successBody.task;
}

export async function deleteTaskRequest(taskId: string) {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  const body = (await response.json()) as
    | { success: true }
    | { error: string };

  if (!response.ok) {
    const errorBody = body as { error: string };
    throw new Error(errorBody.error || "Unable to delete task.");
  }
}

export async function updateTaskTitleRequest(taskId: string, title: string) {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  const body = (await response.json()) as
    | { task: Task }
    | { error: string };

  if (!response.ok) {
    const errorBody = body as { error: string };
    throw new Error(errorBody.error || "Unable to update task.");
  }

  const successBody = body as { task: Task };

  return successBody.task;
}