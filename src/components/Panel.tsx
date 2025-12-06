'use client'
import { JSX, useState } from 'react';
import { useRouter } from "next/navigation"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
import { Droppable, Draggable } from '@hello-pangea/dnd';
import Task from "./Task"
import { TaskItem } from '@/types/task';

interface PanelProps {
  title: string;
  tasks: TaskItem[];
}

export default function Panel(props: PanelProps): JSX.Element {
  const router = useRouter()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const createTask = async () => {
    await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({title, description}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.refresh() // refrescar la página para evitar datos cacheados
    onClose() // cerrar el modal
  
  } 

  return (
    <div className="flex flex-col gap-3 basis-1/5 min-h-[35rem] bg-blue-300 h-fit">
      <h2 className="font-bold text-center mt-3">{props.title}</h2>
        <Droppable droppableId={props.title}>
        {(provided: any, snapshot: any) => (
          <div
            ref={provided.innerRef}
            className="flex flex-col items-center gap-3"
            {...provided.droppableProps}
          >
            {props.tasks.map((item: TaskItem, index: number) => (
              <Draggable
                key={item.id}
                draggableId={String(item.id)}
                index={index}
              >
                {(provided: any, snapshot: any) => (
                  <div
                    ref={provided.innerRef}
                    className='flex flex-col items-center w-5/6 py-4 rounded shadow-md bg-white'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      state={item.state}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
        </Droppable>
        {props.title === 'TO DO'
          ? <div className="flex flex-col items-center w-5/6 py-4 rounded shadow-md bg-white self-center">
          <Button className="font-semibold" onPress={onOpen}>New Task</Button>
          <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">New Task</ModalHeader>
                  <ModalBody>
                  <label htmlFor="title" className="font-bold text-sm">Título de la tarea</label>
                  <input id="title" type='text' placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-400 p-2 mb-4 w-full text-black"></input>
                  <label htmlFor="description" className="font-bold text-sm">Descripción de la tarea</label>
                  <textarea id="description" rows={3} placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-400 p-2 mb-4 w-full text-black"></textarea>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={createTask}>
                      Create
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      : null}
    </div>
  )
}