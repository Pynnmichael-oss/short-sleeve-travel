'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
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
    transition: opacity 0.15s linear;
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
  .sst-marker-teaser {
    cursor: default;
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

// Teaser-only: mute the Mapbox attribution control's visual weight so it reads
// as a faint legal footnote instead of obvious widget chrome. Scoped to
// .sst-globe-teaser so 'full' mode (Where We've Been) keeps default styling.
// Position/presence of the control itself is untouched — Mapbox ToS requires it.
const TEASER_ATTRIBUTION_STYLES = `
  .sst-globe-teaser .mapboxgl-ctrl-bottom-right {
    font-size: 9px;
    opacity: 0.35;
    transition: opacity 0.2s ease;
  }
  .sst-globe-teaser .mapboxgl-ctrl-bottom-right:hover {
    opacity: 0.55;
  }
  .sst-globe-teaser .mapboxgl-ctrl-attrib a {
    font-size: 9px;
  }
`

export function GlobeMap({
  trips,
  variant = 'full',
}: {
  trips: GlobeTrip[]
  variant?: 'full' | 'teaser'
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (typeof window === 'undefined' || !containerRef.current || !token) return

    mapboxgl.accessToken = token

    const isTeaser = variant === 'teaser'

    const styleEl = document.createElement('style')
    styleEl.id = 'sst-globe-styles'
    styleEl.textContent = isTeaser ? INJECTED_STYLES + TEASER_ATTRIBUTION_STYLES : INJECTED_STYLES
    document.head.appendChild(styleEl)

    const isMobile = window.innerWidth < 768

    let map: mapboxgl.Map | null = null
    let rotateFrame: number | null = null
    let observer: IntersectionObserver | null = null

    // HTML markers (mapboxgl.Marker) are plain positioned DOM elements, not
    // WebGL geometry, so the globe projection does not depth-cull them the
    // way it would a GL circle/symbol layer. Without this, a pin on the
    // far side of the sphere stays visible and lags into view/out of view
    // instead of tracking the horizon. We track every marker's coordinates
    // here and toggle opacity on every 'move' event based on great-circle
    // angular distance from the current camera center.
    const markerRecords: { marker: mapboxgl.Marker; lngLat: [number, number] }[] = []

    const angularDistanceDeg = (
      lng1: number,
      lat1: number,
      lng2: number,
      lat2: number
    ) => {
      const rad = Math.PI / 180
      const phi1 = lat1 * rad
      const phi2 = lat2 * rad
      const deltaPhi = (lat2 - lat1) * rad
      const deltaLambda = (lng2 - lng1) * rad
      const a =
        Math.sin(deltaPhi / 2) ** 2 +
        Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return c * (180 / Math.PI)
    }

    const updateMarkerVisibility = () => {
      if (!map || markerRecords.length === 0) return
      const center = map.getCenter()
      markerRecords.forEach(({ marker, lngLat }) => {
        const distance = angularDistanceDeg(center.lng, center.lat, lngLat[0], lngLat[1])
        const onFarSide = distance > 90
        const el = marker.getElement()
        el.style.opacity = onFarSide ? '0' : '1'
        el.style.pointerEvents = onFarSide ? 'none' : ''
      })
    }

    const goToGlobePage = () => {
      // next/navigation's router auto-applies basePath, unlike the raw <a> tags
      // used in the popup HTML below (which do need BASE_PATH prefixed manually).
      router.push('/where-we-ve-been')
    }

    const stopRotation = () => {
      if (rotateFrame != null) {
        cancelAnimationFrame(rotateFrame)
        rotateFrame = null
      }
    }

    const startRotation = () => {
      if (!map || rotateFrame != null) return
      const rotate = () => {
        if (!map) return
        const center = map.getCenter()
        center.lng -= 0.05
        map.setCenter(center)
        rotateFrame = requestAnimationFrame(rotate)
      }
      rotateFrame = requestAnimationFrame(rotate)
    }

    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        // Teaser sits smaller and more zoomed-out than the full page's globe,
        // so it reads as a floating orb with room to breathe, not a canvas
        // that fills its box edge-to-edge.
        zoom: isTeaser ? 1.05 : 1.8,
        scrollZoom: false,
        dragRotate: isTeaser ? false : !isMobile,
        pitchWithRotate: false,
        interactive: !isTeaser,
        projection: { name: 'globe' },
      })

      map.on('load', () => {
        if (!map) return

        // Teaser mode matches its fog/space color to the section's light
        // background (sst-surface) so there's no dark rectangle behind the
        // globe — just the sphere floating on white, no seam to soften.
        map.setFog(
          isTeaser
            ? {
                color: 'rgb(247, 248, 250)',
                'high-color': 'rgb(247, 248, 250)',
                'horizon-blend': 0.1,
                'space-color': 'rgb(247, 248, 250)',
                'star-intensity': 0,
              }
            : {
                color: 'rgb(20, 20, 20)',
                'high-color': 'rgb(44, 74, 62)',
                'horizon-blend': 0.025,
                'space-color': 'rgb(6, 6, 6)',
                'star-intensity': 0.55,
              }
        )

        if (isTeaser) {
          // Strip place-name labels (countries, states, settlements, etc.) —
          // the teaser is meant to read as a quiet floating orb with just the
          // pulsing trip markers, not a labeled reference map.
          map.getStyle()?.layers?.forEach((layer) => {
            if (layer.type === 'symbol' && layer.layout && 'text-field' in layer.layout) {
              map?.setLayoutProperty(layer.id, 'visibility', 'none')
            }
          })
        }

        // Past trip markers — pulsing + (full mode) popup linking to the trip detail page
        trips
          .filter(
            (trip): trip is GlobeTrip & { location: { lat: number; lng: number } } =>
              trip.location?.lat != null && trip.location?.lng != null
          )
          .forEach((trip) => {
            if (!map) return
            const coordinates: [number, number] = [trip.location.lng, trip.location.lat]

            const el = document.createElement('div')
            el.className = isTeaser ? 'sst-marker sst-marker-teaser' : 'sst-marker'
            el.innerHTML = `
              <div class="sst-marker-outer"></div>
              <div class="sst-marker-inner"></div>
            `

            const marker = new mapboxgl.Marker({ element: el }).setLngLat(coordinates)

            if (isTeaser) {
              el.addEventListener('click', (e) => {
                e.stopPropagation()
                goToGlobePage()
              })
            } else {
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

              marker.setPopup(popup)
            }

            marker.addTo(map)
            markerRecords.push({ marker, lngLat: coordinates })
          })

        // Prime opacity for the initial camera position, then keep it in
        // sync on every subsequent frame of movement (drag, flyTo, or the
        // teaser's auto-rotation) so pins fade in/out with the horizon
        // instead of popping or lagging behind the rotation.
        updateMarkerVisibility()
        map.on('move', updateMarkerVisibility)

        if (isTeaser) {
          // Whole canvas is a click target to the full globe page.
          const canvas = map.getCanvas()
          canvas.style.cursor = 'pointer'
          canvas.addEventListener('click', goToGlobePage)

          // Only start the slow auto-rotate once the section is meaningfully in view.
          if (containerRef.current) {
            observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting) {
                  startRotation()
                } else {
                  stopRotation()
                }
              },
              { threshold: 0.4 }
            )
            observer.observe(containerRef.current)
          }
        }
      })
    } catch {
      document.getElementById('sst-globe-styles')?.remove()
      return
    }

    return () => {
      stopRotation()
      observer?.disconnect()
      map?.remove()
      document.getElementById('sst-globe-styles')?.remove()
    }
  }, [trips, variant, router])

  const isTeaser = variant === 'teaser'

  return (
    <div className={`relative h-full ${isTeaser ? 'bg-sst-surface' : 'bg-[#1a1a1a]'}`}>
      {/* Full mode fades a dark canvas into the surrounding dark sections above/
          below it. Teaser mode's canvas already matches the section's light
          background (via setFog above), so there's no seam left to fade. */}
      {!isTeaser && (
        <>
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sst-navy to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sst-nav to-transparent z-10 pointer-events-none" />
        </>
      )}
      <div
        ref={containerRef}
        className={isTeaser ? 'sst-globe-teaser h-full w-full' : 'h-[400px] md:h-[600px] w-full'}
        aria-label="Interactive globe showing past trip destinations"
      />
    </div>
  )
}
