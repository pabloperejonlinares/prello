'use client'
import { useRouter } from "next/navigation"

export default function Task(props) {
  const router = useRouter()
  const {title, description, state } = props

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
      <><h3 className="font-semibold">{title}</h3><p className="text-xs">{description}</p>
      {state === 'DONE'
        ? <button onClick={deleteTask}>Delete</button> 
        : ''}
        </>
  )
}