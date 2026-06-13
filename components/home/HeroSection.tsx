'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const STATS = [
  { num: 3, suffix: '+', label: 'Years Experience' },
  { num: 50, suffix: '+', label: 'Projects Delivered' },
  { num: 10, suffix: '+', label: 'Brands Built' },
]

export default function HeroSection() {
  const tagRef = useRef<HTMLParagraphElement>(null)
  const line1 = useRef<HTMLSpanElement>(null)
  const line2 = useRef<HTMLSpanElement>(null)
  const line3 = useRef<HTMLSpanElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.fromTo(tagRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.3)
      .fromTo(line1.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.5)
      .fromTo(line2.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.65)
      .fromTo(line3.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.8)
      .fromTo(bottomRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.0)
      .add(() => {
        numRefs.current.forEach((el, i) => {
          if (!el) return
          const target = STATS[i].num
          const suffix = STATS[i].suffix
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate() { el.textContent = Math.floor(obj.val) + suffix },
          })
        })
      }, 1.2)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col pt-10 justify-end px-8 md:px-12 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
      {/* Orbs */}
      <div className="absolute w-[600px] h-[600px] -top-24 -right-24 rounded-full pointer-events-none animate-orb-float"
        style={{ background: 'radial-gradient(circle,rgba(200,240,96,0.12) 0%,transparent 70%)', filter: 'blur(120px)' }} />
      <div className="absolute w-[400px] h-[400px] bottom-24 -left-12 rounded-full pointer-events-none animate-orb-float-reverse"
        style={{ background: 'radial-gradient(circle,rgba(255,92,58,0.08) 0%,transparent 70%)', filter: 'blur(120px)' }} />

      <h1 className="font-display mt-24 font-extrabold text-white mb-10 max-w-[1100px]"
        style={{ fontSize: 'clamp(56px,9vw,140px)', lineHeight: '0.92', letterSpacing: '-0.03em' }}>
        <span className="block overflow-hidden"><span ref={line1} className="block" style={{ transform: 'translateY(110%)' }}>Aashish</span></span>
        <span className="block overflow-hidden"><span ref={line2} className="block text-accent" style={{ transform: 'translateY(110%)' }}>Pandey</span></span>
        {/* <span className="block overflow-hidden"><span ref={line3} className="block" style={{ transform: 'translateY(110%)' }}>director.</span></span> */}
      </h1>

      <div ref={bottomRef} className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 opacity-0">
        <div>
          <p className="max-w-[500px] text-base font-light text-muted leading-[1.7] mb-8">
            <strong className="text-cream font-normal">Aashish Pandey</strong> Creative & Digital Media Director specializing in Digital Marketing, Performance Advertising, Video Production, and Post-Production Editing. Experienced in driving brand growth, lead generation, and audience engagement through data-driven marketing strategies and compelling visual storytelling.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/work" className="btn-primary">View My Work ↗</Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-muted hover:text-cream transition-colors duration-200 no-underline group">
              Let&apos;s Collaborate <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
        <div className="flex gap-10 md:gap-12">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-right">
              <div className="font-display font-extrabold text-white leading-none tracking-tighter" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>
                <span ref={el => { numRefs.current[i] = el }}>0{s.suffix}</span>
              </div>
              <div className="text-xs text-muted mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
