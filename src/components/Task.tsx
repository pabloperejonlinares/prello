'use client'
import { useRouter } from "next/navigation"
import type { JSX, MouseEvent } from 'react'
import { TaskItem } from '@/types/task';

export default function Task(props: TaskItem): JSX.Element {
  const router = useRouter()
  const { id, title, description, state } = props

  const deleteTask = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault() // para que no refresque automáticamente al darle al botón
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.refresh() // refrescar la página para evitar datos cacheados
  }

  return (
      <><h3 className="font-semibold">{title}</h3><p className="text-xs">{description}</p>
      {state === 'DONE'
        ? <button onClick={deleteTask}>Delete</button> 
        : ''}
        </>
  )
}