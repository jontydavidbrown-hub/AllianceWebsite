import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials"; // directly under Hero
import StatsTiles from "../components/StatsTiles";
import Features from "../components/Features";
import EVEstimator from "../components/EVEstimator";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Testimonials />   {/* moved here */}
        <StatsTiles />
        <Features />
        <EVEstimator />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
