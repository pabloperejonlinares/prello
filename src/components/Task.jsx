'use client'
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function Task(props) {
  const router = useRouter()
  const {title, description } = props
  const [state, setState] = useState(props.state)

  const moveTask = async (e) => {
    e.preventDefault() // para que no refresque automáticamente al darle al botón
    const newState = state === 'TO DO' ? 'IN PROGRESS' : 'DONE'
    setState(newState)
    await fetch(`/api/tasks/${props.id}`, {
      method: 'PUT',
      body: JSON.stringify({title, description, newState}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.refresh() // refrescar la página para evitar datos cacheados
  }

  const deleteTask = async (e) => {
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
    <div className="flex flex-col items-center w-5/6 py-4 rounded shadow-md bg-white">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs">{description}</p>
      <button onClick={state === 'DONE' ? deleteTask : moveTask}>{state === 'DONE' ? 'Delete' : 'Move'}</button>
    </div>
  )
}