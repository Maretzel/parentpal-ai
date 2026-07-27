import { createTask } from "@/lib/tasksRepository";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json(
        { error: "Task title is required." },
        { status: 400 },
      );
    }

    const task = await createTask(body.title);

    return NextResponse.json({ task }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create task." },
      { status: 500 },
    );
  }
}