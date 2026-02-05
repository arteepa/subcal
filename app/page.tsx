import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { InterestModal } from '@/components/landing/InterestModal'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <InterestModal />
      </main>
      <Footer />
    </>
  )
}
