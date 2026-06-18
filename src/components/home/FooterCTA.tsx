import { Button } from '@/components/ui/Button'

export function FooterCTA() {
  return (
    <section className="bg-warmwhite py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <h2 className="font-display text-4xl md:text-5xl text-charcoal">
          Ready to go?
        </h2>
        <p className="font-body text-lg text-charcoal/60 leading-relaxed">
          Your next adventure — and your next group of friends — is waiting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button href="/experiences" variant="primary">
            See Experiences
          </Button>
          <Button href="/about" variant="outline">
            Learn About Us
          </Button>
        </div>
      </div>
    </section>
  )
}
