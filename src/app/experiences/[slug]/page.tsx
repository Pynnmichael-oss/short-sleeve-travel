import { notFound } from 'next/navigation'
import { trips } from '@/lib/trips'
import { ExperiencePage } from './ExperiencePage'

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const trip = trips.find((t) => t.slug === slug)
  if (!trip) return {}
  return {
    title: `${trip.tagline} — ${trip.destination}, ${trip.country} | Short Sleeve Travel`,
    description: trip.hook.slice(0, 160),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const trip = trips.find((t) => t.slug === slug)
  if (!trip) notFound()
  return <ExperiencePage trip={trip} />
}
