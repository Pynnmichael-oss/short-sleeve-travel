import { SectionLabel } from '@/components/ui/SectionLabel'

export function WhyWeExist() {
  return (
    <section className="bg-sst-white py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-16">

        {/* What We Do */}
        <div className="flex flex-col gap-6">
          <SectionLabel className="text-sst-sand">What We Do</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-sst-navy leading-tight">
            A one-of-a-kind travel club for people in their 20s and 30s.
          </h2>
          <p className="font-body text-lg text-sst-navy/70 leading-relaxed">
            Whether it&apos;s trekking remote mountains in South America, cruising on private yachts,
            creating custom clothes in Vietnam, skiing and après in the Alps, taking a sushi-making class
            in Japan, yachting through Croatia, or exploring Europe by Eurorail — we elevate adventure
            travel with small, curated groups and unforgettable experiences. Everyone who joins our trips
            leaves with a new community of friends they continue to travel with long after the adventure ends.
          </p>
        </div>

        {/* Who Joins Us */}
        <div className="flex flex-col gap-6">
          <SectionLabel className="text-sst-sand">Who Joins Us</SectionLabel>
          <p className="font-body text-lg text-sst-navy/70 leading-relaxed">
            Our travelers come from all walks of life — consultants, entrepreneurs, doctors, lawyers,
            nurses, finance professionals, and creatives. Most join solo, but we&apos;ve had friends,
            siblings, and couples join too. What unites everyone is the desire to explore the world in
            ways that are truly out of the ordinary.
          </p>
          {/* Amber stat callout */}
          <div className="border-l-4 border-sst-amber pl-6 py-1">
            <p className="font-display text-xl text-sst-amber leading-snug">
              A couple who met on one of our trips recently got engaged.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
