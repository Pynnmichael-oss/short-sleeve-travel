import { SectionLabel } from '@/components/ui/SectionLabel'

export function ContactHero() {
  return (
    <section className="bg-sst-white pt-28 pb-16 text-center">
      <div className="max-w-xl mx-auto px-6 flex flex-col items-center gap-5">
        <SectionLabel className="text-sst-sand">Get In Touch</SectionLabel>
        <h1 className="font-display text-5xl md:text-6xl text-sst-navy">
          Let's talk travel.
        </h1>
        <p className="font-body text-lg text-sst-navy/60 leading-relaxed">
          Have questions? Ready to book? We're a real team. We actually reply.
        </p>
      </div>
    </section>
  )
}
