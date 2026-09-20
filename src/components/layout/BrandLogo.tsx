import Image from 'next/image'

// Wordmark aspect is 1063:307 (~3.46:1). Callers size it via className,
// e.g. `h-8 md:h-10 w-auto`.
// 'white' for dark backgrounds, 'charcoal' for light ones.
const LOGO_SRC = {
  white: '/short-sleeve-travel/images/logo-white.png',
  charcoal: '/short-sleeve-travel/images/logo-charcoal.png',
} as const

export function BrandLogo({
  variant = 'white',
  className = '',
  priority = false,
}: {
  variant?: keyof typeof LOGO_SRC
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt="The Shortsleeve Travel Club"
      width={1063}
      height={307}
      priority={priority}
      className={className}
    />
  )
}
