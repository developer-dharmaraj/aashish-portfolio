'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!
    let mx = 0, my = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      gsap.to(dot,  { x: mx, y: my, duration: 0.08, ease: 'power2.out' })
      gsap.to(ring, { x: mx, y: my, duration: 0.32, ease: 'power3.out' })
    }
    const onEnter = () => {
      gsap.to(dot,  { width: 48, height: 48, backgroundColor:'rgba(200,240,96,0.15)', duration:0.3 })
      gsap.to(ring, { width: 0,  height: 0,  duration:0.3 })
    }
    const onLeave = () => {
      gsap.to(dot,  { width: 10, height: 10, backgroundColor:'#c8f060', duration:0.3 })
      gsap.to(ring, { width: 40, height: 40, duration:0.3 })
    }

    document.addEventListener('mousemove', onMove)

    const attach = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList:true, subtree:true })

    return () => { document.removeEventListener('mousemove', onMove); obs.disconnect() }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="fixed top-0 left-0 w-[10px] h-[10px] bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference" style={{willChange:'transform'}} />
      <div ref={ringRef} className="fixed top-0 left-0 w-[40px] h-[40px] border border-accent/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" style={{willChange:'transform'}} />
    </>
  )
}
