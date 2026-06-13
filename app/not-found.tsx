import Link from 'next/link'
export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{background:'radial-gradient(ellipse 50% 50% at 50% 50%,rgba(200,240,96,0.05) 0%,transparent 70%)'}}>
      <p className="font-display font-extrabold text-accent/20 leading-none tracking-tighter mb-6 select-none" style={{fontSize:'clamp(100px,20vw,240px)'}}>404</p>
      <h1 className="font-display font-extrabold text-white leading-[1] tracking-tighter mb-4" style={{fontSize:'clamp(28px,4vw,56px)'}}>Page not found.</h1>
      <p className="text-muted text-base mb-10 max-w-sm leading-[1.7]">The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/" className="btn-primary">Go Home →</Link>
        <Link href="/work" className="btn-outline">View Work</Link>
      </div>
    </section>
  )
}
