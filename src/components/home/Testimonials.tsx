import { SectionLabel } from '@/components/ui/SectionLabel'

export function Testimonials() {
  return (
    <section className="bg-sst-white py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <SectionLabel className="text-sst-sand mb-12 block">
          From the community
        </SectionLabel>

        <blockquote className="flex flex-col gap-6 max-w-2xl">
          <span className="font-display text-6xl text-sst-sand/30 leading-none select-none">
            "
          </span>
          <p className="font-display text-2xl md:text-3xl text-sst-navy italic leading-snug -mt-4">
            A couple who met on one of our trips recently got engaged.
          </p>
        </blockquote>
      </div>
    </section>
  )
}
