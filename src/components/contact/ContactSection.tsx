const inputClass =
  'w-full border border-charcoal/20 bg-white px-4 py-3 text-sm font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-forest transition-colors duration-200'

const labelClass = 'block text-sm font-body text-charcoal/70 mb-2'

export function ContactSection() {
  return (
    <section className="bg-offwhite py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch">
          {/* Form — 60% */}
          <div className="lg:col-span-3 py-8 lg:py-0 lg:pr-16">
            <form>
              <div className="flex flex-col gap-6">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="trip" className={labelClass}>
                    Which trip are you interested in?
                  </label>
                  <div className="relative">
                    <select
                      id="trip"
                      name="trip"
                      className={`${inputClass} appearance-none pr-10`}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a trip…
                      </option>
                      <option value="new-zealand-adventure">
                        New Zealand Adventure
                      </option>
                      <option value="spirit-of-japan">
                        Spirit of Japan
                      </option>
                      <option value="morocco-uncovered">
                        Morocco Uncovered
                      </option>
                      <option value="exploring">
                        Not sure yet — just exploring
                      </option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" aria-hidden="true">
                        <path d="M5 6L0 0h10L5 6z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full bg-burnt text-warmwhite py-4 text-sm tracking-wide hover:bg-burnt/90 transition-colors duration-200"
                  >
                    Send It →
                  </button>
                  <p className="text-xs font-body text-charcoal/40 text-center">
                    We reply to every message within 24 hours.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Details — 40% */}
          <div className="lg:col-span-2 bg-forest px-10 py-12 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-2xl text-offwhite">
                We'd love to hear from you
              </h2>
              <p className="font-body text-sm text-offwhite/65 leading-relaxed">
                Whether you have questions about a specific trip, want to know if
                group travel is right for you, or just want to say hello — drop
                us a message.
              </p>
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest font-body text-sand">
                  Response Time
                </span>
                <p className="font-body text-sm text-offwhite/80">
                  Within 24 hours, always.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest font-body text-sand">
                  No Pressure
                </span>
                <p className="font-body text-sm text-offwhite/80">
                  Ask us anything. We're not here to hard sell you on anything.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest font-body text-sand">
                  Follow Along
                </span>
                <a
                  href="https://instagram.com/shortsleeveltravel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-offwhite/80 hover:text-sand transition-colors duration-200"
                >
                  @shortsleeveltravel
                </a>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-offwhite/10">
              <p className="font-display text-xl text-offwhite/80 italic">
                "Looking forward to hearing from you. — Kat"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
