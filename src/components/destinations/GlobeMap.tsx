'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const BASE_PATH = '/short-sleeve-travel'

export interface GlobeTrip {
  _id: string
  title: string
  slug: { current: string }
  location?: { lat: number; lng: number } | null
}

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
  .sst-past-marker {
    position: relative;
    width: 18px;
    height: 18px;
    cursor: default;
  }
  .sst-past-marker-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #E8A020;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 3px rgba(232, 160, 32, 0.25);
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
  .sst-tooltip {
    background: rgba(26, 43, 60, 0.92);
    color: #C8A97E;
    font-size: 11px;
    font-family: system-ui, -apple-system, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 5px 10px;
    border: 1px solid rgba(200, 169, 126, 0.35);
    white-space: nowrap;
  }
`

export function GlobeMap({ trips }: { trips: GlobeTrip[] }) {
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

        // Past trip markers — pulsing + popup linking to the trip detail page
        trips
          .filter(
            (trip): trip is GlobeTrip & { location: { lat: number; lng: number } } =>
              trip.location?.lat != null && trip.location?.lng != null
          )
          .forEach((trip) => {
            if (!map) return
            const coordinates: [number, number] = [trip.location.lng, trip.location.lat]

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
                <h3 class="sst-popup-title">${trip.title}</h3>
                <a class="sst-popup-link" href="${BASE_PATH}/trips/${trip.slug.current}">View Trip &rarr;</a>
              </div>
            `)

            el.addEventListener('click', () => {
              map?.flyTo({ center: coordinates, zoom: 5, duration: 1800, essential: true })
            })

            new mapboxgl.Marker({ element: el })
              .setLngLat(coordinates)
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
  }, [trips])

  return (
    <div className="relative bg-[#1a1a1a]">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sst-navy to-transparent z-10 pointer-events-none" />
      <div
        ref={containerRef}
        className="h-[400px] md:h-[600px] w-full"
        aria-label="Interactive globe showing past trip destinations"
      />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sst-nav to-transparent z-10 pointer-events-none" />
    </div>
  )
}
