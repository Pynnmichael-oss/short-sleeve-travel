import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function FounderHero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
      {/* Portrait */}
      <div className="relative min-h-[50vh] md:min-h-0">
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800"
          alt="Kat Shortsleeve, founder of Short Sleeve Travel"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Content */}
      <div className="bg-sst-nav flex items-center px-10 md:px-16 py-20">
        <div className="flex flex-col gap-7 max-w-md">
          <SectionLabel className="text-sst-sand">Our Founder</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl text-sst-white leading-tight">
            Built by someone who needed this trip too.
          </h1>
          <p className="font-body text-sst-white/70 leading-relaxed">
            Kat Shortsleeve started Short Sleeve Travel after one too many solo
            trips that felt lonelier than they should have. She believed there
            was a better way to see the world — and the right people to see it
            with.
          </p>
          <a
            href="#kats-story"
            className="self-start bg-sst-amber text-white px-6 py-3 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200"
          >
            Read Kat's Story
          </a>
        </div>
      </div>
    </section>
  )
}
