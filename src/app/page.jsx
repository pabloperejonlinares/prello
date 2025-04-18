import Panel from "@/components/Panel"
import { prisma } from "@/libs/prisma";

async function loadTasks() {
  const data = await prisma.task.findMany()
  return data
}

export const revalidate = 0 // vuelve a refrescar el componente para evitar cacheos. MUY IMPORTANTE PARA PRODUCCIÓN

export default async function MainPage() {
  const tasks = await loadTasks()

  const todoTasks = tasks.filter(t => t.state === 'TO DO')
  const progressTasks = tasks.filter(t => t.state === 'IN PROGRESS')
  const doneTasks = tasks.filter(t => t.state === 'DONE')

  return (
    <div className="flex items-center justify-evenly mt-14 max-w-screen-2xl">
      <Panel title='TO DO' tasks={todoTasks}/>
      <Panel title='IN PROGRESS' tasks={progressTasks}/>
      <Panel title='DONE' tasks={doneTasks}/>
    </div>
  )
}
