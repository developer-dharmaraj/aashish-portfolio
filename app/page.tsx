import HeroSection      from '@/components/home/HeroSection'
import MarqueeSection   from '@/components/home/MarqueeSection'
import AboutPreview     from '@/components/home/AboutPreview'
import ServicesPreview  from '@/components/home/ServicesPreview'
import ShowreelSection  from '@/components/home/ShowreelSection'
import WorkPreview      from '@/components/home/WorkPreview'
import ProcessPreview   from '@/components/home/ProcessPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaSection       from '@/components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutPreview />
      <ServicesPreview />
      <ShowreelSection />
      <WorkPreview />
      <ProcessPreview />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
