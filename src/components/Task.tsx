'use client'
import { useRouter } from "next/navigation"
import type { JSX, MouseEvent } from 'react'
import { useState, useTransition, useEffect } from 'react';
import { TaskItem } from '@/types/task';
import { Trash, Edit } from 'grommet-icons';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, useDisclosure } from "@heroui/react";

export default function Task(props: TaskItem): JSX.Element {
  const router = useRouter()
  const { id, title, description, state } = props
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [ isPending, startTransition ] = useTransition()
  const [ editTitle, setEditTitle ] = useState(title)
  const [ editDescription, setEditDescription ] = useState(description)

  useEffect(() => {
    if (isOpen) {
      setEditTitle(title)
      setEditDescription(description)
    }
  }, [isOpen, title, description])

  const deleteTask = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    router.refresh()
  }

  const editTask = async () => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: editTitle, description: editDescription, state }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.refresh()
    onClose()
  } 

  return (
      <>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-default-500">{description}</p>
        {state === 'DONE'
          ? <span className="inline-block place-self-end [&_svg]:size-3 [&_svg]:shrink-0"><Trash className="cursor-pointer text-danger" onClick={deleteTask} size="small" /></span>
          : <span className="inline-block place-self-end [&_svg]:size-3 [&_svg]:shrink-0"><Edit onClick={onOpen} className="cursor-pointer text-default-500" size="small" /></span>}
        <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Edit task</ModalHeader>
                <ModalBody>
                <Input
                  label="Task title"
                  placeholder="Título"
                  value={editTitle}
                  onValueChange={setEditTitle}
                  variant="bordered"
                  className="mb-4"
                />
                <Textarea
                  label="Task description"
                  placeholder="Descripción"
                  value={editDescription}
                  onValueChange={setEditDescription}
                  variant="bordered"
                  minRows={3}
                />
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