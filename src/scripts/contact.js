import emailjs from '@emailjs/browser'
import { showToast } from './toast'
import { SITE } from '../config/site'

const { publicKey, serviceId, templateId } = SITE.emailjs

export function initContactForm() {
  const form = document.getElementById('contact-form')
  const submit = form.querySelector('[type="submit"]')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    // five-digit reference the EmailJS template expects as {{contact_number}}
    form.contact_number.value = Math.floor(Math.random() * 100000)
    submit.disabled = true

    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey })
      showToast('success', 'Your message was successfully sent to our team. Thank you!')
      form.reset()
    } catch (error) {
      console.error('EmailJS send failed', error)
      showToast('error', 'Failed to send your message. Please use alternative methods (email or phone).')
    } finally {
      submit.disabled = false
    }
  })
}
