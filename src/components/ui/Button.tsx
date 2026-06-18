import Link from 'next/link'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
}

const base = 'inline-block px-8 py-3 text-sm tracking-wide transition-colors duration-200'
const variants = {
  primary: 'bg-burnt text-warmwhite hover:bg-burnt/90',
  outline: 'border border-forest text-forest hover:bg-forest hover:text-warmwhite',
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
