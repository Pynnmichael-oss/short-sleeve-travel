import { SectionLabel } from '@/components/ui/SectionLabel'

export function ContactHero() {
  return (
    <section className="bg-offwhite pt-28 pb-16 text-center">
      <div className="max-w-xl mx-auto px-6 flex flex-col items-center gap-5">
        <SectionLabel className="text-sand">Get In Touch</SectionLabel>
        <h1 className="font-display text-5xl md:text-6xl text-charcoal">
          Let's talk travel.
        </h1>
        <p className="font-body text-lg text-charcoal/60 leading-relaxed">
          Have questions? Ready to book? We're a real team. We actually reply.
        </p>
      </div>
    </section>
  )
}
