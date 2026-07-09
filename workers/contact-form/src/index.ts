export interface Env {
  SANITY_PROJECT_ID: string
  SANITY_DATASET: string
  NOTIFY_EMAIL: string
  RESEND_FROM_EMAIL: string
  ALLOWED_ORIGIN: string
  SANITY_WRITE_TOKEN: string
  RESEND_API_KEY: string
}

interface ContactPayload {
  name?: string
  email?: string
  message?: string
  tripId?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function json(data: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  })
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    if (request.method !== 'POST') {
      return json({ success: false, error: 'Method not allowed.' }, 405, origin)
    }

    let body: ContactPayload
    try {
      body = await request.json()
    } catch (err) {
      console.error('Failed to parse request body as JSON:', err)
      return json({ success: false, error: 'Invalid request body.' }, 400, origin)
    }

    const name = body.name?.trim()
    const email = body.email?.trim()
    const message = body.message?.trim()
    const tripId = body.tripId?.trim()

    if (!name || !email || !message) {
      return json(
        { success: false, error: 'Name, email, and message are required.' },
        400,
        origin
      )
    }

    if (!EMAIL_RE.test(email)) {
      return json(
        { success: false, error: 'Please enter a valid email address.' },
        400,
        origin
      )
    }

    // 1. Save the submission to Sanity. If this fails, the whole request fails —
    // the submission must not silently disappear.
    try {
      const sanityRes = await fetch(
        `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${env.SANITY_DATASET}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
          },
          body: JSON.stringify({
            mutations: [
              {
                create: {
                  _type: 'contactSubmission',
                  name,
                  email,
                  message,
                  submittedAt: new Date().toISOString(),
                  status: 'new',
                  ...(tripId && {
                    tripInterest: { _type: 'reference', _ref: tripId, _weak: true },
                  }),
                },
              },
            ],
          }),
        }
      )

      if (!sanityRes.ok) {
        const errText = await sanityRes.text()
        console.error('Sanity mutation failed:', sanityRes.status, errText)
        return json(
          { success: false, error: 'Could not save your message. Please try again.' },
          502,
          origin
        )
      }
    } catch (err) {
      console.error('Sanity request threw:', err)
      return json(
        { success: false, error: 'Could not save your message. Please try again.' },
        502,
        origin
      )
    }

    // 2. Send the notification email via Resend. The submission is already saved
    // in Sanity at this point, so a Resend failure is logged but does not fail
    // the request — Kat can still see the inquiry in Studio even if the email
    // never lands.
    try {
      const tripLine = tripId
        ? `Trip interest: see Sanity Studio (trip ID ${tripId})`
        : 'Trip interest: general inquiry'

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL,
          to: env.NOTIFY_EMAIL,
          reply_to: email,
          subject: `New inquiry from ${name}`,
          html: `
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>${escapeHtml(tripLine)}</strong></p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          `,
        }),
      })

      if (!resendRes.ok) {
        const errText = await resendRes.text()
        console.error('Resend send failed:', resendRes.status, errText)
      }
    } catch (err) {
      console.error('Resend request threw:', err)
    }

    return json({ success: true }, 200, origin)
  },
}
