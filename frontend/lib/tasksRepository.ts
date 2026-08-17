import { supabase } from "./supabaseClient";
import type { SupabaseClient } from "@supabase/supabase-js";

export type Task = {
  id: string;
  title: string;
  is_completed: boolean;
  parent_id: string;
};

export async function getTasks(client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from("tasks")
    .select("id, title, is_completed, parent_id")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data satisfies Task[];
}

export async function updateTaskCompletion(
  client: SupabaseClient,
  taskId: string,
  isCompleted: boolean,
) {
  const { data, error } = await client
    .from("tasks")
    .update({ is_completed: isCompleted })
    .eq("id", taskId)
    .select("id, title, is_completed, parent_id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data satisfies Task;
}

export async function createTask(
  client: SupabaseClient,
  title: string,
  parentId: string,
) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    throw new Error("Task title is required.");
  }

  const { data, error } = await client
    .from("tasks")
    .insert({
      title: trimmedTitle,
      is_completed: false,
      parent_id: parentId,
    })
    .select("id, title, is_completed, parent_id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data satisfies Task;
}

export async function deleteTask(client: SupabaseClient, taskId: string) {
  const { error } = await client.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateTaskTitle(
  client: SupabaseClient,
  taskId: string,
  title: string,
) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    throw new Error("Task title is required.");
  }

  const { data, error } = await client
    .from("tasks")
    .update({ title: trimmedTitle })
    .eq("id", taskId)
    .select("id, title, is_completed, parent_id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data satisfies Task;
}