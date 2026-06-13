'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '@/components/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name:'DaVinci Resolve',    color:'#c8f060' },
  { name:'Adobe Premiere Pro', color:'#ff5c3a' },
  { name:'Meta Ads Manager',   color:'#5c8aff' },
  { name:'Google Ads',         color:'#f0c060' },
  { name:'Canva',              color:'#c8f060' },
  { name:'Generative AI',      color:'#ff5c3a' },
  { name:'Scriptwriting',      color:'#5c8aff' },
  { name:'Storyboarding',      color:'#f0c060' },
]

const VALUES = [
  { icon:'🎬', title:'Visual Storytelling',   desc:'Every frame and cut is intentional. Storytelling that moves audiences.' },
  { icon:'📊', title:'Data-Driven Marketing', desc:'Creative work backed by metrics — CTR, ROAS, CPM and conversion rates.' },
  { icon:'⚡', title:'Fast Turnaround',       desc:'Quick delivery without compromising quality. Speed and excellence together.' },
  { icon:'🤝', title:'Client Partnership',    desc:'Your brand goals are my goals. I am invested in your success, not just the output.' },
]

export default function AboutClient() {
  const heroLine1 = useRef<HTMLSpanElement>(null)
  const heroLine2 = useRef<HTMLSpanElement>(null)
  const heroSub   = useRef<HTMLParagraphElement>(null)
  const s1 = useScrollReveal<HTMLDivElement>({ stagger:0.12 })
  const s2 = useScrollReveal<HTMLDivElement>({ stagger:0.1, delay:0.1 })
  const s3 = useScrollReveal<HTMLDivElement>({ stagger:0.1 })
  const s4 = useScrollReveal<HTMLDivElement>({ stagger:0.12 })

  useEffect(() => {
    gsap.timeline({ defaults:{ ease:'power4.out' } })
      .fromTo(heroLine1.current, { y:'110%' }, { y:'0%', duration:1 }, 0.3)
      .fromTo(heroLine2.current, { y:'110%' }, { y:'0%', duration:1 }, 0.45)
      .fromTo(heroSub.current,   { y:30, opacity:0 }, { y:0, opacity:1, duration:0.8 }, 0.7)
  }, [])

  return (
    <>
      <section className="page-hero min-h-[60vh] flex flex-col justify-end">
        <div className="page-hero-grid" />
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 rounded-full pointer-events-none animate-orb-float"
          style={{ background:'radial-gradient(circle,rgba(200,240,96,0.1) 0%,transparent 70%)', filter:'blur(100px)' }} />
        <p className="section-label mb-6">About Me</p>
        <h1 className="font-display font-extrabold text-white mb-8"
          style={{ fontSize:'clamp(48px,7vw,110px)', lineHeight:'0.92', letterSpacing:'-0.03em' }}>
          <span className="block overflow-hidden"><span ref={heroLine1} className="block" style={{ transform:'translateY(110%)' }}>Creative Director</span></span>
          <span className="block overflow-hidden"><span ref={heroLine2} className="block text-accent" style={{ transform:'translateY(110%)' }}>& storyteller.</span></span>
        </h1>
        <p ref={heroSub} className="max-w-xl text-lg font-light text-muted leading-[1.8] opacity-0">
          Based in Mumbai/Ratlam — I blend cinematic video production with data-driven digital marketing to create content that captivates and converts.
        </p>
      </section>

      <section className="bg-bg-2 px-8 md:px-12 py-24 md:py-32">
        <div ref={s1} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p data-reveal className="section-label">My Story</p>
            <h2 data-reveal className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-8"
              style={{ fontSize:'clamp(32px,4vw,60px)' }}>
              From film sets<br />to digital campaigns.
            </h2>
            <p data-reveal className="text-base font-light text-muted leading-[1.8] mb-4">
              My journey started on Mumbai film sets — assisting directors on Crime Patrol and commercial productions. That experience sharpened my eye for visual storytelling and precise execution.
            </p>
            <p data-reveal className="text-base font-light text-muted leading-[1.8] mb-4">
              Since April 2024, I&apos;ve been driving creative & digital strategy at Karmyug Techzone in Ratlam — planning Meta & Google Ads campaigns, managing end-to-end video production, and building brand presence across digital platforms.
            </p>
            <p data-reveal className="text-base font-light text-muted leading-[1.8]">
              I bring together cinematic craft and performance marketing to deliver content that doesn&apos;t just look great — it generates real business results.
            </p>
          </div>
          <div ref={s2} className="grid grid-cols-2 gap-[2px]">
            {[{num:'50+',label:'Projects delivered'},{num:'3+',label:'Years experience'},{num:'10+',label:'Brands built'},{num:'98%',label:'Client satisfaction'}].map(s => (
              <div key={s.label} data-reveal className="bg-bg-3 p-10 flex flex-col justify-between min-h-[160px] transition-colors duration-300 hover:bg-[#1a1a1a]">
                <span className="font-display font-extrabold text-accent leading-none tracking-tighter"
                  style={{ fontSize:'clamp(36px,4vw,56px)' }}>{s.num}</span>
                <span className="text-sm text-muted mt-4">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 py-24 md:py-32">
        <div ref={s3}>
          <p data-reveal className="section-label">What I Stand For</p>
          <h2 data-reveal className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-16"
            style={{ fontSize:'clamp(32px,4vw,60px)' }}>My Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
            {VALUES.map(v => (
              <div key={v.title} data-reveal data-hover
                className="about-card relative bg-bg-2 p-8 overflow-hidden transition-colors duration-300 hover:bg-bg-3">
                <span className="block text-3xl mb-5">{v.icon}</span>
                <h3 className="font-display font-bold text-[17px] text-white mb-3">{v.title}</h3>
                <p className="text-sm text-muted leading-[1.6]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-2 px-8 md:px-12 py-24 md:py-32">
        <div ref={s4}>
          <p data-reveal className="section-label">Skills & Tools</p>
          <h2 data-reveal className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-16"
            style={{ fontSize:'clamp(32px,4vw,60px)' }}>My Toolkit</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {SKILLS.map(m => (
              <div key={m.name} data-reveal data-hover
                className="bg-bg-3 border border-white/[0.07] p-8 rounded-sm transition-all duration-300 hover:border-accent/20 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-display text-base font-bold text-bg mb-5 text-xl"
                  style={{ background:m.color }}>✦</div>
                <h3 className="font-display font-bold text-white text-sm leading-snug">{m.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 py-24 text-center"
        style={{ background:'radial-gradient(ellipse 50% 50% at 50% 50%,rgba(200,240,96,0.05) 0%,transparent 70%)' }}>
        <h2 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-8"
          style={{ fontSize:'clamp(32px,5vw,72px)' }}>
          Want to work together?
        </h2>
        <Link href="/contact" className="btn-primary">Get In Touch</Link>
      </section>
    </>
  )
}
