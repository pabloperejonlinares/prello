'use client'

import { Card, CardBody, CardHeader, Button, Input } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login, user, isReady } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isReady && user) {
      router.replace('/')
    }
  }, [isReady, user, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (login(username, password)) {
      router.push('/')
      router.refresh()
    } else {
      setError('Incorrect username or password')
    }
  }

  if (isReady && user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <p className="text-default-500">Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md" shadow="md" radius="lg">
        <CardHeader className="flex flex-col gap-1 px-6 pt-6 pb-0">
          <h1 className="text-xl font-bold">Log in</h1>
          <p className="text-sm text-default-500">
            Enter your credentials to access
          </p>
        </CardHeader>
        <CardBody className="gap-4 px-6 pb-6 pt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Username"
              placeholder="Admin"
              value={username}
              onValueChange={setUsername}
              isRequired
              autoComplete="username"
              variant="bordered"
            />
            <Input
              label="Password"
              placeholder="1234"
              type="password"
              value={password}
              onValueChange={setPassword}
              isRequired
              autoComplete="current-password"
              variant="bordered"
            />
            {error && (
              <p className="text-sm text-danger">{error}</p>
            )}
            <Button type="submit" color="primary" className="font-semibold">
              Log in
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
