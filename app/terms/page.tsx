import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title:'Terms of Use — DevMark Studio' }

export default function TermsPage() {
  return (
    <section className="px-8 md:px-12 pt-40 pb-24 max-w-3xl mx-auto">
      <p className="section-label mb-6">Legal</p>
      <h1 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-12" style={{fontSize:'clamp(36px,5vw,72px)'}}>Terms of Use</h1>
      <div className="flex flex-col gap-8 text-base font-light text-muted leading-[1.8]">
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using the DevMark Studio website, you agree to be bound by these Terms of Use. If you do not agree, please do not use this site.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">2. Intellectual Property</h2>
          <p>All content on this site — including text, graphics, logos, and code — is the property of DevMark Studio and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without our written permission.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">3. Limitation of Liability</h2>
          <p>DevMark Studio provides this website on an "as is" basis. We make no representations or warranties about the completeness or accuracy of the content. We are not liable for any damages arising from your use of the site.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">4. External Links</h2>
          <p>Our site may contain links to third-party websites. We have no control over the content of those sites and accept no responsibility for them.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">5. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Indore, Madhya Pradesh.</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-3">6. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
        </div>
      </div>
      <div className="mt-12">
        <Link href="/" className="btn-outline">← Back to Home</Link>
      </div>
    </section>
  )
}
