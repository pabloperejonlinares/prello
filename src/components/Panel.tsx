'use client'
import { JSX, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from "next/navigation";
import { Card, CardHeader, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, useDisclosure } from "@heroui/react";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import Task from "./Task"
import { TaskItem } from '@/types/task';

interface PanelProps {
  title: string;
  tasks: TaskItem[];
}

function DraggableTask({ item }: { item: TaskItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return draggable({
      element: el,
      getInitialData: () => ({ taskId: item.id }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [item.id]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center w-5/6 py-4 px-4 rounded-lg shadow-sm bg-content1 border border-zinc-300 ${isDragging ? 'opacity-50' : ''}`}
    >
      <Task
        id={item.id}
        title={item.title}
        description={item.description}
        state={item.state}
      />
    </div>
  );
}

export default function Panel(props: PanelProps): JSX.Element {
  const router = useRouter()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [ title, setTitle ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  const [ isPending, startTransition ] = useTransition()
  const columnRef = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;
    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId: props.title }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, [props.title]);

  const createTask = async () => {
    await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({title, description}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.refresh()
    onClose()
  }

  return (
    <Card className={`flex flex-col gap-3 basis-1/5 min-h-[35rem] h-fit border transition-colors ${isDraggedOver ? 'border-primary bg-primary/5' : 'border-zinc-300'}`} shadow="md" radius="lg">
      <CardHeader className="flex flex-col gap-0 py-3">
        <h2 className="font-bold text-center text-lg">{props.title}</h2>
      </CardHeader>
      <div
        ref={columnRef}
        className="flex flex-col items-center gap-3"
      >
        {props.tasks.map((item: TaskItem) => (
          <DraggableTask key={item.id} item={item} />
        ))}
      </div>
      {props.title === 'TO DO'
        ? <div className="flex flex-col items-center w-5/6 py-4 rounded-lg shadow-sm bg-content1 border border-zinc-300 self-center">
        <Button className="font-semibold" onPress={onOpen}>New Task</Button>
        <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">New Task</ModalHeader>
                <ModalBody>
                <Input
                  label="Task title"
                  placeholder="Título"
                  value={title}
                  onValueChange={setTitle}
                  variant="bordered"
                  className="mb-4"
                />
                <Textarea
                  label="Task description"
                  placeholder="Descripción"
                  value={description}
                  onValueChange={setDescription}
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
                      await createTask()
                    })
                  }}>
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    : null}
    </Card>
  )
}
