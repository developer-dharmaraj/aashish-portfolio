'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '@/components/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num:'01', title:'Video Production & Direction',
    desc:'From concept to final cut — I handle the complete video production pipeline. Whether it\'s a brand film, commercial, or social media reel, every frame is crafted to tell your story compellingly.',
    deliverables:['Concept development & scripting','On-location shoot direction','Professional video editing','Color grading & audio mixing','Final delivery for all platforms'],
    tags:['DaVinci Resolve','Premiere Pro','Direction','Reels'],
    gradient:'from-[#1a1a2e] to-[#0f3460]',
  },
  {
    num:'02', title:'Meta Ads & Google Ads Campaigns',
    desc:'Data-driven performance advertising that generates qualified leads and maximises ROI. I plan, execute, and continuously optimise campaigns across Meta and Google ecosystems.',
    deliverables:['Campaign strategy & setup','Audience research & targeting','Ad creative development','A/B testing & optimisation','Performance reporting (CTR, ROAS, CPC)'],
    tags:['Meta Ads','Google Ads','Lead Gen','Conversion'],
    gradient:'from-[#1a0a0a] to-[#4a1515]',
  },
  {
    num:'03', title:'Content Creation & Social Media Strategy',
    desc:'High-performing content calendars and platform-specific creative that drives engagement, builds communities, and turns followers into loyal customers.',
    deliverables:['Monthly content strategy','Reels & short-form video','Caption & hashtag strategy','Platform management','Engagement & analytics review'],
    tags:['Instagram','Facebook','YouTube','Reels'],
    gradient:'from-[#0a1a0a] to-[#1a4a1a]',
  },
  {
    num:'04', title:'Brand Identity & Visual Design',
    desc:'Cohesive visual identities that communicate your brand\'s personality across every touchpoint — from social profiles to print materials.',
    deliverables:['Logo concept & design','Brand color palette','Typography selection','Social media templates','Marketing material design'],
    tags:['Canva','Visual Identity','Brand Strategy'],
    gradient:'from-[#1a1510] to-[#3a2e15]',
  },
  {
    num:'05', title:'Post-Production & AI-Enhanced Editing',
    desc:'Professional post-production services leveraging the latest AI tools to deliver high-quality, fast-turnaround edits for all content types.',
    deliverables:['Video editing & assembly','Motion graphics & transitions','AI-powered upscaling & cleanup','Subtitle & caption integration','Multi-format export & delivery'],
    tags:['DaVinci Resolve','AI Tools','Motion Graphics','Generative AI'],
    gradient:'from-[#100a1a] to-[#2d1a4a]',
  },
]

