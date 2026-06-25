import { SectionLabel } from '@/components/ui/SectionLabel'

const testimonials = [
  {
    quote:
      'I came alone and left with five people I now consider my closest friends. Oaxaca changed everything.',
    name: 'Sarah K.',
    detail: 'Joined 2024',
  },
  {
    quote:
      'I was skeptical about group travel. Short Sleeve completely changed my mind. The Azores trip was the best two weeks of my life.',
    name: 'James R.',
    detail: 'Joined 2024',
  },
]

export function Testimonials() {
  return (
    <section className="bg-sst-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel className="text-sst-sand mb-12 block">
          From the community
        </SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {testimonials.map(({ quote, name, detail }) => (
            <blockquote key={name} className="flex flex-col gap-6">
              <span className="font-display text-6xl text-sst-sand/30 leading-none select-none">
                "
              </span>
              <p className="font-display text-2xl md:text-3xl text-sst-navy italic leading-snug -mt-4">
                {quote}
              </p>
              <footer className="font-body text-sm text-sst-navy/50">
                — {name}, {detail}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
