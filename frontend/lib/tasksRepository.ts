import { supabase } from "./supabaseClient";

export type Task = {
  id: string;
  title: string;
  is_completed: boolean;
};

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, is_completed")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data satisfies Task[];
}

export async function updateTaskCompletion(
  taskId: string,
  isCompleted: boolean,
) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ is_completed: isCompleted })
    .eq("id", taskId)
    .select("id, title, is_completed")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data satisfies Task;
}

export async function createTask(title: string) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    throw new Error("Task title is required.");
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: trimmedTitle,
      is_completed: false,
    })
    .select("id, title, is_completed")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data satisfies Task;
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error(error.message);
  }
}