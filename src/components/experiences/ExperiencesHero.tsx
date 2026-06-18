import Image from 'next/image'

export function ExperiencesHero() {
  return (
    <section className="relative flex items-center justify-center text-center" style={{ height: '60vh' }}>
      <Image
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600"
        alt="Travellers on an adventure"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-forest/50" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center gap-5">
        <h1 className="font-display text-4xl md:text-6xl text-warmwhite leading-tight">
          Every trip, a story.
          <br />
          Every group, a reason to go.
        </h1>
        <p className="font-body text-lg text-warmwhite/80">
          Three curated adventures. Unlimited possibilities.
        </p>
      </div>
    </section>
  )
}
