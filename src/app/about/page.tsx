import Link from 'next/link'

export const metadata = {
  title: 'About Kat — Shortsleeve Travel Club',
  description:
    'Founded by Kat Shortsleeve in 2023, Shortsleeve Travel creates curated small-group adventures for curious travelers in their 20s and 30s.',
}

export default function AboutPage() {
  return (
    <main>
      {/* Bio — two column */}
      <section className="bg-sst-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Photo */}
            <div className="w-full overflow-hidden" style={{ maxHeight: '620px' }}>
              <img
                src="/short-sleeve-travel/images/kat-hero.jpg"
                alt="Kat Shortsleeve on a yacht at sunset"
                style={{ width: '100%', height: '600px', objectFit: 'cover', objectPosition: 'center 60%' }}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6 pt-2">
              <h1 className="font-display text-4xl md:text-5xl text-sst-navy leading-tight">
                About Kat Shortsleeve
              </h1>
              <div className="flex flex-col gap-5 font-body text-lg text-sst-navy/70 leading-relaxed">
                <p>
                  Shortsleeve Travel was founded by Kat Shortsleeve, a lifelong traveler, entrepreneur, and creator
                  who believes travel should be adventurous, deeply memorable, and accessible enough to become part
                  of your lifestyle, not just a once-in-a-lifetime experience.
                </p>
                <p>
                  Kat&apos;s love for travel began at age 10, when she started flying solo from Boston to Florida
                  to visit her grandparents every school break. Those early adventures sparked a lifelong sense of
                  curiosity and independence.
                </p>
                <p>
                  In high school Kat started her first business sewing and selling purses to save for her first
                  international trip, a volunteer adventure group to Fiji. This life-changing experience of
                  connecting with people from around the world solidified her love for travel and sparked the
                  concept for Shortsleeve Travel.
                </p>
                <p>
                  For undergrad, she chose Georgetown University to be surrounded by international students, later
                  earned her MBA from Columbia Business School, and has since explored more than 50 countries while
                  building a career in private equity in New York City.
                </p>
                <p>
                  She founded Shortsleeve Travel with one simple mission: to create the kinds of trips she was
                  always searching for. Small groups. Iconic and off-the-beaten-path destinations. Incredible
                  adventures. Thoughtfully curated itineraries that encourage you to disconnect from your daily
                  routine, connect with local cultures and fellow travelers, and return home with a fresh
                  perspective on the world.
                </p>
                <p>
                  The people are just as important as the places. Shortsleeve Travel is built for curious, kind,
                  open-minded travelers who are excited to explore, eager to step outside their comfort zone, and
                  generous in what they bring to the group. Every trip is designed to foster a welcoming community
                  where strangers quickly become friends and everyone leaves with stories they&apos;ll be telling
                  for years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorite Trips */}
      <section className="bg-sst-surface py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-body text-xs uppercase tracking-widest text-sst-sand mb-4">
            Kat&apos;s Favorite Trips
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-sst-navy mb-12 leading-tight">
            The trips that shaped everything.
          </h2>
          <ul className="flex flex-col gap-5">
            {[
              'Volunteering in Fiji for a month at age 16, working with a local community',
              'Solo traveling for six weeks from Paris, renting a car to explore the south of France, and touring Italy from Lake Como to Sicily',
              'A two-week road trip around Oman — her first time in the Middle East',
              'Living in Bali for a month',
              'Skiing in Japan and enjoying sushi on the slopes',
              'A cross-country road trip across the U.S.',
              'Island hopping around Thailand',
            ].map((trip) => (
              <li
                key={trip}
                className="flex gap-5 font-body text-lg text-sst-navy/80 leading-relaxed border-l-2 border-sst-sand pl-5"
              >
                {trip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Social links */}
      <section className="bg-sst-nav py-16 px-6 text-center">
        <p className="font-body text-xs uppercase tracking-widest text-sst-sand/60 mb-6">
          Follow the Adventure
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://www.instagram.com/katshortsleeve/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm uppercase tracking-widest text-sst-white/70 hover:text-sst-amber transition-colors duration-200"
          >
            Instagram
          </a>
          <span className="text-sst-white/20 self-center">·</span>
          <a
            href="https://www.tiktok.com/@katshortsleevetravel"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm uppercase tracking-widest text-sst-white/70 hover:text-sst-amber transition-colors duration-200"
          >
            TikTok
          </a>
          <span className="text-sst-white/20 self-center">·</span>
          <a
            href="https://www.facebook.com/groups/1159763748718393"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm uppercase tracking-widest text-sst-white/70 hover:text-sst-amber transition-colors duration-200"
          >
            Facebook Group
          </a>
        </div>
        <div className="mt-10">
          <Link
            href="/trips"
            className="font-body text-sm bg-sst-amber text-white px-8 py-4 hover:bg-amber-600 transition-colors duration-200 tracking-wide"
          >
            See Our Trips
          </Link>
        </div>
      </section>
    </main>
  )
}
