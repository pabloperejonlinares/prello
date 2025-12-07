'use client'
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="mx-auto flex w-full items-center justify-between p-6 lg:px-8 bg-blue-300" aria-label="Global">
      <div className="flex lg:flex-1 font-extrabold">
        <Link href='/'>
          PRELLO
        </Link>
      </div>
      <div className="flex font-bold">
        <Link href='/about'>
          About
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  )
}