'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/experiences', label: 'Experiences' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-forest shadow-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-xl text-warmwhite hover:text-sand transition-colors duration-200"
        >
          Short Sleeve Travel
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-warmwhite/80 hover:text-warmwhite transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/experiences"
            className="text-sm bg-burnt text-warmwhite px-5 py-2 hover:bg-burnt/90 transition-colors duration-200"
          >
            View Trips
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-warmwhite p-1"
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
        <div className="md:hidden bg-forest border-t border-warmwhite/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-base text-warmwhite/80 hover:text-warmwhite transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/experiences"
            className="text-sm bg-burnt text-warmwhite px-5 py-3 text-center hover:bg-burnt/90 transition-colors"
            onClick={() => setOpen(false)}
          >
            View Trips
          </Link>
        </div>
      )}
    </header>
  )
}
