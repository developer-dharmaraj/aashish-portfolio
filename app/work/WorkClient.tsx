'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { POSTS, CATS, type Post } from './posts'

gsap.registerPlugin(ScrollTrigger)

const ASPECT: Record<Post['aspect'], string> = {
  portrait: 'aspect-[9/16]',
  square: 'aspect-[1/1]',
  landscape: 'aspect-[16/9]',
  wide: 'aspect-[21/9]',
}

const CAT_GRADIENT: Record<string, string> = {
  'Reels': 'from-[#2a0a2e] via-[#3d1545] to-[#5a1a6a]',
  'Video Production': 'from-[#0a1020] via-[#0f1a35] to-[#0a2855]',
  'Meta Ads': 'from-[#200a0a] via-[#351515] to-[#4a1010]',
  'graphic design': 'from-[#0a1a0a] via-[#0f2d10] to-[#0a3a0a]',
  'Brand Identity': 'from-[#201508] via-[#302010] to-[#3a2808]',
  'Motion & Animation': 'from-[#080820] via-[#10103a] to-[#0a0a4a]',
  'Film Direction': 'from-[#180a22] via-[#251238] to-[#2d1a48]',
}

const PLATFORM: Record<Post['platform'], { label: string; color: string; bg: string; icon: JSX.Element }> = {
  instagram: {
    label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,0.12)',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
  },
  youtube: {
    label: 'YouTube', color: '#FF0000', bg: 'rgba(255,0,0,0.12)',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
  },
  facebook: {
    label: 'Facebook', color: '#1877F2', bg: 'rgba(24,119,242,0.12)',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
  },
}

// ── Single Card ──────────────────────────────────────────────
const MEDIA_URL_RE = /\.(png|jpe?g|webp|gif|avif|mp4|webm|mov)(\?.*)?$/i
const VIDEO_URL_RE = /\.(mp4|webm|mov)(\?.*)?$/i

function getPreviewUrl(post: Post) {
  const postUrl = post.postUrl.trim()

  if (postUrl && MEDIA_URL_RE.test(postUrl)) return postUrl
  if (!postUrl && post.thumb) return post.thumb

  return ''
}

function shouldOpenPreview(post: Post) {
  return Boolean(getPreviewUrl(post))
}

