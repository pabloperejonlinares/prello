import { getAllTasks } from "@/services/DataServices";
import { MainPageContent } from "@/components/auth";

export const revalidate = 0

export default async function MainPage() {
  const tasks = await getAllTasks()

  const todoTasks = tasks.filter((t: { state: string; }) => t.state === 'TO DO')
  const progressTasks = tasks.filter((t: { state: string; }) => t.state === 'IN PROGRESS')
  const doneTasks = tasks.filter((t: { state: string; }) => t.state === 'DONE')

  return (
    <MainPageContent
      todoTasks={todoTasks}
      progressTasks={progressTasks}
      doneTasks={doneTasks}
    />
  )
}
