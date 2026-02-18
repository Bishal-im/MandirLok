import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedTemples from '@/components/home/FeaturedTemples'
import HowItWorks from '@/components/home/HowItWorks'
import FeaturedPoojas from '@/components/home/FeaturedPoojas'
import ChadhavaSection from '@/components/home/ChadhavaSection'
import WhatsAppCTA from '@/components/home/WhatsAppCTA'
import Testimonials from '@/components/home/Testimonials'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedTemples />
        <HowItWorks />
        <FeaturedPoojas />
        <ChadhavaSection />
        <WhatsAppCTA />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
