import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import OurExpertise from '@/components/OurExpertise'
import Technologies from '@/components/Technologies'
import HowWeWork from '@/components/HowWeWork'
import PastProjects from '@/components/PastProjects'
import IndustriesWeServe from '@/components/IndustriesWeServe'
import ContactUs from '@/components/ContactUs'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutUs />
      <OurExpertise />
      <Technologies />
      <HowWeWork />
      <PastProjects />
      <IndustriesWeServe />
      <ContactUs />
    </div>
  )
}

