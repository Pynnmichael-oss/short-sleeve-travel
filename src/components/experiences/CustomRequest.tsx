import { Button } from '@/components/ui/Button'

export function CustomRequest() {
  return (
    <section className="bg-sst-white py-20 md:py-28">
      <div className="max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-5">
        <h2 className="font-display text-3xl md:text-4xl text-sst-navy">
          Don't see what you're looking for?
        </h2>
        <p className="font-body text-sst-navy/60 leading-relaxed">
          We're always planning new adventures. Get in touch and tell us where
          you want to go.
        </p>
        <Button href="/contact" variant="primary" className="mt-2">
          Get In Touch
        </Button>
      </div>
    </section>
  )
}
