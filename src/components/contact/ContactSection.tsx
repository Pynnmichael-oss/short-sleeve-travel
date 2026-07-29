'use client'

import { useState, type FormEvent } from 'react'

const inputClass =
  'w-full border border-sst-navy/20 bg-white px-4 py-3 text-sm font-body text-sst-navy placeholder:text-sst-navy/30 focus:outline-none focus:border-sst-nav transition-colors duration-200'

const labelClass = 'block text-sm font-body text-sst-navy/70 mb-2'

interface TripOption {
  _id: string
  title: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactSection({ trips }: { trips: TripOption[] }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')?.toString().trim() ?? ''
    const email = formData.get('email')?.toString().trim() ?? ''
    const message = formData.get('message')?.toString().trim() ?? ''
    const tripId = formData.get('trip')?.toString().trim()

    const workerUrl = process.env.NEXT_PUBLIC_CONTACT_WORKER_URL

    if (!workerUrl) {
      setStatus('error')
      setErrorMessage('Something went wrong on our end. Please try again in a moment.')
      return
    }

    try {
      const res = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          ...(tripId && { tripId }),
        }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.success) {
        setStatus('error')
        setErrorMessage(data?.error || 'Something went wrong sending your message. Please try again.')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong sending your message. Please check your connection and try again.')
    }
  }

  return (
    <section className="bg-sst-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch">
          {/* Form — 60% */}
          <div className="lg:col-span-3 py-8 lg:py-0 lg:pr-16">
            {status === 'success' ? (
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-2xl text-sst-navy">Message sent.</h2>
                <p className="font-body text-sm text-sst-navy/60 leading-relaxed">
                  Kat reads every one of these herself, so expect a real reply, not an autoresponder.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                      required
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
                      required
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
                        <option value="">General inquiry / not sure yet</option>
                        {trips.map((trip) => (
                          <option key={trip._id} value={trip._id}>
                            {trip.title}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sst-navy/40">
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
                      required
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-sst-amber text-white py-4 text-sm tracking-wide hover:bg-amber-600 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Sending…' : 'Send It →'}
                    </button>
                    {status === 'error' && (
                      <p className="text-xs font-body text-red-600 text-center">{errorMessage}</p>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Details — 40% */}
          <div className="lg:col-span-2 bg-sst-nav px-10 py-12 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-2xl text-sst-white">
                We'd love to hear from you
              </h2>
              <p className="font-body text-sm text-sst-white/65 leading-relaxed">
                Whether you have questions about a specific trip, want to know if
                group travel is right for you, or just want to say hello, drop
                us a message.
              </p>
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest font-body text-sst-sand">
                  Prefer Instagram?
                </span>
                <p className="font-body text-sm text-sst-white/80">
                  DM us @shortsleevetravel, we check that daily too.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest font-body text-sst-sand">
                  Prefer Email?
                </span>
                <p className="font-body text-sm text-sst-white/80">
                  Reach Kat directly at{' '}
                  <a
                    href="mailto:katshortsleeve@gmail.com"
                    className="hover:text-sst-sand transition-colors duration-200"
                  >
                    katshortsleeve@gmail.com
                  </a>
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest font-body text-sst-sand">
                  No Pressure
                </span>
                <p className="font-body text-sm text-sst-white/80">
                  Ask us anything. We're not here to hard sell you on anything.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest font-body text-sst-sand">
                  Follow Along
                </span>
                <a
                  href="https://instagram.com/shortsleevetravel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-sst-white/80 hover:text-sst-sand transition-colors duration-200"
                >
                  @shortsleevetravel
                </a>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-sst-white/10">
              <p className="font-display text-xl text-sst-white/80 italic">
                "Looking forward to hearing from you.
                <br />
                Kat"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
