'use client'
import Panel from "./Panel"
import { DragDropContext } from '@hello-pangea/dnd';
import { useRouter } from "next/navigation"
import type { DropResult } from '@hello-pangea/dnd';
import { TaskItem } from '@/types/task';

interface DragableProps {
  todoTasks: TaskItem[];
  progressTasks: TaskItem[];
  doneTasks: TaskItem[];
}

export default function Dragable(props: DragableProps) {
  const { todoTasks, progressTasks, doneTasks } = props
  const router = useRouter()

  const moveTask = async (result: DropResult) => {
    const { destination } = result;

    if (!destination) {
      return
    }
    const newState = destination.droppableId
    await fetch(`/api/tasks/${result.draggableId}`, {
      method: 'PUT',
      body: JSON.stringify({newState}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.refresh() // refrescar la página para evitar datos cacheados
  }

  return (
    <div className="flex items-center justify-evenly mt-14 max-w-screen-2xl">
      <DragDropContext onDragEnd={moveTask}>
        <Panel title='TO DO' tasks={todoTasks}/>
        <Panel title='IN PROGRESS' tasks={progressTasks}/>
        <Panel title='DONE' tasks={doneTasks}/>
      </DragDropContext>
    </div>
  )
}