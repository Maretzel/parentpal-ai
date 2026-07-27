import { deleteTask, updateTaskCompletion } from "@/lib/tasksRepository";
import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (typeof body.isCompleted !== "boolean") {
      return NextResponse.json(
        { error: "isCompleted must be a boolean." },
        { status: 400 },
      );
    }

    const task = await updateTaskCompletion(id, body.isCompleted);

    return NextResponse.json({ task });
  } catch {
    return NextResponse.json(
      { error: "Unable to update task." },
      { status: 500 },
    );
  }
}

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