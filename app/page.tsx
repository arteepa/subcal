import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Pricing } from '@/components/landing/Pricing'
import { InterestModal } from '@/components/landing/InterestModal'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <div className="stack-container">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
      <InterestModal />
    </div>
  )
}
