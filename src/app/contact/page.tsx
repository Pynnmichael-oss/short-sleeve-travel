import { ContactHero } from '@/components/contact/ContactHero'
import { ContactSection } from '@/components/contact/ContactSection'
import { FAQ } from '@/components/contact/FAQ'
import { ContactCTA } from '@/components/contact/ContactCTA'

export const metadata = {
  title: 'Contact — Short Sleeve Travel',
  description:
    'Get in touch with the Short Sleeve Travel team. Questions about a trip? Ready to book? We reply within 24 hours.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <FAQ />
      <ContactCTA />
    </>
  )
}
