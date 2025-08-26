'use client';
import { motion } from "framer-motion";
import { fadeUp, stagger } from "./anim";
import { Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="blob -top-16 -left-24 w-80 h-80" />
      <div className="blob -bottom-20 -right-24 w-96 h-96" />

      <div className="container-safe grid gap-10 py-16 lg:py-24 place-items-center text-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-1 text-[color:var(--brand)] mb-3" aria-label="Rated 5 out of 5 stars">
            {Array.from({length:5}).map((_,i)=>(<Star key={i} size={18} className="drop-shadow" fill="currentColor" />))}
          </motion.div>
          <motion.p variants={fadeUp} className="uppercase text-sm tracking-widest text-[color:var(--brand)]">
            Start a free trial today
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
            The World's ONLY AI Money‑Making Platform
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-[color:var(--muted)]">
            AI Sports Betting • AI Race Betting • AI Crypto Trading • AI Gold Trading • AI Forex Trading
          </motion.p>
          <motion.p variants={fadeUp} className="mt-2 text-[color:var(--muted)]">
            Print money on your phone with our global community of winners.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex gap-3">
            <a href="https://whop.com" className="btn">Sign Up</a>
            <a href="#pricing" className="btn-outline">View Pricing</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
