'use client'
import Link from 'next/link'
import { useScrollReveal } from '@/components/useScrollReveal'

const STEPS = [
  { num:'01', title:'Discovery',     desc:'Understanding your brand, goals, target audience, and the story you want to tell.' },
  { num:'02', title:'Strategy',      desc:'Crafting a creative & digital plan — from ad targeting to content calendar.' },
  { num:'03', title:'Production',    desc:'Shoot, direct, edit — delivering high-quality video and visual content.' },
  { num:'04', title:'Launch & Optimise', desc:'Deploy campaigns, track CTR/ROAS/CPM, and iterate for maximum results.' },
]

export default function ProcessPreview() {
  const headerRef = useScrollReveal<HTMLDivElement>({ stagger:0.12 })
  const stepsRef  = useScrollReveal<HTMLDivElement>({ y:40, stagger:0.1, delay:0.2 })

  return (
    <section id="process" className="px-8 md:px-12 py-24 md:py-32">
      <div ref={headerRef} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
        <div>
          <p data-reveal className="section-label">How I Work</p>
          <h2 data-reveal className="font-display font-extrabold leading-[1] tracking-tighter text-white" style={{fontSize:'clamp(36px,5vw,72px)'}}>My Process</h2>
        </div>
        <Link data-reveal href="/process" className="btn-outline hidden md:inline-flex">Full Process →</Link>
      </div>
      <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
        {STEPS.map(s => (
          <div key={s.num} data-reveal data-hover className="about-card bg-bg-2 p-8 transition-colors duration-300 hover:bg-bg-3">
            <span className="font-display text-xs font-semibold text-muted tracking-widest block mb-6">{s.num}</span>
            <h3 className="font-display font-bold text-white text-lg mb-3">{s.title}</h3>
            <p className="text-sm text-muted leading-[1.6]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
