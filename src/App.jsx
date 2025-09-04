import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-light-cream to-cream relative">
      {/* Scrapbook texture overlay */}
      <div className="scrapbook-texture"></div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  )
}

export default App