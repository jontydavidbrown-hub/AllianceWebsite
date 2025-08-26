import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StatsTiles from "@/components/StatsTiles";
import EVEstimator from "@/components/EVEstimator";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page(){
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Testimonials />
        <StatsTiles />
        <Features />
        <EVEstimator />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
