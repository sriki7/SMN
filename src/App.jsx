import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Guide from './components/Guide.jsx'
import Footer from './components/Footer.jsx'
import { CursorGlow, ScrollProgress } from './components/Ambient.jsx'
import { IndustriesMarquee, Services, Spectrum, Verticals, DigitalEdge, Process, CtaBand } from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <Hero />
      <IndustriesMarquee />
      <Services />
      <Spectrum />
      <Verticals />
      <DigitalEdge />
      <Guide />
      <Process />
      <CtaBand />
      <Footer />
    </>
  )
}
