'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '@/components/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

interface Step {
  num: string;
  title: string;
  desc: string;
  details: string[];
}

const STEPS: Step[] = [
  {
    num: '01', title: 'Discovery & Brief',
    desc: 'We start with a deep dive into your brand, goals, target audience, and competitors. I ask the right questions to understand exactly what you need and why.',
    details: ['Brand audit & research', 'Goal setting & KPI definition', 'Audience persona development', 'Competitor analysis', 'Project scope & timeline'],
  },
  {
    num: '02', title: 'Strategy & Planning',
    desc: 'Based on discovery, I craft a data-backed creative and digital strategy — from ad targeting to content pillars to production schedule.',
    details: ['Creative brief development', 'Ad campaign structure', 'Content calendar creation', 'Platform selection', 'Budget allocation'],
  },
  {
    num: '03', title: 'Production',
    desc: 'Execute the plan with precision — shoot, direct, write, design, and edit. Every deliverable goes through quality checks before approval.',
    details: ['Video shoot & direction', 'Script & storyboard execution', 'Editing & post-production', 'Ad creative design', 'Review & revision rounds'],
  },
  {
    num: '04', title: 'Launch & Optimise',
    desc: 'Deploy campaigns and content, then track, measure, and improve. I monitor key metrics daily and iterate for maximum performance.',
    details: ['Campaign launch & setup', 'Daily performance monitoring', 'A/B testing creatives', 'CTR, ROAS & CPM tracking', 'Weekly reporting & insights'],
  },
]

export default function ProcessClient() {
  const heroLine1 = useRef<HTMLSpanElement>(null)
  const heroLine2 = useRef<HTMLSpanElement>(null)
  const heroSub = useRef<HTMLParagraphElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const s1 = useScrollReveal<HTMLDivElement>({ stagger: 0.12 })

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo(heroLine1.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.3)
      .fromTo(heroLine2.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.45)
      .fromTo(heroSub.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.7)

    const cards = stepsRef.current?.querySelectorAll('.step-card')

    if (cards && cards.length > 0) {
      cards.forEach((c, i) => {
        gsap.fromTo(c,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.05, // ✅ Main object vars context me sahi placement
            scrollTrigger: {
              trigger: c,
              start: 'top 85%',
              once: true
            }
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      tl.kill()
    }
  }, [])

  return (
    <>
      <section className="page-hero min-h-[55vh] flex flex-col justify-end">
        <div className="page-hero-grid" />
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 rounded-full pointer-events-none animate-orb-float"
          style={{ background: 'radial-gradient(circle,rgba(200,240,96,0.1) 0%,transparent 70%)', filter: 'blur(100px)' }} />
        <p className="section-label mb-6">How I Work</p>
        <h1 className="font-display font-extrabold text-white mb-8" style={{ fontSize: 'clamp(48px,7vw,110px)', lineHeight: '0.92', letterSpacing: '-0.03em' }}>
          <span className="block overflow-hidden"><span ref={heroLine1} className="block" style={{ transform: 'translateY(110%)' }}>A process built</span></span>
          <span className="block overflow-hidden"><span ref={heroLine2} className="block text-accent" style={{ transform: 'translateY(110%)' }}>for results.</span></span>
        </h1>
        <p ref={heroSub} className="max-w-xl text-lg font-light text-muted leading-[1.8] opacity-0">
          From first conversation to final delivery — a clear, collaborative process that keeps projects on track and clients happy.
        </p>
      </section>

      <section className="px-8 md:px-12 py-24 md:py-32">
        <div ref={stepsRef} className="flex flex-col gap-5">
          {STEPS.map(s => (
            <div key={s.num} className="step-card group bg-bg-2 border border-white/[0.07] rounded-sm overflow-hidden transition-all duration-300 hover:border-accent/20" data-hover>
              <div className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-display text-xs font-semibold text-muted tracking-[0.1em]">{s.num}</span>
                      <div className="h-px flex-1 bg-white/[0.07]" />
                    </div>
                    <h2 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-5 group-hover:text-accent transition-colors duration-300"
                      style={{ fontSize: 'clamp(26px,3vw,44px)' }}>{s.title}</h2>
                    <p className="text-base font-light text-muted leading-[1.8] max-w-xl">{s.desc}</p>
                  </div>
                  <div className="lg:w-72 flex-shrink-0">
                    <h4 className="font-display text-[11px] font-semibold tracking-widest uppercase text-muted mb-5">What happens</h4>
                    <ul className="flex flex-col gap-3">
                      {s.details.map(d => (
                        <li key={d} className="flex items-start gap-3 text-sm text-cream">
                          <span className="text-accent mt-0.5 flex-shrink-0">↳</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-accent/30 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-2 px-8 md:px-12 py-24 md:py-32">
        <div ref={s1}>
          <p data-reveal className="section-label">Transparency First</p>
          <h2 data-reveal className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-16" style={{ fontSize: 'clamp(32px,4vw,60px)' }}>What you can<br />always expect.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[2px]">
            {[
              { icon: '💬', title: 'Clear Communication', desc: 'Regular updates, honest timelines, and no surprises.' },
              { icon: '📋', title: 'Structured Delivery', desc: 'Every project has a clear brief, milestones, and deliverables.' },
              { icon: '📊', title: 'Transparent Reporting', desc: 'Full access to campaign data and performance metrics at all times.' },
            ].map(c => (
              <div key={c.title} data-reveal data-hover className="about-card relative bg-bg-3 p-10 overflow-hidden transition-colors duration-300 hover:bg-[#1a1a1a]">
                <span className="block text-3xl mb-5">{c.icon}</span>
                <span className="font-display block font-bold text-[17px] text-white mb-3">{c.title}</span>
                <p className="text-sm text-muted leading-[1.6]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 py-24 text-center" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%,rgba(200,240,96,0.05) 0%,transparent 70%)' }}>
        <h2 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-8" style={{ fontSize: 'clamp(32px,5vw,72px)' }}>
          Ready to start<br />your project?
        </h2>
        <Link href="/contact" className="btn-primary">Let&apos;s Talk</Link>
      </section>
    </>
  )
}