'use client'

import { useEffect, useTransition, useState } from 'react';
import { Panel, PanelSkeleton } from '@/components';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { LayoutGroup } from 'framer-motion';
import { useRouter } from "next/navigation"
import { TaskItem } from '@/types';

interface DraggableProps {
  todoTasks: TaskItem[];
  progressTasks: TaskItem[];
  doneTasks: TaskItem[];
}

export function Draggable(props: DraggableProps) {
  const { todoTasks, progressTasks, doneTasks } = props
  const [ isPending, startTransition ] = useTransition()
  const [noOpDropTaskId, setNoOpDropTaskId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (noOpDropTaskId !== null) {
      const id = requestAnimationFrame(() => setNoOpDropTaskId(null));
      return () => cancelAnimationFrame(id);
    }
  }, [noOpDropTaskId]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const targets = location.current.dropTargets;
        if (!targets.length) return;

        const destination = targets.find((t) => t.data.insertIndex !== undefined) ?? targets[0];
        const taskId = source.data.taskId;
        const newState = destination.data.columnId as string | undefined;
        const sourceColumnId = source.data.columnId as string | undefined;

        if (typeof taskId !== 'number' || typeof newState !== 'string') return;

        const sameColumn = sourceColumnId === newState;
        if (sameColumn) {
          setNoOpDropTaskId(taskId);
          return;
        }

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
    <LayoutGroup>
      <div className="flex items-center justify-evenly mt-14 max-w-screen-2xl px-6 mx-auto w-full">
        {isPending ? (
          <>
            <PanelSkeleton title='TO DO'/>
            <PanelSkeleton title='IN PROGRESS'/>
            <PanelSkeleton title='DONE'/>
          </>
        ) : (
          <>
            <Panel title='TO DO' tasks={todoTasks} noOpDropTaskId={noOpDropTaskId}/>
            <Panel title='IN PROGRESS' tasks={progressTasks} noOpDropTaskId={noOpDropTaskId}/>
            <Panel title='DONE' tasks={doneTasks} noOpDropTaskId={noOpDropTaskId}/>
          </>
        )}
      </div>
    </LayoutGroup>
  )
}
