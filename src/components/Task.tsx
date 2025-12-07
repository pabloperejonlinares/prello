'use client'
import { useRouter } from "next/navigation"
import type { JSX, MouseEvent } from 'react'
import { useRef, useTransition } from 'react';
import { TaskItem } from '@/types/task';
import { Trash, Edit } from 'grommet-icons';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";

export default function Task(props: TaskItem): JSX.Element {
  const router = useRouter()
  const { id, title, description, state } = props
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [ isPending, startTransition ] = useTransition()
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

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

  const editTask = async () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({title, description, state}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.refresh() // refrescar la página para evitar datos cacheados
    onClose() // cerrar el modal
  } 

  return (
      <>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs">{description}</p>
        {state === 'DONE'
          ? <Trash className='cursor-pointer place-self-end' onClick={deleteTask} size="small" color='red'/>
          : <Edit onClick={onOpen} className='cursor-pointer place-self-end' size="small"/>}
        <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Edit task</ModalHeader>
                <ModalBody>
                <label htmlFor="title" className="font-bold text-sm">Task title</label>
                <input ref={titleRef} id="title" type='text' placeholder="Título" defaultValue={title}
                  className="border border-gray-400 p-2 mb-4 w-full text-black"></input>
                <label htmlFor="description" className="font-bold text-sm">Task description</label>
                <textarea ref={descriptionRef} id="description" rows={3} placeholder="Descripción" defaultValue={description}
                  className="border border-gray-400 p-2 mb-4 w-full text-black"></textarea>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button isLoading={isPending} color="primary" onPress={() => {
                    startTransition(async () => {
                      await editTask()
                    })
                  }}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}