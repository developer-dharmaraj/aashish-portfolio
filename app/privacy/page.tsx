import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title:'Privacy Policy — DevMark Studio' }

export default function PrivacyPage() {
  return (
    <section className="px-8 md:px-12 pt-40 pb-24 max-w-3xl mx-auto">
      <p className="section-label mb-6">Legal</p>
      <h1 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-12" style={{fontSize:'clamp(36px,5vw,72px)'}}>Privacy Policy</h1>
      <div className="flex flex-col gap-8 text-base font-light text-muted leading-[1.8]">
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">1. Information We Collect</h2>
          <p>When you use our website or contact us, we may collect your name, email address, company name, and project details. We do not collect sensitive personal data without your explicit consent.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">2. How We Use Your Information</h2>
          <p>We use the information you provide solely to respond to your enquiry, deliver agreed services, and improve our website experience. We never sell your data to third parties.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">3. Cookies</h2>
          <p>Our website uses essential cookies for functionality and analytics cookies (via Google Analytics) to understand site usage. You can opt out of analytics cookies via your browser settings.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">4. Data Retention</h2>
          <p>We retain contact form submissions for up to 2 years. You may request deletion of your data at any time by emailing hello@devmark.studio.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">5. Contact</h2>
          <p>For any privacy-related queries, email us at <a href="mailto:hello@devmark.studio" className="text-accent hover:underline">hello@devmark.studio</a>.</p>
        </div>
      </div>
      <div className="mt-12">
        <Link href="/" className="btn-outline">← Back to Home</Link>
      </div>
    </section>
  )
}
