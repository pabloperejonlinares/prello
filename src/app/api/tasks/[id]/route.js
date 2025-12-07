import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function PUT(request, {params}) {
  const { title, description, newState } = await request.json()
  const { id } = await params
  const task = await prisma.task.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title: title ? title : prisma.task.title,
      description: description ? description : prisma.task.description,
      state: newState
    }
  })
  return NextResponse.json(task)
}

export async function DELETE(request, {params}) {
  const { id } = await params
  try {
    const task = await prisma.task.delete({
      where: {
        id: parseInt(id)
      }
    })
    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}