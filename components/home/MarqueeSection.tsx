'use client'
import Image from 'next/image'

const ITEMS = [
  { name: '', src: '/canva.png' },
  { name: '', src: '/pngwing.com (2).png' },
  { name: '', src: '/pngwing.com (1).png' },
  { name: '', src: '/pngwing.com (4).png' },
  { name: '', src: '/pngwing.com.png' },
  { name: 'Brand Strategy', src: '/logos/strategy.svg' },
  { name: 'Content Creation', src: '/logos/content.svg' },
  { name: 'Post-Production', src: '/logos/post.svg' },
]

const ALL = [...ITEMS, ...ITEMS]

export default function MarqueeSection() {
  return (
    <div className="py-5 border-t border-b border-white/[0.07] overflow-hidden">
      <div className="marquee-track flex items-center gap-12">
        {ALL.map((item, i) => (
          <div key={i} className="flex items-center gap-4 font-display text-[13px] font-semibold tracking-[0.12em] uppercase text-muted whitespace-nowrap">

            <div className="relative w-10 h-10 opacity-70 invert-0 brightness-100">
              <Image
                src={item.src}
                alt={item.name}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>

            <span>{item.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block flex-shrink-0 ml-4" />
          </div>
        ))}
      </div>
    </div>
  )
}