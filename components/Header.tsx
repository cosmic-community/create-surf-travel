'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-sand-50/95 backdrop-blur border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-ocean-800 font-bold text-lg"
          >
            <span aria-hidden="true">🌊</span>
            Create Surf Travel
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sand-700 hover:text-ocean-700 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/posts"
              className="text-sand-700 hover:text-ocean-700 font-medium transition-colors"
            >
              Journal
            </Link>
            <Link
              href="/locations"
              className="text-sand-700 hover:text-ocean-700 font-medium transition-colors"
            >
              Destinations
            </Link>
          </nav>
          <button
            className="md:hidden p-2 text-ocean-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-sand-700 hover:text-ocean-700 font-medium"
            >
              Home
            </Link>
            <Link
              href="/posts"
              onClick={() => setIsOpen(false)}
              className="text-sand-700 hover:text-ocean-700 font-medium"
            >
              Journal
            </Link>
            <Link
              href="/locations"
              onClick={() => setIsOpen(false)}
              className="text-sand-700 hover:text-ocean-700 font-medium"
            >
              Destinations
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}