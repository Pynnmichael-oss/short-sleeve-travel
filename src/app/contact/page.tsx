import { ContactHero } from '@/components/contact/ContactHero'
import { ContactSection } from '@/components/contact/ContactSection'
import { FAQ } from '@/components/contact/FAQ'
import { ContactCTA } from '@/components/contact/ContactCTA'
import { getTripsForContactForm } from '@/lib/queries'

export const metadata = {
  title: 'Contact | Shortsleeve Travel Club',
  description:
    "Get in touch with the Shortsleeve Travel team. Questions about a trip? Ready to book? We'd love to hear from you.",
}

export default async function ContactPage() {
  const trips = await getTripsForContactForm()

  return (
    <>
      <ContactHero />
      <ContactSection trips={trips} />
      <FAQ />
      <ContactCTA />
    </>
  )
}
