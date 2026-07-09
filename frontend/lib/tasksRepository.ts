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