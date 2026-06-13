'use client'
import Link from 'next/link'

const SOCIALS = [
  { s: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
  { s: 'linkedin', href: 'https://linkedin.com/in/aashishpandeycreative', label: 'LinkedIn' },
  { s: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
  { s: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
] as const

function SocialIcon({ type }: { type: (typeof SOCIALS)[number]['s'] }) {
  const className = 'h-4 w-4'

  switch (type) {
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 0 0-2.09-2.08C19.54 3.62 12 3.62 12 3.62s-7.51 0-9.39.5A3 3 0 0 0 .52 6.2 31.25 31.25 0 0 0 0 12a31.25 31.25 0 0 0 .52 5.8 3 3 0 0 0 2.09 2.08c1.88.5 9.39.5 9.39.5s7.54 0 9.41-.5a3 3 0 0 0 2.09-2.08A31.25 31.25 0 0 0 24 12a31.25 31.25 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.87 12 9.6 15.6Z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07Z" />
        </svg>
      )
  }
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-bg px-8 md:px-12 pt-16 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        <div>
          <div className="font-display text-[22px] font-extrabold text-white tracking-tight mb-5">
            Aashish<span className="text-accent">.</span>
          </div>
          <p className="text-sm text-muted leading-[1.7] max-w-[280px] mb-8">
            Creative & Digital Media Director — video production, performance advertising, and brand storytelling.
          </p>
          <div className="flex gap-4">
            {SOCIALS.map(({ s, href, label }) => (
              <a key={s} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} data-hover
                className="w-9 h-9 border border-white/[0.07] rounded-full flex items-center justify-center text-muted text-sm no-underline transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/5"
              >
                <SocialIcon type={s} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-[13px] font-semibold tracking-widest uppercase text-cream mb-6">Navigate</h4>
          <ul className="flex flex-col gap-3.5 list-none">
            {[{l:'About',h:'/about'},{l:'Work',h:'/work'},{l:'Services',h:'/services'},{l:'Process',h:'/process'},{l:'Contact',h:'/contact'}].map(({l,h})=>(
              <li key={h}><Link href={h} className="text-sm text-muted hover:text-cream transition-colors duration-200 no-underline">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[13px] font-semibold tracking-widest uppercase text-cream mb-6">Services</h4>
          <ul className="flex flex-col gap-3.5 list-none">
            {['Video Production','Meta Ads','Google Ads','Content Creation','Brand Identity'].map(s=>(
              <li key={s}><Link href="/services" className="text-sm text-muted hover:text-cream transition-colors duration-200 no-underline">{s}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[13px] font-semibold tracking-widest uppercase text-cream mb-6">Contact</h4>
          <ul className="flex flex-col gap-3.5 list-none">
            <li><a href="mailto:pandeyaashish0501@gmail.com" className="text-sm text-muted hover:text-cream transition-colors no-underline">pandeyaashish0501@gmail.com</a></li>
            <li><a href="tel:+916261501625" className="text-sm text-muted hover:text-cream transition-colors no-underline">+91 6261-501625</a></li>
            <li><span className="text-sm text-muted">Mumbai / Ratlam, MP</span></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.07]">
        <p className="text-[13px] text-muted">© 2025 Aashish Pandey. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="text-[13px] text-muted hover:text-cream no-underline transition-colors">Privacy Policy</Link>
          <Link href="/terms"   className="text-[13px] text-muted hover:text-cream no-underline transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  )
}
