'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal<T extends HTMLElement>(opts: {
  y?: number; duration?: number; stagger?: number; delay?: number; ease?: string
} = {}) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const { y=50, duration=0.9, stagger=0.1, delay=0, ease='power3.out' } = opts
    const children = el.querySelectorAll('[data-reveal]')
    const targets  = children.length ? Array.from(children) : [el]
    gsap.fromTo(targets, { y, opacity:0 }, {
      y:0, opacity:1, duration, delay, stagger, ease,
      scrollTrigger: { trigger:el, start:'top 85%', once:true },
    })
  }, [])
  return ref
}
