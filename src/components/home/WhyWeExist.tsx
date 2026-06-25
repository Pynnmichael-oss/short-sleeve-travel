import { SectionLabel } from '@/components/ui/SectionLabel'

export function WhyWeExist() {
  return (
    <section className="bg-sst-white py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6 flex flex-col gap-8">
        <SectionLabel className="text-sst-sand">Why we exist</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl text-sst-navy leading-tight">
          Travel is better when you share it with the right people.
        </h2>
        <p className="font-body text-lg text-sst-navy/70 leading-relaxed">
          Most travel is designed for consumption — show up, see things, leave.
          We think the best adventures happen when you're surrounded by people
          who are just as curious, open, and ready as you are. That's why we
          keep our groups small, our itineraries thoughtful, and our energy
          firmly on the side of connection over checklist.
        </p>
      </div>
    </section>
  )
}
