import { Button } from '@/components/ui/Button'

export function AboutCTA() {
  return (
    <section className="bg-sst-navy py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <h2 className="font-display text-4xl md:text-5xl text-sst-white leading-tight">
          Ready to find your people?
        </h2>
        <p className="font-body text-sst-white/60 leading-relaxed">
          Your next adventure is waiting. So are the friends you haven't met
          yet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button href="/experiences" variant="primary">
            See Experiences
          </Button>
          <Button href="/contact" variant="outline-light">
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  )
}
