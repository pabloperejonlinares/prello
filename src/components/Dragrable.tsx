'use client'
import { useTransition } from 'react';
import Panel from "./Panel"
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useRouter } from "next/navigation"
import { TaskItem } from '@/types/task';
import PanelSkeleton from './Skeleton';

interface DragableProps {
  todoTasks: TaskItem[];
  progressTasks: TaskItem[];
  doneTasks: TaskItem[];
}

export default function Dragable(props: DragableProps) {
  const { todoTasks, progressTasks, doneTasks } = props
  const [ isPending, startTransition ] = useTransition()
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
      <DragDropContext onDragEnd={(result) => {
        startTransition(async () => {
          await moveTask(result)
        })
      }}>
        {isPending ? <>
          <PanelSkeleton title='TO DO' tasks={todoTasks.length}/>
          <PanelSkeleton title='IN PROGRESS' tasks={progressTasks.length}/>
          <PanelSkeleton title='DONE' tasks={doneTasks.length}/>
        </>
        : <>
          <Panel title='TO DO' tasks={todoTasks}/>
          <Panel title='IN PROGRESS' tasks={progressTasks}/>
          <Panel title='DONE' tasks={doneTasks}/>
        </>}
      </DragDropContext>
    </div>
  )
}