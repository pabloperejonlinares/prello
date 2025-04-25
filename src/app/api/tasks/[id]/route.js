import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function PUT(request, {params}) {
  const { newState } = await request.json()
  const task = await prisma.task.update({
    where: {
      id: parseInt(params.id)
    },
    data: {
      state: newState
    }
  })
  return NextResponse.json(task)
}

export async function DELETE(request, {params}) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: parseInt(params.id)
      }
    })
    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}