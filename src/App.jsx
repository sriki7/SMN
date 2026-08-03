import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'
import { IndustriesMarquee, Services, Spectrum, Verticals, DigitalEdge, Process, CtaBand } from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <Loader />
      <Nav />
      <Hero />
      <IndustriesMarquee />
      <Services />
      <Spectrum />
      <Verticals />
      <DigitalEdge />
      <Process />
      <CtaBand />
      <Footer />
    </>
  )
}
