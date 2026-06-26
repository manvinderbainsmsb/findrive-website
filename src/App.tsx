import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatsAppCta from './components/WhatsAppCta'
import TrustStats from './components/TrustStats'
import Services from './components/Services'
import EmiSection from './components/EmiSection'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <WhatsAppCta />
        <TrustStats />
        <Services />
        <EmiSection />
        <HowItWorks />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
