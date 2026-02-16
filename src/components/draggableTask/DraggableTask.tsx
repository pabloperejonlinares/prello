'use client'

import { useEffect, useRef, useState } from 'react';
import { TaskItem } from '@/types';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { motion } from 'framer-motion';
import { Task } from '@/components';

export function DraggableTask({ item, columnId, index, noOpDropTaskId }: { item: TaskItem; columnId: string; index: number; noOpDropTaskId?: number | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const skipTransition = noOpDropTaskId === item.id;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ taskId: item.id, columnId, index }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: el,
        canDrop: ({ source }) => source.data.taskId !== item.id,
        getIsSticky: () => true,
        getData: ({ input, element }) =>
          attachClosestEdge(
            { taskId: item.id, columnId, insertIndex: index + 1 },
            { input, element, allowedEdges: ['bottom'] }
          ),
      })
    );
  }, [item.id, columnId, index]);

  return (
    <motion.div
      ref={ref}
      layout
      layoutId={String(item.id)}
      transition={skipTransition ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 30 }}
      className={`relative flex flex-col items-center w-5/6 py-4 px-4 rounded-lg shadow-sm bg-white/95 border border-pastel-border hover:shadow-md hover:border-pastel-lavender/80 ${skipTransition ? 'transition-none' : 'transition-all duration-200 ease-out'} ${isDragging ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}
      style={{ transitionProperty: skipTransition ? undefined : 'opacity, transform' }}
    >
      <Task
        id={item.id}
        title={item.title}
        description={item.description}
        state={item.state}
      />
    </motion.div>
  );
}
