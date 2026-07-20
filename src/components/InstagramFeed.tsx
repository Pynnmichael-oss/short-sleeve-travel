'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

// TODO: stopgap using Mirror's free/trial tier for the live Instagram embed.
// Once the site migrates to Netlify, replace this with a self-hosted Netlify
// Function pulling directly from the Instagram Graph API for full styling control.

const MIRROR_BRIDGE_SRC =
  'https://cdn.jsdelivr.net/npm/@mirrorapp/iframe-bridge@latest/dist/index.umd.js'
const MIRROR_FEED_SRC =
  'https://app.mirror-app.com/feed-instagram/030d3de6-fe4e-4de1-ba10-5dd134eb0d13/preview'
const INSTAGRAM_PROFILE_URL = 'https://instagram.com/shortsleevetravel'

declare global {
  interface Window {
    iFrameSetup?: (iframe: HTMLIFrameElement) => void
  }
}

export function InstagramFeed() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  function setupBridge() {
    if (iframeRef.current && typeof window.iFrameSetup === 'function') {
      window.iFrameSetup(iframeRef.current)
    }
  }

  useEffect(() => {
    // In case the script tag already fired onLoad before this effect ran
    // (e.g. fast refresh, cached script), try wiring up the bridge now too.
    setupBridge()
  }, [])

  return (
    <section className="bg-sst-surface py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-sst-navy mb-10">
          Follow the Journey
        </h2>

        <iframe
          ref={iframeRef}
          src={MIRROR_FEED_SRC}
          style={{ width: '100%', border: 'none', overflow: 'hidden' }}
          scrolling="no"
        />

        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-sm text-sst-navy/60 hover:text-sst-navy mt-6 tracking-wide"
        >
          @shortsleevetravel on Instagram
        </a>
      </div>

      <Script
        src={MIRROR_BRIDGE_SRC}
        strategy="afterInteractive"
        onLoad={setupBridge}
      />
    </section>
  )
}
