'use client'

import { Card, CardBody, CardHeader, Button, Input } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/providers/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (login(username, password)) {
      router.push('/')
      router.refresh()
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md" shadow="md" radius="lg">
        <CardHeader className="flex flex-col gap-1 px-6 pt-6 pb-0">
          <h1 className="text-xl font-bold">Iniciar sesión</h1>
          <p className="text-sm text-default-500">
            Introduce tus credenciales para acceder
          </p>
        </CardHeader>
        <CardBody className="gap-4 px-6 pb-6 pt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Usuario"
              placeholder="Usuario"
              value={username}
              onValueChange={setUsername}
              isRequired
              autoComplete="username"
              variant="bordered"
            />
            <Input
              label="Contraseña"
              placeholder="Contraseña"
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
              Entrar
            </Button>
          </form>
          <p className="text-center text-small text-default-400">
            ¿No tienes cuenta?{' '}
            <Link href="/" className="text-primary hover:underline">
              Volver al inicio
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
