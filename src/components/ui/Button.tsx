import Link from 'next/link'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'outline-light'
  children: React.ReactNode
  className?: string
}

const base = 'inline-block px-8 py-3 text-sm tracking-wide transition-colors duration-200'
const variants = {
  primary: 'bg-sst-amber text-white hover:bg-amber-600',
  outline: 'border border-sst-nav text-sst-nav hover:bg-sst-nav hover:text-sst-white',
  'outline-light': 'border border-sst-white text-sst-white hover:bg-sst-white hover:text-sst-navy',
}

export function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
