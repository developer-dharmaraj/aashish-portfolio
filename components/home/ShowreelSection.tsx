'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ShowreelSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.fromTo(labelRef.current, { y:20, opacity:0 }, {
      y:0, opacity:1, duration:0.7, ease:'power3.out',
      scrollTrigger:{ trigger:sectionRef.current, start:'top 80%', once:true },
    })
    gsap.fromTo(innerRef.current, { y:60, opacity:0, scale:0.97 }, {
      y:0, opacity:1, scale:1, duration:1.1, ease:'power3.out',
      scrollTrigger:{ trigger:sectionRef.current, start:'top 75%', once:true },
    })
  }, [])

  return (
    <section ref={sectionRef} className="px-8 md:px-12 py-24 md:py-32">
      <p ref={labelRef} className="section-label mb-8 opacity-0">Showreel</p>
      <div ref={innerRef} className="relative rounded-sm overflow-hidden opacity-0 cursor-pointer group" data-hover
        style={{ aspectRatio:'16/9', background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <div className="w-[100px] h-[100px] rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-accent/60 group-hover:bg-accent/10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M6 4.75L17.25 12 6 19.25V4.75Z" fill="#c8f060" stroke="#c8f060" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-bold text-white mb-2">Watch My Showreel</p>
            <p className="text-sm text-muted">Video production · Direction · Ads · Reels</p>
          </div>
        </div>
        <div className="absolute top-6 right-6">
          <span className="flex items-center gap-1.5 font-display text-[10px] font-semibold tracking-widest uppercase text-accent bg-black/60 border border-accent/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent blink-dot inline-block" />
            2025
          </span>
        </div>
      </div>
    </section>
  )
}
