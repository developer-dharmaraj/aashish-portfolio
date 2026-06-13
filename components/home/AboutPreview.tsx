'use client'
import Link from 'next/link'
import { useScrollReveal } from '@/components/useScrollReveal'

const CARDS = [
  { icon:'🎬', title:'Video Production',   desc:'End-to-end video shoots — concept, direction, editing — for reels, ads & promos.' },
  { icon:'📢', title:'Performance Ads',    desc:'Meta & Google Ads campaigns engineered for lead generation and measurable ROI.' },
  { icon:'✦',  title:'Brand Storytelling', desc:'Visual identities and content strategies that resonate and build lasting audiences.' },
  { icon:'⚡', title:'AI-Powered Workflow',desc:'Leveraging generative AI tools to supercharge content creation and production speed.' },
]

export default function AboutPreview() {
  const leftRef  = useScrollReveal<HTMLDivElement>({ y:60, stagger:0.12 })
  const rightRef = useScrollReveal<HTMLDivElement>({ y:40, stagger:0.1, delay:0.2 })

  return (
    <section id="about" className="bg-bg-2 px-8 md:px-12 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div ref={leftRef}>
          <p data-reveal className="section-label">About Me</p>
          <h2 data-reveal className="font-display font-extrabold leading-[1] tracking-tighter text-white mb-8" style={{fontSize:'clamp(36px,5vw,72px)'}}>
            Creativity meets<br/>data-driven results
          </h2>
          <p data-reveal className="text-lg font-light text-muted leading-[1.8] mb-4">
            I&apos;m a <strong className="text-cream font-normal">Creative & Digital Media Director</strong> with hands-on experience in video production, performance advertising, and brand content creation.
          </p>
          <p data-reveal className="text-lg font-light text-muted leading-[1.8] mb-8">
            From directing shoots on Crime Patrol to running full-funnel Meta & Google Ads campaigns, I bring both cinematic storytelling and data-driven marketing to every project.
          </p>
          <Link data-reveal href="/about" className="btn-outline">More About Me →</Link>
        </div>
        <div ref={rightRef} className="grid grid-cols-2 gap-[2px]">
          {CARDS.map(c => (
            <div key={c.title} data-reveal data-hover
              className="about-card relative bg-bg-3 p-8 overflow-hidden transition-colors duration-300 hover:bg-[#1a1a1a]">
              <span className="block text-3xl mb-5">{c.icon}</span>
              <h3 className="font-display font-bold text-[17px] text-white mb-2.5">{c.title}</h3>
              <p className="text-sm text-muted leading-[1.6]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
