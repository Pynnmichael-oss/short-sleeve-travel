import { SectionLabel } from '@/components/ui/SectionLabel'

export function KatsStory() {
  return (
    <section id="kats-story" className="bg-sst-white py-24 md:py-32">
      <div className="max-w-[680px] mx-auto px-6 flex flex-col gap-8">
        <SectionLabel className="text-sst-sand">Kat's Story</SectionLabel>

        <div className="flex flex-col gap-6 font-body text-lg text-sst-navy/75 leading-relaxed">
          <p>
            I grew up with maps on my bedroom wall and a list of places I
            couldn't wait to reach. When I finally took my first solo trip at
            twenty-four — ten days in Portugal, one backpack, a very cheap
            flight — I was so excited I barely slept the night before. By day
            three, I was sitting alone in a beautiful restaurant in Porto,
            watching groups of friends laugh at every table around me. I'd made
            it to the place. But I'd left behind everything that would have made
            it matter.
          </p>
          <p>
            The best moments from every trip I'd ever taken weren't the
            landmarks. They were the conversations — the stranger on a trail who
            walked with me for three hours and became someone I still message,
            the woman at a guesthouse who dragged me to a neighbourhood market I
            never would have found alone. Those moments were always shared. And
            they always happened by accident. I started wondering what it would
            look like to design them on purpose.
          </p>
          <p>
            I quit my job in 2022 and spent six months trying to figure that
            out. I wasn't trying to build a tour company — I'd been on those,
            and they weren't it. Too big, too scripted, too focused on ticking
            boxes and not enough on the people beside you. And it wasn't a party
            hostel either. I wanted something in between: small groups of
            genuinely curious people who actually wanted to connect, thoughtful
            destinations, enough structure to feel held and enough space to feel
            free.
          </p>
          <p>
            Short Sleeve Travel launched with one trip to Oaxaca and eight
            strangers who flew in from four different countries. By day three,
            they were finishing each other's sentences. They all still have a
            group chat. It's still active. That, honestly, is the whole point.
          </p>
        </div>
      </div>
    </section>
  )
}
