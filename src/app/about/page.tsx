import Link from 'next/link'

export const metadata = {
  title: 'About Kat — Short Sleeve Travel',
  description:
    'Founded by Kat Shortsleeve in 2023, Shortsleeve Travel Club creates curated small-group adventures for curious travelers in their 20s and 30s.',
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
                  Founded in 2023 by Kat Shortsleeve, Shortsleeve Travel Club was born after Kat graduated from
                  Columbia Business School, where she studied entrepreneurship and private equity. Originally from
                  Boston, Kat moved to DC for her undergraduate studies at Georgetown University.
                </p>
                <p>
                  Having traveled to over 50 countries, including dozens of solo trips, her love for travel began
                  at just 10 years old when she flew solo from Boston to Florida to visit her grandparents during
                  Easter break.
                </p>
                <p>
                  Her passion for travel truly ignited in 2011 when she downloaded Instagram and discovered
                  influencers traveling the world. Inspired, Kat started her first business sewing and selling
                  purses to save for her first international trip — a volunteer adventure group to Fiji with a high
                  school program. This life-changing experience of connecting with people from around the world
                  solidified her love for travel and sparked the concept for Shortsleeve Travel Club.
                </p>
                <p>
                  Shortsleeve Travel Club is all about building connections and creating a community of like-minded,
                  curious travelers eager to explore the world together.
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
