export const SITE = {
  name: 'ROBIBON Construction',
  url: 'https://www.robibonconstruction.com',
  tagline: 'Your reliable partner for creating the future',
  description:
    'ROBIBON Construction is your reliable partner for road, building, and dam construction. Explore our featured projects and contact us to start your project.',
  keywords:
    'construction, infrastructure, road construction, building construction, dam construction, real estate, Ethiopia, projects',
  phone: { display: '+251 114 625 422', href: 'tel:+251114625422', schema: '+251-114-62-54-22' },
  email: 'robiboncon@gmail.com',
  address: 'Addis Ababa, Ethiopia',
  hours: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 8:00 AM - 12:00 PM'],
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11474.037508601928!2d38.719211822780615!3d8.953762381002214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b815d9d4312c7%3A0xef63ad5875a980f1!2zOMKwNTYnNTUuNiJOIDM4wrA0Myc0NC40IkU!5e0!3m2!1sen!2set!4v1662895972031!5m2!1sen!2set',
  credit: { label: 'bex labs', href: 'https://beki-portfolio.vercel.app/' },
  // EmailJS public key: safe to ship in the browser (it is not a secret), but set a domain allow-list on the dashboard.
  emailjs: { publicKey: 'P_nMUKfAtR43YhNKL', serviceId: 'default', templateId: 'contact_form' },
} as const

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
] as const
