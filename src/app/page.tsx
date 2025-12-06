import { prisma } from "@/libs/prisma";
import Dragable from "@/components/Dragrable";

async function loadTasks() {
  const data = await prisma.task.findMany()
  return data
}

export const revalidate = 0 // vuelve a refrescar el componente para evitar cacheos. MUY IMPORTANTE PARA PRODUCCIÓN

export default async function MainPage() {
  const tasks = await loadTasks()

  const todoTasks = tasks.filter((t: { state: string; }) => t.state === 'TO DO')
  const progressTasks = tasks.filter((t: { state: string; }) => t.state === 'IN PROGRESS')
  const doneTasks = tasks.filter((t: { state: string; }) => t.state === 'DONE')

  return (
    <Dragable
      todoTasks={todoTasks}
      progressTasks={progressTasks}
      doneTasks={doneTasks}
    />
  )
}
