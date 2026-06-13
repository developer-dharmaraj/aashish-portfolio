# DevMark Studio — Next.js 14 Complete Website

A **production-ready**, fully animated dark design agency website built with:

- **Next.js 14** (App Router, Server Components)
- **GSAP 3.12** (ScrollTrigger, timelines, counters, FAQ accordion)
- **Tailwind CSS v3** (custom tokens, utility classes)
- **TypeScript** (strict mode)
- **Syne** (display font) + **DM Sans** (body font)

---

## 🚀 Quick Start

```bash
# 1 — Install dependencies
npm install

# 2 — Start dev server
npm run dev

# 3 — Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
devmark/
│
├── app/                        ← Next.js App Router
│   ├── layout.tsx              ← Root layout (fonts, Navbar, Footer)
│   ├── globals.css             ← Tailwind base + all custom CSS
│   ├── page.tsx                ← Home page
│   ├── not-found.tsx           ← 404 page
│   │
│   ├── about/
│   │   ├── page.tsx            ← /about (metadata)
│   │   └── AboutClient.tsx     ← Full About page (team, values, story)
│   │
│   ├── services/
│   │   ├── page.tsx            ← /services (metadata)
│   │   └── ServicesClient.tsx  ← Full Services page (5 services detailed)
│   │
│   ├── work/
│   │   ├── page.tsx            ← /work (metadata)
│   │   ├── WorkClient.tsx      ← Portfolio grid + category filter
│   │   └── [slug]/
│   │       ├── page.tsx        ← /work/[slug] (generateStaticParams)
│   │       └── WorkDetailClient.tsx ← Case study detail page
│   │
│   ├── process/
│   │   ├── page.tsx            ← /process (metadata)
│   │   └── ProcessClient.tsx   ← 6-phase process + FAQ accordion
│   │
│   ├── contact/
│   │   ├── page.tsx            ← /contact (metadata)
│   │   └── ContactClient.tsx   ← Contact form (validation + success state)
│   │
│   ├── privacy/page.tsx        ← Privacy Policy
│   └── terms/page.tsx          ← Terms of Use
│
├── components/
│   ├── Cursor.tsx              ← GSAP magnetic custom cursor
│   ├── Navbar.tsx              ← Fixed nav, scroll blur, mobile menu
│   ├── Footer.tsx              ← 4-col footer, social links
│   ├── useScrollReveal.ts      ← Reusable GSAP ScrollTrigger hook
│   │
│   └── home/                  ← Home page sections
│       ├── HeroSection.tsx     ← Full-screen hero, line reveal, counters
│       ├── MarqueeSection.tsx  ← Infinite scroll strip
│       ├── AboutPreview.tsx    ← About teaser + cards
│       ├── ServicesPreview.tsx ← Services list with hover
│       ├── WorkPreview.tsx     ← Portfolio grid preview
│       ├── ProcessPreview.tsx  ← 4-step process cards
│       ├── TestimonialsSection.tsx ← Client testimonials
│       └── CtaSection.tsx      ← Full-width CTA
│
├── public/                    ← Static assets (add your images here)
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── tsconfig.json
```

---

## 🗺️ All Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, services, work, process, testimonials, CTA |
| `/about` | About — story, team, values, stats |
| `/services` | Services — 5 detailed services with deliverables |
| `/work` | Portfolio — 8 projects, category filter |
| `/work/novatech-rebrand` | Case study detail |
| `/work/redline-agency` | Case study detail |
| `/work/greenleaf-store` | Case study detail |
| `/work/harvest-dashboard` | Case study detail |
| `/work/aurelia-app` | Case study detail |
| `/work/pulse-fintech` | Case study detail |
| `/work/kova-branding` | Case study detail |
| `/work/zenith-saas` | Case study detail |
| `/process` | Process — 6-phase timeline, FAQ accordion |
| `/contact` | Contact — form with validation, success state |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `*` | Custom 404 page |

---

## ✨ GSAP Animations

| Feature | Where | Animation |
|---------|-------|-----------|
| Custom cursor | Global | Smooth magnetic follow, scale on hover |
| Navbar | Global | Slide down on load |
| Hero headline | Home, all pages | Line-by-line slide-up reveal |
| Hero stats | Home | Count-up number animation |
| Services list | Home + Services | Stagger slide from left |
| Work grid | Home + Work | Scale + fade on scroll |
| Process cards | Home + Process | Stagger fade up |
| FAQ accordion | Process | GSAP height tween |
| Work filter | Work | Opacity/scale filter animation |
| All sections | Every page | ScrollTrigger reveal via `useScrollReveal` hook |
| CTA section | Home | Timeline entrance animation |

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#080808` | Page background |
| `bg-2` | `#0f0f0f` | Section backgrounds |
| `bg-3` | `#141414` | Card backgrounds |
| `accent` | `#c8f060` | Lime green — CTAs, highlights |
| `accent-2` | `#ff5c3a` | Orange-red — error states |
| `muted` | `#6b6763` | Secondary text |
| `cream` | `#f0ede8` | Primary text |
| Font Display | Syne 800 | All headings, logo, CTAs |
| Font Body | DM Sans 300–500 | Body text, labels |

---

## 📧 Setting Up the Contact Form

The contact form currently simulates a submission. To make it live, replace the `await new Promise(r => setTimeout(r, 1800))` in `ContactClient.tsx` with a real API call:

**Option 1 — Resend (recommended):**
```bash
npm install resend
```
Create `app/api/contact/route.ts` and POST to `/api/contact`.

**Option 2 — Formspree:**
```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

**Option 3 — EmailJS (client-side):**
```bash
npm install @emailjs/browser
```

---

## 🖼️ Adding Real Images

Project cards currently use CSS gradient placeholders. To use real images:

1. Add images to `/public/work/`
2. In `WorkPreview.tsx` and `WorkClient.tsx`, replace the gradient div with:
```tsx
import Image from 'next/image'
<Image src="/work/project-name.jpg" alt="Project Name" fill className="object-cover" />
```

---

## 📦 Dependencies

```json
{
  "next": "14.2.5",
  "react": "^18",
  "gsap": "^3.12.5",
  "@gsap/react": "^2.1.1",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

---

## 🛠️ Customization Checklist

- [ ] Update company name, tagline in `HeroSection.tsx`
- [ ] Update contact details (email, phone, city) in `Footer.tsx` + `ContactClient.tsx`
- [ ] Replace team members in `AboutClient.tsx`
- [ ] Update project data in `work/[slug]/page.tsx`
- [ ] Add real project images to `/public/work/`
- [ ] Connect contact form to real email service
- [ ] Update social links in `Footer.tsx`
- [ ] Set up Google Analytics in `layout.tsx`
- [ ] Deploy to Vercel: `npx vercel`
