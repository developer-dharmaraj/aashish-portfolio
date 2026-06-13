'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useScrollReveal } from '@/components/useScrollReveal'

const SERVICES = ['Video Production & Direction', 'Meta Ads Campaign', 'Google Ads Campaign', 'Content Creation & Reels', 'Brand Identity & Design', 'Post-Production Editing', 'Other']
const BUDGETS = ['Under ₹10,000', '₹10k – ₹25k', '₹25k – ₹50k', '₹50k – ₹1L', '₹1L+']

export default function ContactClient() {
  const heroLine1 = useRef<HTMLSpanElement>(null)
  const heroLine2 = useRef<HTMLSpanElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 })

  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string>('') // Server-side error handle karne ke liye

  useEffect(() => {
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo(heroLine1.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.3)
      .fromTo(heroLine2.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.45)
      .fromTo(formRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.7)
  }, [])

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Tell me about your project'
    return e
  }

  // UPDATED: Actual Resend API Integration
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setErrors({})
    setServerError('')
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || 'Not Specified', // Optional fields ke liye fallback
          service: form.service || 'Not Specified',
          budget: form.budget || 'Not Specified',
          message: form.message,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
      } else {
        setServerError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch (err) {
      console.error('Submission Error:', err)
      setServerError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors(err => ({ ...err, [field]: undefined }))
      if (status === 'error') setStatus('idle') // Error state reset karne ke liye
    }
  }

  return (
    <>
      <section className="page-hero min-h-[50vh] flex flex-col justify-end">
        <div className="page-hero-grid" />
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 rounded-full pointer-events-none animate-orb-float"
          style={{ background: 'radial-gradient(circle,rgba(200,240,96,0.1) 0%,transparent 70%)', filter: 'blur(100px)' }} />
        <p className="section-label mb-6">Get In Touch</p>
        <h1 className="font-display font-extrabold text-white mb-4"
          style={{ fontSize: 'clamp(48px,7vw,110px)', lineHeight: '0.92', letterSpacing: '-0.03em' }}>
          <span className="block overflow-hidden"><span ref={heroLine1} className="block" style={{ transform: 'translateY(110%)' }}>{"Let's create"}</span></span>
          <span className="block overflow-hidden"><span ref={heroLine2} className="block text-accent" style={{ transform: 'translateY(110%)' }}>something great.</span></span>
        </h1>
      </section>

      <section className="px-8 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-start">

          <div ref={formRef} className="lg:col-span-3 opacity-0">
            {status === 'success' ? (
              <div className="bg-bg-2 border border-accent/30 rounded-sm p-12 text-center">
                <div className="text-5xl mb-6">✅</div>
                <h2 className="font-display font-extrabold text-white text-2xl mb-4">Message Sent!</h2>
                <p className="text-muted text-base leading-[1.7] mb-8">
                  Thanks for reaching out! I&apos;ll review your brief and get back to you within 1 business day.
                </p>
                <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' }) }}
                  className="btn-outline">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                {/* Global Error Banner */}
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-sm text-sm">
                    ⚠️ {serverError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-muted mb-2">Your Name *</label>
                    <input value={form.name} onChange={set('name')} placeholder="Your full name"
                      className={`form-input ${errors.name ? 'border-red-500/50' : ''}`} />
                    {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-muted mb-2">Email *</label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"
                      className={`form-input ${errors.email ? 'border-red-500/50' : ''}`} />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-muted mb-2">Company / Brand</label>
                  <input value={form.company} onChange={set('company')} placeholder="Your company or brand name" className="form-input" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-muted mb-2">Service Needed</label>
                    <select value={form.service} onChange={set('service')} className="form-input">
                      <option value="">Select a service</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-muted mb-2">Budget Range</label>
                    <select value={form.budget} onChange={set('budget')} className="form-input">
                      <option value="">Select budget</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-muted mb-2">About Your Project *</label>
                  <textarea value={form.message} onChange={set('message')} rows={6}
                    placeholder="Tell me about your project, goals, timeline, and what you want to achieve..."
                    className={`form-input ${errors.message ? 'border-red-500/50' : ''}`} />
                  {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                </div>

                <button type="submit" data-hover disabled={status === 'sending'}
                  className="btn-primary self-start mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin inline-block" />
                      Sending...
                    </span>
                  ) : status === 'error' ? 'Try Again' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div ref={infoRef} className="lg:col-span-2">
            <div data-reveal className="mb-10">
              <p className="section-label">Response Time</p>
              <p className="text-base font-light text-muted leading-[1.8]">
                I respond to all enquiries within <strong className="text-cream font-normal">1 business day</strong>.
              </p>
            </div>
            <div data-reveal className="flex flex-col gap-6 mb-12">
              {[
                { label: 'Email', val: 'pandeyaashish0501@gmail.com', href: 'mailto:pandeyaashish0501@gmail.com' },
                { label: 'Phone', val: '+91 6261-501625', href: 'tel:+916261501625' },
                { label: 'Location', val: 'Mumbai / Ratlam, MP', href: '#' },
              ].map(c => (
                <div key={c.label}>
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-1">{c.label}</div>
                  <a href={c.href} className="text-sm text-cream hover:text-accent transition-colors no-underline">{c.val}</a>
                </div>
              ))}
            </div>
            <div data-reveal className="bg-bg-2 border border-white/[0.07] rounded-sm p-7">
              <h4 className="font-display font-bold text-white mb-3">Free Discovery Call</h4>
              <p className="text-sm text-muted leading-[1.7] mb-5">
                Not sure what you need? Let&apos;s have a 20-minute call. No pitch — just an honest conversation about your goals.
              </p>
              <a href="tel:+916261501625" data-hover className="btn-outline text-sm px-5 py-3">Book a Call</a>
            </div>
            <div data-reveal className="mt-8">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-4">Follow Me</div>
              <div className="flex gap-5">
                {[{ s: 'Instagram', href: 'https://instagram.com' }, { s: 'LinkedIn', href: 'https://linkedin.com/in/aashishpandeycreative' }, { s: 'YouTube', href: 'https://youtube.com' }].map(({ s, href }) => (
                  <a key={s} href={href} target="_blank" rel="noopener noreferrer" data-hover
                    className="text-sm text-muted hover:text-accent transition-colors no-underline">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}