'use client'

import { Draggable } from '@/components'
import { ProtectedRoute } from './ProtectedRoute'
import type { TaskItem } from '@/types'

type MainPageContentProps = {
  todoTasks: TaskItem[]
  progressTasks: TaskItem[]
  doneTasks: TaskItem[]
}

export function MainPageContent({
  todoTasks,
  progressTasks,
  doneTasks,
}: MainPageContentProps) {
  return (
    <ProtectedRoute>
      <Draggable
        todoTasks={todoTasks}
        progressTasks={progressTasks}
        doneTasks={doneTasks}
      />
    </ProtectedRoute>
  )
}
