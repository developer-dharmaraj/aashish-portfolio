'use client'
import { useScrollReveal } from '@/components/useScrollReveal'

const TESTIMONIALS = [
  { text:'"Aashish transformed our digital presence completely. His Meta Ads campaigns generated 3x more qualified leads within the first month. Exceptional creative & strategic thinking."', name:'Rajesh Malviya', role:'Director, Karmyug Techzone', initials:'RM', color:'#c8f060' },
  { text:'"His reels and video content for our brand went viral multiple times. Aashish understands both storytelling and algorithms — a rare combination."', name:'Priya Tiwari', role:'Founder, Local Brand, Ratlam', initials:'PT', color:'#ff5c3a' },
  { text:'"Working with Aashish on our ad campaigns gave us the best ROAS we have ever seen. He knows exactly how to convert audiences into customers."', name:'Amit Sharma', role:'Business Owner, MP', initials:'AS', color:'#5c8aff' },
]

export default function TestimonialsSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ stagger:0.12 })
  const gridRef   = useScrollReveal<HTMLDivElement>({ y:40, stagger:0.15, delay:0.1 })

  return (
    <section className="bg-bg-2 px-8 md:px-12 py-24 md:py-32">
      <div ref={headerRef} className="mb-16">
        <p data-reveal className="section-label">Client Love</p>
        <h2 data-reveal className="font-display font-extrabold leading-[1] tracking-tighter text-white" style={{fontSize:'clamp(36px,5vw,72px)'}}>What They Say</h2>
      </div>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map(t => (
          <div key={t.name} data-reveal data-hover
            className="bg-bg-3 border border-white/[0.07] rounded-sm p-10 transition-all duration-300 hover:border-accent/20 hover:-translate-y-1">
            <div className="flex gap-1 mb-6">{Array(5).fill(0).map((_,i)=><span key={i} className="text-accent text-sm">★</span>)}</div>
            <p className="text-base font-light text-cream leading-[1.8] mb-8 italic">{t.text}</p>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-base font-bold text-bg flex-shrink-0" style={{background:t.color}}>{t.initials}</div>
              <div>
                <div className="font-display text-[15px] font-semibold text-white">{t.name}</div>
                <div className="text-sm text-muted">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
