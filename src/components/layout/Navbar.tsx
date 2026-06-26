'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/trips', label: 'Trips' },
  { href: '/where-we-ve-been', label: "Where We've Been" },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sst-nav shadow-md">
      <nav
        className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-lg text-white tracking-wide hover:text-sst-sand transition-colors duration-200"
        >
          Short Sleeve Travel
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-body uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/trips"
            className="flex items-center gap-1.5 text-xs font-body uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-200"
          >
            <UserIcon />
            Login
          </Link>
          <Link
            href="/trips"
            className="text-xs font-body uppercase tracking-widest bg-sst-amber text-white px-5 py-2.5 hover:bg-amber-600 transition-colors duration-200"
          >
            View Trips
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-sst-nav border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-body uppercase tracking-widest text-white/80 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/trips"
            className="flex items-center gap-1.5 text-xs font-body uppercase tracking-widest text-white/80 hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            <UserIcon />
            Login
          </Link>
          <Link
            href="/trips"
            className="text-xs font-body uppercase tracking-widest bg-sst-amber text-white px-5 py-3 text-center hover:bg-amber-600 transition-colors"
            onClick={() => setOpen(false)}
          >
            View Trips
          </Link>
        </div>
      )}
    </header>
  )
}
