import { deleteTask, updateTaskCompletion, updateTaskTitle } from "@/lib/tasksRepository";
import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await deleteTask(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to delete task." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (typeof body.isCompleted === "boolean") {
      const task = await updateTaskCompletion(id, body.isCompleted);
      return NextResponse.json({ task });
    }

    if (typeof body.title === "string" && body.title.trim()) {
      const task = await updateTaskTitle(id, body.title);
      return NextResponse.json({ task });
    }

    return NextResponse.json(
      { error: "A valid task update is required." },
      { status: 400 },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to update task." },
      { status: 500 },
    );
  }
}