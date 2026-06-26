import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/trips', label: 'Trips' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-sst-navy text-sst-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <div className="md:w-48 shrink-0">
            <Link
              href="/"
              className="font-display text-xl text-sst-white hover:text-sst-sand transition-colors duration-200"
            >
              Short Sleeve Travel
            </Link>
          </div>

          {/* Centered nav */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center md:flex-1"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-sst-white/60 hover:text-sst-white transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Instagram */}
          <div className="md:w-48 md:text-right shrink-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sst-white/60 hover:text-sst-sand transition-colors duration-200"
            >
              Follow the adventure →
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-sst-white/10 pt-6 text-xs text-sst-white/30 text-center">
          © 2025 Short Sleeve Travel. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
