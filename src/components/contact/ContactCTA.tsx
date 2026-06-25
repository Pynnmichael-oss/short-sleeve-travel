import { Button } from '@/components/ui/Button'

export function ContactCTA() {
  return (
    <section className="bg-sst-white py-20 md:py-28">
      <div className="max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-5">
        <h2 className="font-display text-4xl text-sst-navy">
          Not ready to reach out yet?
        </h2>
        <p className="font-body text-sst-navy/60 leading-relaxed">
          That's okay. Keep exploring and come back when you're ready.
        </p>
        <Button href="/experiences" variant="primary" className="mt-2">
          Browse Experiences
        </Button>
      </div>
    </section>
  )
}
