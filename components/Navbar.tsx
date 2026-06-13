'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

const NAV_LINKS = [
  { label:'About',    href:'/about'    },
  { label:'Services', href:'/services' },
  { label:'Work',     href:'/work'     },
  { label:'Process',  href:'/process'  },
  { label:'Contact',  href:'/contact'  },
]

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current, { y:-80, opacity:0 }, { y:0, opacity:1, duration:1, ease:'power3.out', delay:0.2 })
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 flex items-center justify-between px-8 md:px-12 py-6 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur-xl border-b border-white/[0.07]'
                 : 'bg-gradient-to-b from-bg/90 to-transparent'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-white no-underline">
        Aashish<span className="text-accent">.</span>
      </Link>

      {/* Desktop */}
      <ul className="hidden md:flex gap-10 list-none">
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`text-sm no-underline tracking-wide transition-colors duration-200 ${
                pathname === l.href ? 'text-accent' : 'text-muted hover:text-cream'
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="hidden md:inline-flex font-display text-[13px] font-semibold uppercase tracking-widest text-bg bg-accent px-6 py-[10px] rounded-full no-underline transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(200,240,96,0.3)]"
      >
        Let's Talk →
      </Link>

      {/* Hamburger */}
      <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setOpen(!open)} aria-label="Menu">
        <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${open?'rotate-45 translate-y-[6.5px]':''}`}/>
        <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${open?'opacity-0':''}`}/>
        <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${open?'-rotate-45 -translate-y-[6.5px]':''}`}/>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-bg-2 border-b border-white/[0.07] md:hidden px-8 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={()=>setOpen(false)}
              className={`font-display font-semibold text-base no-underline transition-colors ${pathname===l.href?'text-accent':'text-cream'}`}
            >{l.label}</Link>
          ))}
          <Link href="/contact" onClick={()=>setOpen(false)}
            className="font-display text-sm font-semibold uppercase tracking-widest text-bg bg-accent px-6 py-3 rounded-full no-underline w-fit mt-2"
          >Let's Talk →</Link>
        </div>
      )}
    </nav>
  )
}
