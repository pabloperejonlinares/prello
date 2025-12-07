'use client'
import React from 'react';
import {Card, Skeleton} from "@heroui/react";

interface PanelSkeletonProps {
  title: string;
  tasks: number;
}

export default function PanelSkeleton(props: PanelSkeletonProps): React.ReactNode {
  return (
    <Card className="flex flex-col items-center gap-3 basis-1/5 min-h-[35rem] bg-blue-300 h-fit" radius="lg">
      <h2 className="font-bold text-center mt-3">{props.title}</h2>
      <Skeleton className="rounded-lg flex flex-col w-5/6 py-4">
        <div className="py-4 shadow-md" />
      </Skeleton>
    </Card>
  );
}
