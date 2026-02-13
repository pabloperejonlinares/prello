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

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <HeroNavbar isBordered isBlurred maxWidth="xl" className="border-b border-zinc-300">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-extrabold text-inherit">
            PRELLO
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/about" className="font-semibold">
            About
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          {user ? (
            <div className="relative group">
              <span className="text-sm font-semibold cursor-default py-2 px-1">
                {user.username}
              </span>
              <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-10">
                <div className="bg-content1 border border-default-200 rounded-lg shadow-lg py-1 min-w-[8rem]">
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    className="w-full justify-start font-semibold"
                    onPress={logout}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </div>
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
