'use client'

import { useRouter } from "next/navigation"
import type { JSX } from 'react'
import { useState, useTransition, useEffect } from 'react';
import { TaskItem } from '@/types';
import { Trash, Edit } from 'grommet-icons';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, useDisclosure } from "@heroui/react";
import { deleteTaskService, updateTaskService } from '@/services';

export function Task(props: TaskItem): JSX.Element {
  const router = useRouter()
  const { id, title, description, state } = props
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const { isOpen: isOpenDeleteConfirm, onOpen: onOpenDeleteConfirm, onClose: onCloseDeleteConfirm, onOpenChange: onOpenChangeDeleteConfirm } = useDisclosure()
  const [ isPending, startTransition ] = useTransition()
  const [ isDeleting, setIsDeleting ] = useState(false)
  const [ editTitle, setEditTitle ] = useState(title)
  const [ editDescription, setEditDescription ] = useState(description)

  useEffect(() => {
    if (isOpen) {
      setEditTitle(title)
      setEditDescription(description)
    }
  }, [isOpen, title, description])

  const deleteTask = async () => {
    setIsDeleting(true)
    try {
      await deleteTaskService(id)
      router.refresh()
      onCloseDeleteConfirm()
    } finally {
      setIsDeleting(false)
    }
  }

  const editTask = async () => {
    await updateTaskService(id, editTitle, editDescription, state)
    router.refresh()
    onClose()
  } 

  return (
      <>
        <h3 className="font-semibold text-pastel-text">{title}</h3>
        <p className="text-xs text-pastel-muted">{description}</p>
        {state === 'DONE'
          ? <span className="inline-block place-self-end [&_svg]:size-3 [&_svg]:shrink-0"><Trash className="cursor-pointer text-danger" onClick={onOpenDeleteConfirm} size="small" /></span>
          : <span className="inline-block place-self-end [&_svg]:size-3 [&_svg]:shrink-0"><Edit onClick={onOpen} className="cursor-pointer text-pastel-muted hover:text-pastel-todo" size="small" /></span>}
        <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Edit task</ModalHeader>
                <ModalBody>
                <Input
                  label="Task title"
                  placeholder="Title"
                  value={editTitle}
                  onValueChange={setEditTitle}
                  variant="bordered"
                  className="mb-4"
                />
                <Textarea
                  label="Task description"
                  placeholder="Description"
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
        <Modal isOpen={isOpenDeleteConfirm} onOpenChange={onOpenChangeDeleteConfirm}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Delete task</ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete this task?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose} isDisabled={isDeleting}>
                    Cancel
                  </Button>
                  <Button color="danger" onPress={() => deleteTask()} isLoading={isDeleting}>
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}
