import { prisma } from "@/libs/prisma";

export async function getAllTasks() {
  const data = await prisma.task.findMany({
    orderBy: { id: 'asc' },
  })
  return data
}
