import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStats from './components/TrustStats'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import ApplySection from './components/ApplySection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <Services />
        <HowItWorks />
        <Testimonials />
        <ApplySection />
      </main>
      <Footer />
    </div>
  )
}
