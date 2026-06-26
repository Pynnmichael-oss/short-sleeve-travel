import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { getTripBySlug } from '@/lib/queries'
import { ExperiencePage } from './ExperiencePage'

export async function generateStaticParams() {
  const trips = await client.fetch(`*[_type == "trip"]{ "slug": slug.current }`)
  return trips.map((t: any) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const trip = await getTripBySlug(slug)
  if (!trip) return {}
  return {
    title: `${trip.tagline} — ${trip.destination} | Short Sleeve Travel`,
    description: trip.description?.slice(0, 160),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const trip = await getTripBySlug(slug)
  if (!trip) notFound()
  return <ExperiencePage trip={trip} />
}
