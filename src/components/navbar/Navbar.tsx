'use client'

import Link from 'next/link'
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react'
import { useAuth } from '@/providers/AuthContext'

export function Navbar() {
  const { user, isReady, logout } = useAuth()

  return (
    <HeroNavbar isBordered isBlurred maxWidth="xl" className="border-b border-pastel-border bg-white/80 backdrop-blur-md shadow-sm">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-extrabold text-inherit bg-gradient-to-r from-pastel-todo to-pastel-done bg-clip-text text-transparent">
            PRELLO
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="/about" variant="light" className="font-semibold">
            About
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex min-w-[6rem]">
          {!isReady ? (
            <span className="text-sm text-default-400 py-2 px-1 inline-block w-full min-h-[2.25rem]" aria-hidden />
          ) : user ? (
            <Button
              variant="light"
              color="danger"
              className="font-semibold"
              onPress={logout}
            >
              Log out
            </Button>
          ) : (
            <Link href="/login" className="text-sm font-semibold">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}
