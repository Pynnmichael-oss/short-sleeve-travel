'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const STORAGE_KEY = 'sst-intro-played'

type Phase =
  | 'initial'   // before useEffect — render nothing
  | 'skip'      // sessionStorage key present — render nothing
  | 'black'     // 0.0–0.5s: full-screen black
  | 'image'     // 0.5–1.5s: cinematic image fades in
  | 'logo'      // 1.5–2.5s: brand name fades in
  | 'tagline'   // 2.5–4.2s: tagline drifts up, holds
  | 'exit'      // 4.2–5.0s: curtain slides off the top
  | 'done'      // 5.0s+: unmount overlay

const hasImage:   Phase[] = ['image', 'logo', 'tagline', 'exit']
const hasLogo:    Phase[] = ['logo', 'tagline', 'exit']
const hasTagline: Phase[] = ['tagline', 'exit']
const showOverlay: Phase[] = ['black', 'image', 'logo', 'tagline', 'exit']

// No children prop — the overlay is a fixed sibling in the DOM,
// not a wrapper. The page content renders beneath it naturally.
export function IntroAnimation() {
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

  if (!showOverlay.includes(phase)) return null

  const imageVisible   = hasImage.includes(phase)
  const logoVisible    = hasLogo.includes(phase)
  const taglineVisible = hasTagline.includes(phase)
  const sliding        = phase === 'exit'

  return (
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
      {/* Black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Cinematic image with Ken Burns zoom */}
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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Centered brand text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
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
  )
}
