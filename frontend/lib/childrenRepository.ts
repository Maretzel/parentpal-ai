import { supabase } from "./supabaseClient";

export type Child = {
  id: string;
  name: string;
  age: number;
  focus: string;
};

export async function getChildren() {
  const { data, error } = await supabase
    .from("children")
    .select("id, name, age, focus")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data satisfies Child[];
}