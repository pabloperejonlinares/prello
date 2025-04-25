'use client'
import Panel from "./Panel"
import { DragDropContext } from '@hello-pangea/dnd';
import { useRouter } from "next/navigation"

export default function Dragable(props) {
  const { todoTasks, progressTasks, doneTasks } = props
  const router = useRouter()

  const moveTask = async (result) => {
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