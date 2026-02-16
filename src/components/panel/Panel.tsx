'use client'

import { JSX, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, useDisclosure } from '@heroui/react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { TaskItem } from '@/types';
import { createTaskService } from '@/services';
import { DraggableTask } from '@/components';

interface PanelProps {
  title: string;
  tasks: TaskItem[];
  noOpDropTaskId?: number | null;
}

export function Panel(props: PanelProps): JSX.Element {
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
    await createTaskService(title, description)
    router.refresh()
    onClose()
  }

  return (
    <Card
      className={`flex flex-col gap-3 basis-1/5 h-140 border-2 transition-all duration-200 overflow-hidden bg-white/90 backdrop-blur-sm ${isDraggedOver ? `shadow-lg scale-[1.02] ${props.title === 'TO DO' ? 'border-pastel-todo shadow-pastel-todo/20' : ''}${props.title === 'IN PROGRESS' ? 'border-pastel-progress shadow-pastel-progress/20' : ''}${props.title === 'DONE' ? 'border-pastel-done shadow-pastel-done/20' : ''}` : 'border-pastel-border shadow-md'} ${props.title === 'TO DO' ? 'border-t-4 border-t-pastel-todo' : ''} ${props.title === 'IN PROGRESS' ? 'border-t-4 border-t-pastel-progress' : ''} ${props.title === 'DONE' ? 'border-t-4 border-t-pastel-done' : ''}`}
      shadow='md'
      radius='lg'
    >
      <CardHeader className='flex flex-col gap-0 py-3 shrink-0 bg-gradient-to-b from-white/90 to-pastel-cream/50'>
        <h2 className='font-bold text-center text-lg text-pastel-text'>{props.title}</h2>
      </CardHeader>
      <div
        ref={columnRef}
        className='flex flex-col items-center gap-3 flex-1 min-h-0 overflow-y-auto pb-4'
      >
        {props.tasks.map((item: TaskItem, index: number) => (
          <DraggableTask key={item.id} item={item} columnId={props.title} index={index} noOpDropTaskId={props.noOpDropTaskId} />
        ))}
        {props.title === 'TO DO' && (
          <div className='flex flex-col items-center w-5/6 py-4 rounded-lg shadow-sm bg-white/90 border border-pastel-border self-center shrink-0'>
            <Button className='font-semibold' color='primary' onPress={onOpen}>New Task</Button>
            <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>New Task</ModalHeader>
                    <ModalBody>
                    <Input
                      label='Task title'
                      placeholder='Título'
                      value={title}
                      onValueChange={setTitle}
                      variant='bordered'
                      className='mb-4'
                    />
                    <Textarea
                      label='Task description'
                      placeholder='Descripción'
                      value={description}
                      onValueChange={setDescription}
                      variant='bordered'
                      minRows={3}
                    />
                    </ModalBody>
                    <ModalFooter>
                      <Button color='danger' variant='light' onPress={onClose}>
                        Close
                      </Button>
                      <Button isLoading={isPending} color='primary' onPress={() => {
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
        )}
        <div className='min-h-4 shrink-0' aria-hidden />
      </div>
    </Card>
  )
}
