'use client'
import { useEffect, useTransition } from 'react';
import Panel from "./Panel"
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useRouter } from "next/navigation"
import { TaskItem } from '@/types/task';
import PanelSkeleton from './Skeleton';

interface DragableProps {
  todoTasks: TaskItem[];
  progressTasks: TaskItem[];
  doneTasks: TaskItem[];
}

export default function Dragable(props: DragableProps) {
  const { todoTasks, progressTasks, doneTasks } = props
  const [ isPending, startTransition ] = useTransition()
  const router = useRouter()

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const taskId = source.data.taskId;
        const newState = destination.data.columnId;

        if (typeof taskId !== 'number' || typeof newState !== 'string') return;

        startTransition(async () => {
          await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ newState }),
            headers: { 'Content-Type': 'application/json' },
          });
          router.refresh();
        });
      },
    });
  }, [router]);

  return (
    <div className="flex items-center justify-evenly mt-14 max-w-screen-2xl px-6 mx-auto w-full">
      {isPending ? (
        <>
          <PanelSkeleton title='TO DO' tasks={todoTasks.length}/>
          <PanelSkeleton title='IN PROGRESS' tasks={progressTasks.length}/>
          <PanelSkeleton title='DONE' tasks={doneTasks.length}/>
        </>
      ) : (
        <>
          <Panel title='TO DO' tasks={todoTasks}/>
          <Panel title='IN PROGRESS' tasks={progressTasks}/>
          <Panel title='DONE' tasks={doneTasks}/>
        </>
      )}
    </div>
  )
}
