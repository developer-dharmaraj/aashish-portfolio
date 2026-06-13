'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '@/components/useScrollReveal'
import { POSTS, type Post } from '@/app/work/posts'

gsap.registerPlugin(ScrollTrigger)

const CAT_GRADIENT: Record<string, string> = {
  'Reels':            'from-[#2a0a2e] via-[#3d1545] to-[#5a1a6a]',
  'Video Production': 'from-[#0a1020] via-[#0f1a35] to-[#0a2855]',
  'Meta Ads':         'from-[#200a0a] via-[#351515] to-[#4a1010]',
  'Google Ads':       'from-[#0a1a0a] via-[#0f2d10] to-[#0a3a0a]',
  'Brand Identity':   'from-[#201508] via-[#302010] to-[#3a2808]',
  'Content Creation': 'from-[#080820] via-[#10103a] to-[#0a0a4a]',
  'Film Direction':   'from-[#180a22] via-[#251238] to-[#2d1a48]',
}

const ASPECT_CLASS: Record<Post['aspect'], string> = {
  portrait:  'aspect-[9/16]',
  square:    'aspect-[1/1]',
  landscape: 'aspect-[16/9]',
  wide:      'aspect-[21/9]',
}

const PLATFORM_COLOR: Record<Post['platform'], string> = {
  instagram: '#E1306C',
  youtube:   '#FF0000',
  facebook:  '#1877F2',
}

// Show first 8 posts on homepage
const PREVIEW = POSTS.slice(0, 8)

function MiniCard({ post, index }: { post: Post; index: number }) {
  const grad   = CAT_GRADIENT[post.cat] || 'from-[#141414] to-[#0a0a0a]'
  const pColor = PLATFORM_COLOR[post.platform]
  const ref    = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.8, ease: 'power3.out',
        delay: (index % 4) * 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      }
    )
  }, [index])

  return (
    <a
      ref={ref}
      href={post.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-hover
      className="wcard group block no-underline rounded-xl overflow-hidden bg-bg-3 relative"
      style={{ breakInside: 'avoid', marginBottom: '10px', opacity: 0 }}
    >
      <div className={`relative overflow-hidden ${ASPECT_CLASS[post.aspect]}`}>
        {post.thumb ? (
          <>
            <img src={post.thumb} alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              loading="lazy" />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/40 transition-colors duration-300" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${grad}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-extrabold text-white/10 text-5xl select-none">{post.cat.charAt(0)}</span>
            </div>
          </div>
        )}
        {/* Platform dot */}
        <div className="absolute top-2 left-2 z-10">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold backdrop-blur-md border"
            style={{ color: pColor, background: `${pColor}15`, borderColor: `${pColor}30` }}>
            {post.platform}
          </span>
        </div>
        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="font-display text-[12px] font-bold text-white bg-black/50 backdrop-blur-md border border-white/25 px-3.5 py-1.5 rounded-full">
            View ↗
          </span>
        </div>
      </div>
      <div className="px-3 pt-2.5 pb-3">
        <span className="text-[9px] font-bold tracking-widest uppercase text-accent block mb-0.5">{post.cat}</span>
        <p className="font-display text-[12px] font-semibold text-white line-clamp-1 group-hover:text-accent transition-colors">{post.title}</p>
      </div>
    </a>
  )
}

export default function WorkPreview() {
  const headerRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 })

  return (
    <section id="work" className="bg-bg-2 px-4 sm:px-8 md:px-12 py-24 md:py-32">
      <div ref={headerRef} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
        <div>
          <p data-reveal className="section-label">Selected Work</p>
          <h2 data-reveal className="font-display font-extrabold leading-[1] tracking-tighter text-white"
            style={{ fontSize: 'clamp(36px,5vw,72px)' }}>
            Projects I Am<br />Proud Of
          </h2>
        </div>
        <Link data-reveal href="/work" className="btn-outline hidden md:inline-flex">View All Projects</Link>
      </div>

      {/* Pinterest masonry — 2 cols mobile, 3 tablet, 4 desktop */}
      <div
        style={{ columnCount: 'var(--cols)' as never, columnGap: '10px' } as React.CSSProperties}
        className="[--cols:2] sm:[--cols:3] lg:[--cols:4]"
      >
        {PREVIEW.map((post, i) => (
          <MiniCard key={post.id} post={post} index={i} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/work" className="btn-outline">View All Projects →</Link>
      </div>
    </section>
  )
}
