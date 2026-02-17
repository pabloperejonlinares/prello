'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthContext'
import { PanelSkeleton } from '@/components'

type ProtectedRouteProps = {
  children: ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const { user, isReady } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isReady) return
    if (!user) {
      router.replace(redirectTo)
    }
  }, [isReady, user, redirectTo, router])

  if (!isReady) {
    return (
      <div className="flex items-center justify-evenly mt-14 max-w-screen-2xl px-6 mx-auto w-full">
        <PanelSkeleton title="TO DO" />
        <PanelSkeleton title="IN PROGRESS" />
        <PanelSkeleton title="DONE" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
