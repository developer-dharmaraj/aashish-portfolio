'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '@/components/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { num:'01', name:'Video Production & Direction',  tags:['DaVinci Resolve','Premiere Pro','Reels'] },
  { num:'02', name:'Meta Ads & Google Ads',          tags:['Lead Gen','ROAS','Conversion'] },
  { num:'03', name:'Content Creation & Strategy',   tags:['Reels','Social Media','Scripting'] },
  { num:'04', name:'Brand Identity & Design',        tags:['Canva','Visual Identity','Storytelling'] },
  { num:'05', name:'Post-Production Editing',        tags:['Color Grading','Motion Graphics','Audio'] },
]

export default function ServicesPreview() {
  const headerRef = useScrollReveal<HTMLDivElement>({ stagger:0.12 })
  const listRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.querySelectorAll('.srv-row').forEach((item, i) => {
      gsap.fromTo(item, { x:-40, opacity:0 }, {
        x:0, opacity:1, duration:0.7, ease:'power3.out', delay:i*0.08,
        scrollTrigger:{ trigger:item, start:'top 88%', once:true },
      })
    })
  }, [])

  return (
    <section id="services" className="px-8 md:px-12 py-24 md:py-32">
      <div ref={headerRef} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
        <div>
          <p data-reveal className="section-label">What I Do</p>
          <h2 data-reveal className="font-display font-extrabold leading-[1] tracking-tighter text-white" style={{fontSize:'clamp(36px,5vw,72px)'}}>My Services</h2>
        </div>
        <div className="flex flex-col items-start gap-4">
          <p data-reveal className="max-w-xs text-[15px] text-muted leading-[1.7]">End-to-end creative & digital solutions with measurable impact.</p>
          <Link data-reveal href="/services" className="btn-outline">All Services →</Link>
        </div>
      </div>
      <div ref={listRef}>
        {SERVICES.map(s => (
          <Link key={s.num} href="/services" className="service-item srv-row group">
            <span className="font-display text-xs font-semibold text-muted tracking-[0.08em]">{s.num}</span>
            <span className="font-display font-bold text-white group-hover:text-accent transition-colors duration-200"
              style={{fontSize:'clamp(22px,3vw,40px)',letterSpacing:'-0.02em'}}>{s.name}</span>
            <div className="hidden md:flex gap-2.5 justify-end flex-wrap">
              {s.tags.map(t => (
                <span key={t} className="text-[11px] font-medium tracking-[0.08em] uppercase text-muted border border-white/[0.07] px-3.5 py-1.5 rounded-full transition-all duration-200 group-hover:border-accent/30 group-hover:text-accent">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
