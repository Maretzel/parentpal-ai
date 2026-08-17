import { supabase } from "./supabaseClient";
import type { Task } from "./tasksRepository";

export async function updateTaskCompletionRequest(
  taskId: string,
  isCompleted: boolean,
) {

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("You must be signed in to update tasks.");
  }

  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
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
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("You must be signed in to create tasks.");
  }

  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
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
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("You must be signed in to delete tasks.");
  }

  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  const body = (await response.json()) as
    | { success: true }
    | { error: string };

  if (!response.ok) {
    const errorBody = body as { error: string };
    throw new Error(errorBody.error || "Unable to delete task.");
  }
}

export async function getTasksRequest() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return [];
  }

  const response = await fetch("/api/tasks", {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  const body = (await response.json()) as
    | { tasks: Task[] }
    | { error: string };

  if (!response.ok) {
    const errorBody = body as { error: string };
    throw new Error(errorBody.error || "Unable to load tasks.");
  }

  return (body as { tasks: Task[] }).tasks;
}

export async function updateTaskTitleRequest(taskId: string, title: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return [];
  }
  
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
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