'use client'
import { ReactNode } from 'react';
import { Card, CardHeader, Skeleton } from "@heroui/react";

interface PanelSkeletonProps {
  title: string;
  tasks: number;
}

export default function PanelSkeleton(props: PanelSkeletonProps): ReactNode {
  return (
    <Card className="flex flex-col gap-3 basis-1/5 min-h-[35rem] h-fit border border-zinc-300" shadow="md" radius="lg">
      <CardHeader className="flex flex-col gap-0 py-3">
        <h2 className="font-bold text-center text-lg">{props.title}</h2>
      </CardHeader>
      <div className="flex flex-col items-center gap-3">
        {Array.from({ length: props.tasks }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex flex-col items-center w-5/6 py-4 px-4 rounded-lg shadow-sm border border-zinc-300"
          >
            <div className="w-full h-12 rounded-md" />
          </Skeleton>
        ))}
      </div>
    </Card>
  );
}
