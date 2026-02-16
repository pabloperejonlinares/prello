'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

const AUTH_STORAGE_KEY = 'prello-auth-user'

export type AuthUser = { username: string }

type AuthContextValue = {
  user: AuthUser | null
  isReady: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const MOCK_USER = 'Admin'
const MOCK_PASSWORD = '1234'

function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    return parsed?.username ? parsed : null
  } catch {
    return null
  }
}

function setStoredUser(user: AuthUser | null) {
  if (typeof window === 'undefined') return
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setUser(getStoredUser())
    setIsReady(true)
  }, [])

  const login = useCallback((username: string, password: string): boolean => {
    if (username === MOCK_USER && password === MOCK_PASSWORD) {
      const authUser: AuthUser = { username }
      setUser(authUser)
      setStoredUser(authUser)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setStoredUser(null)
  }, [])

  const value: AuthContextValue = { user, isReady, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
