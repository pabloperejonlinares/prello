'use client'
import { useRouter } from "next/navigation"
import type { JSX, MouseEvent } from 'react'

export interface TaskFields {
  id: string
  title: string
  description?: string
  state: 'DONE' | 'TODO' | 'IN_PROGRESS' | string
}

export interface TaskProps extends TaskFields {}


export default function Task(props: TaskProps): JSX.Element {
  const router = useRouter()
  const {title, description, state } = props

  const deleteTask = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault() // para que no refresque automáticamente al darle al botón
    await fetch(`/api/tasks/${props.id}`, {
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