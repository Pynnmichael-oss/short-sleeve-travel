import Link from 'next/link'

const navLinks = [
  { href: '/experiences', label: 'Experiences' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-charcoal text-warmwhite">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-display text-2xl text-sand hover:text-offwhite transition-colors"
            >
              Short Sleeve Travel
            </Link>
            <p className="mt-3 text-sm text-warmwhite/50 leading-relaxed">
              Adventure is better together. Small groups, big landscapes, real
              connections.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-warmwhite/40 mb-1">
              Explore
            </p>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-warmwhite/70 hover:text-sand transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-warmwhite/40 mb-1">
              Get in touch
            </p>
            <Link
              href="/contact"
              className="text-sm text-warmwhite/70 hover:text-sand transition-colors"
            >
              Contact us
            </Link>
            <a
              href="https://instagram.com"
              className="text-sm text-warmwhite/70 hover:text-sand transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-warmwhite/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-warmwhite/30">
          <span>© {new Date().getFullYear()} Short Sleeve Travel</span>
          <span>Built for people who actually go.</span>
        </div>
      </div>
    </footer>
  )
}
