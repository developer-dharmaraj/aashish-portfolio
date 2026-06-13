'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger:{ trigger:sectionRef.current, start:'top 75%', once:true } })
    tl.fromTo(labelRef.current,   { y:30, opacity:0 }, { y:0, opacity:1, duration:0.7, ease:'power3.out' })
      .fromTo(titleRef.current,   { y:60, opacity:0 }, { y:0, opacity:1, duration:1,   ease:'power4.out' }, '-=0.4')
      .fromTo(actionsRef.current, { y:30, opacity:0 }, { y:0, opacity:1, duration:0.7, ease:'power3.out' }, '-=0.6')
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative px-8 md:px-12 py-36 md:py-48 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(200,240,96,0.06) 0%,transparent 70%)' }} />
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-8 pointer-events-none opacity-10">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent" />
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent" />
      </div>
      <div ref={labelRef} className="flex justify-center mb-6 opacity-0">
        <p className="section-label">Ready to Collaborate?</p>
      </div>
      <h2 ref={titleRef} className="font-display font-extrabold text-white mb-14 opacity-0"
        style={{ fontSize:'clamp(48px,8vw,120px)', lineHeight:'0.9', letterSpacing:'-0.04em' }}>
        {"Let's create"}<br />
        {"something "}<span className="text-accent">great.</span>
      </h2>
      <div ref={actionsRef} className="flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0">
        <Link href="/contact" data-hover className="btn-primary">Start a Project</Link>
        <a href="tel:+916261501625" data-hover className="btn-outline">Schedule a Call</a>
      </div>
    </section>
  )
}
