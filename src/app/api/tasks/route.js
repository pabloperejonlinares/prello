import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany()
  return NextResponse.json(tasks)
}

export async function POST(request) {
  const {title, description} = await request.json()
  const task = await prisma.task.create({
    data: {
      title: title,
      description: description,
      state: 'TO DO'
    }
  })
  return NextResponse.json(task)
}