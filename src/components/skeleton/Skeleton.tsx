'use client'

import { ReactNode } from 'react';
import { Card, CardHeader, Skeleton } from '@heroui/react';

const SKELETON_TASKS_COUNT = 3;

interface PanelSkeletonProps {
  title: string;
}

function getTopBorderClass(title: string): string {
  if (title === 'TO DO') return 'border-t-4 border-t-pastel-todo';
  if (title === 'IN PROGRESS') return 'border-t-4 border-t-pastel-progress';
  if (title === 'DONE') return 'border-t-4 border-t-pastel-done';
  return '';
}

export function PanelSkeleton(props: PanelSkeletonProps): ReactNode {
  return (
    <Card
      className={`flex flex-col gap-3 basis-1/5 h-140 border-2 border-pastel-border overflow-hidden bg-white/90 backdrop-blur-sm shadow-md ${getTopBorderClass(props.title)}`}
      shadow="md"
      radius="lg"
    >
      <CardHeader className="flex flex-col gap-0 py-3 shrink-0 bg-gradient-to-b from-white/90 to-pastel-cream/50">
        <h2 className="font-bold text-center text-lg text-pastel-text">{props.title}</h2>
      </CardHeader>
      <div className="flex flex-col items-center gap-3 flex-1 min-h-0 overflow-y-auto pb-4">
        {Array.from({ length: SKELETON_TASKS_COUNT }).map((_, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center w-5/6 py-4 px-4 rounded-lg shadow-sm bg-white/95 border border-pastel-border gap-2"
          >
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-full h-3 rounded-md" />
            <Skeleton className="w-3/4 h-3 rounded-md self-start" />
          </div>
        ))}
        <div className="min-h-4 shrink-0" aria-hidden />
      </div>
    </Card>
  );
}
