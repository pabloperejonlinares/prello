export async function createTaskService(title: string, description: string) {
  await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function deleteTaskService(id: number): Promise<void> {
  await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function updateTaskService(id: number, title: string, description: string, state: string): Promise<void> {
  await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description, state }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