function PostCard({ post, index, onPreview }: { post: Post; index: number; onPreview: (post: Post) => void }) {
  const grad = CAT_GRADIENT[post.cat] || 'from-[#141414] to-[#0a0a0a]'
  const p = PLATFORM[post.platform]
  const ref = useRef<HTMLAnchorElement>(null)
  const preview = shouldOpenPreview(post)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: (index % 4) * 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
      }
    )
  }, [index])

  return (
    <a
      ref={ref}
      href={preview ? getPreviewUrl(post) : post.postUrl}
      target={preview ? undefined : '_blank'}
      rel={preview ? undefined : 'noopener noreferrer'}
      onClick={event => {
        if (!preview) return
        event.preventDefault()
        onPreview(post)
      }}
      data-cat={post.cat}
      className="proj-card group block no-underline rounded-xl overflow-hidden bg-bg-3 relative"
      style={{ breakInside: 'avoid', marginBottom: '12px', opacity: 0 }}
    >
      {/* Media area — natural aspect ratio */}
      <div className={`relative overflow-hidden ${post.thumb ? '' : ASPECT[post.aspect]}`}>
        {post.thumb ? (
          <>
            <img
              src={post.thumb}
              // alt={post.title}
              className="block w-full h-auto transition-opacity duration-300 group-hover:opacity-90"
              loading="lazy"
            />
            {/* subtle dark tint */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-300" />
          </>
        ) : (
          /* Gradient placeholder */
          <div className={`absolute inset-0 bg-gradient-to-br ${grad}`}>
            {/* decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-white/10 absolute" />
              <div className="w-28 h-28 rounded-full border border-dashed border-white/[0.06] absolute" />
              <div className="w-40 h-40 rounded-full border border-white/[0.04] absolute" />
              {/* category icon-ish letter */}
              <span className="font-display font-extrabold text-white/10 text-6xl select-none">
                {post.cat.charAt(0)}
              </span>
            </div>
          </div>
        )}

        {/* Platform badge — top left */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md border"
            style={{ color: p.color, background: p.bg, borderColor: `${p.color}30` }}
          >
            {p.icon}
            {p.label}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="flex items-center gap-2 font-display text-[13px] font-bold text-white bg-black/50 backdrop-blur-md border border-white/25 px-4 py-2 rounded-full">
            {preview ? 'Preview' : 'View Post\u00a0\u2197'}
          </span>
        </div>
      </div>

      {/* Info row */}
      <div className="px-3.5 pt-3 pb-3.5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-accent">{post.cat}</span>
        </div>
      </div>
    </a>
  )
}

// ── Masonry grid using CSS columns ───────────────────────────
function WorkPreviewModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const previewUrl = getPreviewUrl(post)
  const isVideo = VIDEO_URL_RE.test(previewUrl)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!previewUrl) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${post.cat} preview`}
    >
      <div
        className="relative w-full max-w-5xl rounded-xl border border-white/10 bg-bg-2 p-3 shadow-2xl"
        onClick={event => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          data-hover
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-xl leading-none text-white backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
          aria-label="Close preview"
        >
          x
        </button>

        {isVideo ? (
          <video
            src={previewUrl}
            controls
            autoPlay
            className="max-h-[82vh] w-full rounded-lg bg-black object-contain"
          />
        ) : (
          <img
            src={previewUrl}
            alt={`${post.cat} preview`}
            className="max-h-[82vh] w-full rounded-lg object-contain"
          />
        )}
      </div>
    </div>
  )
}

function MasonryGrid({ posts, onPreview }: { posts: Post[]; onPreview: (post: Post) => void }) {
  return (
    <div
      style={{
        columnCount: 'var(--cols)' as never,
        columnGap: '12px',
      } as React.CSSProperties}
      className="[--cols:2] sm:[--cols:3] lg:[--cols:4]"
    >
      {posts.map((post, i) => (
        <PostCard key={`${post.id}-${i}`} post={post} index={i} onPreview={onPreview} />
      ))}
    </div>
  )
}

// ── Main WorkClient ──────────────────────────────────────────
export default function WorkClient() {
  const heroLine1 = useRef<HTMLSpanElement>(null)
  const heroLine2 = useRef<HTMLSpanElement>(null)
  const heroSub = useRef<HTMLParagraphElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const [activeCat, setActiveCat] = useState('All')
  const [previewPost, setPreviewPost] = useState<Post | null>(null)

  const filteredPosts = activeCat === 'All'
    ? POSTS
    : POSTS.filter(p => p.cat === activeCat)

  useEffect(() => {
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo(heroLine1.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.3)
      .fromTo(heroLine2.current, { y: '110%' }, { y: '0%', duration: 1 }, 0.45)
      .fromTo(heroSub.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.7)
      .fromTo(filterRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.85)
  }, [])

  const handleFilter = useCallback((cat: string) => {
    setActiveCat(cat)
    // Kill old ScrollTriggers so new cards animate fresh
    ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero min-h-[55vh] flex flex-col justify-end">
        <div className="page-hero-grid" />
        <div className="absolute w-[500px] h-[500px] -top-20 -right-20 rounded-full pointer-events-none animate-orb-float"
          style={{ background: 'radial-gradient(circle,rgba(200,240,96,0.1) 0%,transparent 70%)', filter: 'blur(100px)' }} />
        <p className="section-label mb-6">My Work</p>
        <h1 className="font-display font-extrabold text-white mb-8"
          style={{ fontSize: 'clamp(48px,7vw,110px)', lineHeight: '0.92', letterSpacing: '-0.03em' }}>
          <span className="block overflow-hidden">
            <span ref={heroLine1} className="block" style={{ transform: 'translateY(110%)' }}>Work I am</span>
          </span>
          <span className="block overflow-hidden">
            <span ref={heroLine2} className="block text-accent" style={{ transform: 'translateY(110%)' }}>proud of.</span>
          </span>
        </h1>
        <p ref={heroSub} className="max-w-xl text-lg font-light text-muted leading-[1.8] opacity-0">
          Reels, videos, ads, brand content — apni natural size mein. Click karo seedha platform pe jao.
        </p>
      </section>

      {/* ── Content ── */}
      <section className="px-4 sm:px-8 md:px-12 py-20 md:py-28">

        {/* Category Filter pills */}
        <div ref={filterRef} className="flex flex-wrap gap-2 mb-10 opacity-0">
          {CATS.map(c => {
            const count = c === 'All' ? POSTS.length : POSTS.filter(p => p.cat === c).length
            return (
              <button
                key={c}
                onClick={() => handleFilter(c)}
                data-hover
                className={`flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase border px-4 py-2 rounded-full transition-all duration-200 font-display ${activeCat === c
                    ? 'bg-accent text-bg border-accent'
                    : 'text-muted border-white/[0.07] hover:border-cream/30 hover:text-cream'
                  }`}
              >
                {c}
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${activeCat === c ? 'bg-bg/20' : 'bg-white/[0.06]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Pinterest Masonry Grid */}
        <MasonryGrid key={activeCat} posts={filteredPosts} onPreview={setPreviewPost} />

      </section>

      {/* ── CTA ── */}
      <section className="bg-bg-2 px-8 md:px-12 py-24 text-center">
        <h2 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-6"
          style={{ fontSize: 'clamp(28px,4vw,56px)' }}>
          Want to be my next success story?
        </h2>
        <Link href="/contact" className="btn-primary">Start a Project</Link>
      </section>

      {previewPost && (
        <WorkPreviewModal
          post={previewPost}
          onClose={() => setPreviewPost(null)}
        />
      )}
    </>
  )
}
