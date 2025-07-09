import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Products from '@/components/Products'
import Innovation from '@/components/Innovation'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Products />
      <Innovation />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
