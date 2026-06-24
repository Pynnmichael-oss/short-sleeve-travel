'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const BASE_PATH = '/short-sleeve-travel'

const DESTINATIONS = [
  {
    coordinates: [172.6362, -40.9006] as [number, number],
    name: 'New Zealand Adventure',
    destination: 'New Zealand',
    duration: '13 Days',
    price: 'From $2,595',
    slug: 'new-zealand-adventure',
  },
  {
    coordinates: [138.2529, 36.2048] as [number, number],
    name: 'Spirit of Japan',
    destination: 'Japan',
    duration: '7 Days',
    price: 'From $1,595',
    slug: 'spirit-of-japan',
  },
  {
    coordinates: [-7.0926, 31.7917] as [number, number],
    name: 'Morocco Uncovered',
    destination: 'Morocco',
    duration: '9 Days',
    price: 'From $1,195',
    slug: 'morocco-uncovered',
  },
]

const INJECTED_STYLES = `
  @keyframes sst-globe-pulse {
    0%   { transform: scale(0.8); opacity: 0.9; }
    100% { transform: scale(2.8); opacity: 0; }
  }
  .sst-marker {
    position: relative;
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
  .sst-marker-outer {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(212, 98, 42, 0.35);
    animation: sst-globe-pulse 2.2s ease-out infinite;
  }
  .sst-marker-inner {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #D4622A;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 2px rgba(212, 98, 42, 0.5);
  }
  .mapboxgl-popup-content {
    background: transparent !important;
    box-shadow: none !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }
  .mapboxgl-popup-tip {
    display: none !important;
  }
  .mapboxgl-popup-close-button {
    color: #C8A97E !important;
    font-size: 20px !important;
    top: 10px !important;
    right: 12px !important;
    background: none !important;
    border: none !important;
    line-height: 1 !important;
    padding: 0 !important;
  }
  .mapboxgl-popup-close-button:hover {
    color: #F5F0E8 !important;
    background: none !important;
  }
  .sst-popup {
    background: #2A2A2A;
    border: 1px solid #C8A97E;
    padding: 20px 36px 20px 20px;
    min-width: 230px;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .sst-popup-title {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    font-size: 16px;
    color: #F5F0E8;
    margin: 0 0 5px;
    line-height: 1.3;
  }
  .sst-popup-dest {
    font-size: 11px;
    color: #C8A97E;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 10px;
  }
  .sst-popup-meta {
    font-size: 12px;
    color: rgba(245, 240, 232, 0.7);
    margin: 0 0 14px;
  }
  .sst-popup-link {
    display: inline-block;
    color: #D4622A;
    font-size: 12px;
    text-decoration: none;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 500;
  }
  .sst-popup-link:hover {
    color: #e8733b;
  }
`

export function GlobeMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (typeof window === 'undefined' || !containerRef.current || !token) return

    mapboxgl.accessToken = token

    const styleEl = document.createElement('style')
    styleEl.id = 'sst-globe-styles'
    styleEl.textContent = INJECTED_STYLES
    document.head.appendChild(styleEl)

    const isMobile = window.innerWidth < 768

    let map: mapboxgl.Map | null = null

    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        zoom: 1.8,
        scrollZoom: false,
        dragRotate: !isMobile,
        pitchWithRotate: false,
        projection: { name: 'globe' },
      })

      map.on('load', () => {
        if (!map) return
        map.setFog({
          color: 'rgb(20, 20, 20)',
          'high-color': 'rgb(44, 74, 62)',
          'horizon-blend': 0.025,
          'space-color': 'rgb(6, 6, 6)',
          'star-intensity': 0.55,
        })

        DESTINATIONS.forEach((dest) => {
          if (!map) return
          const el = document.createElement('div')
          el.className = 'sst-marker'
          el.innerHTML = `
            <div class="sst-marker-outer"></div>
            <div class="sst-marker-inner"></div>
          `

          const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false,
            offset: 18,
            maxWidth: '300px',
            anchor: 'bottom',
          }).setHTML(`
            <div class="sst-popup">
              <h3 class="sst-popup-title">${dest.name}</h3>
              <p class="sst-popup-dest">${dest.destination}</p>
              <p class="sst-popup-meta">${dest.duration} &middot; ${dest.price}</p>
              <a class="sst-popup-link" href="${BASE_PATH}/experiences/${dest.slug}">View Trip &rarr;</a>
            </div>
          `)

          el.addEventListener('click', () => {
            map?.flyTo({
              center: dest.coordinates,
              zoom: 5,
              duration: 1800,
              essential: true,
            })
          })

          new mapboxgl.Marker({ element: el })
            .setLngLat(dest.coordinates)
            .setPopup(popup)
            .addTo(map)
        })
      })
    } catch {
      document.getElementById('sst-globe-styles')?.remove()
      return
    }

    return () => {
      map?.remove()
      document.getElementById('sst-globe-styles')?.remove()
    }
  }, [])

  return (
    <div className="relative bg-[#1a1a1a]">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-charcoal to-transparent z-10 pointer-events-none" />
      <div
        ref={containerRef}
        className="h-[400px] md:h-[600px] w-full"
        aria-label="Interactive globe showing past trip destinations"
      />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-forest to-transparent z-10 pointer-events-none" />
    </div>
  )
}
