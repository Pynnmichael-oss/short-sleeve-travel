import { SectionLabel } from '@/components/ui/SectionLabel'

const faqs = [
  {
    question: 'Do I need to have traveled solo before?',
    answer:
      'Not at all. Most of our travelers are first-time solo adventurers. The whole point is that you won\'t feel alone.',
  },
  {
    question: 'What\'s included in the price?',
    answer:
      'Accommodation, most meals, all activities on the itinerary, and local transport. Flights are not included but we provide guidance.',
  },
  {
    question: 'What\'s the group dynamic like?',
    answer:
      'Groups range from 8–12 people. A mix of solo travelers, remote workers, and the occasional couple. Everyone is there for the same reason — to have a real experience with real people.',
  },
  {
    question: 'How far in advance should I book?',
    answer:
      'Our trips fill up 6–8 weeks out. If a trip catches your eye, don\'t wait too long. We don\'t do waitlists — first come, first served.',
  },
]

export function FAQ() {
  return (
    <section className="bg-charcoal py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-12">
          <SectionLabel className="text-sand">Common Questions</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-offwhite">
            Things people usually ask us.
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-offwhite/10">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group py-1">
              <summary className="flex items-center justify-between py-5 cursor-pointer list-none gap-4">
                <span className="font-display text-lg md:text-xl text-offwhite">
                  {question}
                </span>
                <span
                  className="shrink-0 text-sand text-2xl leading-none transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 font-body text-sm text-offwhite/60 leading-relaxed pr-10">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
