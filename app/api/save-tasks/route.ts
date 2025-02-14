import { prisma } from "@/prisma"; // Adjust the import path for your Prisma client
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, tasks } = await request.json();

    if (!email || !tasks) return NextResponse.json({ error: "Missing email or tasks." }, { status: 404 });

    try {
        const user = await prisma.user.findUnique({ where: { email }});
        if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

        // deleting old tasks
        await prisma.task.deleteMany({ where: { userId: user.id }});

        // saving new tasks
        await prisma.task.createMany({
            data: tasks.map((task: { id: number, value: string }) => ({
                title: task.value,
                userId: user.id,
            })),
        });
        return NextResponse.json({ message: "Tasks saved successfully!" }, { status: 200 });
    } catch (error) {
        console.log("Error saving tasks: ", error);
        NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

}
    

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "User ID is required." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found " }, { status: 404 });
    const tasks = await prisma.task.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