export default function ServicesClient() {
  const heroLine1 = useRef<HTMLSpanElement>(null)
  const heroLine2 = useRef<HTMLSpanElement>(null)
  const heroSub   = useRef<HTMLParagraphElement>(null)
  const listRef   = useRef<HTMLDivElement>(null)
  const s1 = useScrollReveal<HTMLDivElement>({ stagger:0.12 })

  useEffect(() => {
    gsap.timeline({ defaults:{ ease:'power4.out' } })
      .fromTo(heroLine1.current, { y:'110%' }, { y:'0%', duration:1 }, 0.3)
      .fromTo(heroLine2.current, { y:'110%' }, { y:'0%', duration:1 }, 0.45)
      .fromTo(heroSub.current,   { y:30, opacity:0 }, { y:0, opacity:1, duration:0.8 }, 0.7)

    listRef.current?.querySelectorAll('.svc-card').forEach((c,i) => {
      gsap.fromTo(c, { y:60, opacity:0 }, {
        y:0, opacity:1, duration:0.9, ease:'power3.out', delay:i*0.08,
        scrollTrigger:{ trigger:c, start:'top 85%', once:true },
      })
    })
  }, [])

  return (
    <>
      <section className="page-hero min-h-[55vh] flex flex-col justify-end">
        <div className="page-hero-grid" />
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 rounded-full pointer-events-none animate-orb-float"
          style={{background:'radial-gradient(circle,rgba(200,240,96,0.1) 0%,transparent 70%)',filter:'blur(100px)'}} />
        <p className="section-label mb-6">What I Do</p>
        <h1 className="font-display font-extrabold text-white mb-8" style={{fontSize:'clamp(48px,7vw,110px)',lineHeight:'0.92',letterSpacing:'-0.03em'}}>
          <span className="block overflow-hidden"><span ref={heroLine1} className="block" style={{transform:'translateY(110%)'}}>Services that</span></span>
          <span className="block overflow-hidden"><span ref={heroLine2} className="block text-accent" style={{transform:'translateY(110%)'}}>drive results.</span></span>
        </h1>
        <p ref={heroSub} className="max-w-xl text-lg font-light text-muted leading-[1.8] opacity-0">
          From video production to performance advertising — everything you need to tell your brand&apos;s story and grow your business.
        </p>
      </section>

      <section className="px-8 md:px-12 py-24 md:py-32">
        <div ref={listRef} className="flex flex-col gap-5">
          {SERVICES.map(s => (
            <div key={s.num} className="svc-card group bg-bg-2 border border-white/[0.07] rounded-sm overflow-hidden transition-all duration-300 hover:border-accent/20" data-hover>
              <div className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-display text-xs font-semibold text-muted tracking-[0.1em]">{s.num}</span>
                      <div className="h-px flex-1 bg-white/[0.07]" />
                    </div>
                    <h2 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-5 group-hover:text-accent transition-colors duration-300"
                      style={{fontSize:'clamp(26px,3vw,44px)'}}>{s.title}</h2>
                    <p className="text-base font-light text-muted leading-[1.8] mb-6 max-w-xl">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map(t=>(
                        <span key={t} className="text-[11px] font-medium tracking-[0.08em] uppercase text-muted border border-white/[0.07] px-3.5 py-1.5 rounded-full group-hover:border-accent/30 group-hover:text-accent transition-all duration-200">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-72 flex-shrink-0">
                    <h4 className="font-display text-[11px] font-semibold tracking-widest uppercase text-muted mb-5">What&apos;s included</h4>
                    <ul className="flex flex-col gap-3">
                      {s.deliverables.map(d=>(
                        <li key={d} className="flex items-start gap-3 text-sm text-cream">
                          <span className="text-accent mt-0.5 flex-shrink-0">↳</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`h-1 bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-2 px-8 md:px-12 py-24 md:py-32">
        <div ref={s1}>
          <p data-reveal className="section-label">Why Work With Me</p>
          <h2 data-reveal className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-16" style={{fontSize:'clamp(32px,4vw,60px)'}}>The difference<br/>is in the craft.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[2px]">
            {[
              { icon:'🎯', title:'Strategy-Led Creativity', desc:'Every creative decision is backed by audience research and business objectives.' },
              { icon:'⚡', title:'Fast Turnaround',          desc:'Projects delivered on time without cutting corners on quality.' },
              { icon:'📈', title:'Measurable Results',       desc:'I track CTR, ROAS, CPM and conversion rates to continuously improve performance.' },
            ].map(c=>(
              <div key={c.title} data-reveal data-hover className="about-card relative bg-bg-3 p-10 overflow-hidden transition-colors duration-300 hover:bg-[#1a1a1a]">
                <span className="block text-3xl mb-5">{c.icon}</span>
                <h3 className="font-display font-bold text-[17px] text-white mb-3">{c.title}</h3>
                <p className="text-sm text-muted leading-[1.6]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 py-24 text-center" style={{background:'radial-gradient(ellipse 50% 50% at 50% 50%,rgba(200,240,96,0.05) 0%,transparent 70%)'}}>
        <h2 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-8" style={{fontSize:'clamp(32px,5vw,72px)'}}>
          Ready to get<br/>started?
        </h2>
        <Link href="/contact" className="btn-primary">Get In Touch</Link>
      </section>
    </>
  )
}
