'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const STORAGE_KEY = 'sst-intro-played'

// Named phases for type clarity
type Phase =
  | 'initial'   // SSR / before mount — no overlay rendered
  | 'skip'      // sessionStorage key already present
  | 'black'     // 0.0s–0.5s: full-screen black, nothing visible
  | 'image'     // 0.5s–1.5s: cinematic image fades in
  | 'logo'      // 1.5s–2.5s: brand name fades in
  | 'tagline'   // 2.5s–4.2s: tagline fades up, holds
  | 'exit'      // 4.2s–5.0s: overlay slides off the top
  | 'done'      // 5.0s+: overlay removed from DOM

const ACTIVE: Phase[] = ['black', 'image', 'logo', 'tagline', 'exit']
const hasImage: Phase[] = ['image', 'logo', 'tagline', 'exit']
const hasLogo: Phase[] = ['logo', 'tagline', 'exit']
const hasTagline: Phase[] = ['tagline', 'exit']

export function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('initial')

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setPhase('skip')
      return
    }

    setPhase('black')

    const timers = [
      setTimeout(() => setPhase('image'),   500),
      setTimeout(() => setPhase('logo'),   1500),
      setTimeout(() => setPhase('tagline'), 2500),
      setTimeout(() => setPhase('exit'),   4200),
      setTimeout(() => {
        setPhase('done')
        sessionStorage.setItem(STORAGE_KEY, '1')
      }, 5200),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  // Skip the overlay entirely when not needed
  if (!ACTIVE.includes(phase)) {
    return <>{children}</>
  }

  const imageVisible = hasImage.includes(phase)
  const logoVisible  = hasLogo.includes(phase)
  const taglineVisible = hasTagline.includes(phase)
  const sliding = phase === 'exit'

  return (
    <>
      {/* Page content renders underneath from the start */}
      {children}

      {/* Intro overlay — sits above everything including the navbar */}
      <div
        aria-hidden="true"
        className="fixed inset-0 overflow-hidden"
        style={{
          zIndex: 9999,
          transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
          transition: sliding
            ? 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'transform 0s',
        }}
      >
        {/* Black base — always present so the image fades in on top of it */}
        <div className="absolute inset-0 bg-black" />

        {/* Cinematic image layer */}
        <div
          className="absolute inset-0"
          style={{
            opacity: imageVisible ? 1 : 0,
            transition: 'opacity 1s ease-in',
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920"
            alt=""
            fill
            className="object-cover"
            priority
            style={{
              animation: imageVisible
                ? 'sst-kenburns 5s ease-out forwards'
                : 'none',
            }}
          />
          {/* 60% dark overlay for cinematic mood */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Centered brand text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          {/* Logo */}
          <p
            className="font-display text-offwhite"
            style={{
              fontSize: 'clamp(1.8rem, 5.5vw, 4.5rem)',
              letterSpacing: '0.1em',
              opacity: logoVisible ? 1 : 0,
              transition: 'opacity 1s ease-in',
            }}
          >
            Short Sleeve Travel
          </p>

          {/* Tagline */}
          <p
            className="font-body text-sand uppercase"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.32em',
              opacity: taglineVisible ? 1 : 0,
              transform: taglineVisible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity 0.8s ease-in, transform 0.8s ease-out',
            }}
          >
            Adventure is better together.
          </p>
        </div>
      </div>
    </>
  )
}
