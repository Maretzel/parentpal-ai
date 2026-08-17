import { createTask, getTasks } from "@/lib/tasksRepository";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json(
        { error: "Task title is required." },
        { status: 400 },
      );
    }

    const authorization = request.headers.get("Authorization");
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "You must be signed in to create tasks." },
        { status: 401 },
      );
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be signed in to create tasks." },
        { status: 401 },
      );
    }
    const supabaseWithAuth = createSupabaseServerClient(token);

    const task = await createTask(supabaseWithAuth, body.title, user.id);
    return NextResponse.json({ task }, { status: 201 });
   } catch (error) {
    console.error("Create task API error:", error);

    const message =
      error instanceof Error ? error.message : "Unable to create task.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("Authorization");
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const supabaseWithAuth = createSupabaseServerClient(token);
    const tasks = await getTasks(supabaseWithAuth);

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Get tasks API error:", error);

    return NextResponse.json(
      { error: "Unable to load tasks." },
      { status: 500 },
    );
  }
}