"use client";
import { motion } from "framer-motion";
import { fadeUp } from "./anim";
import { Star } from "lucide-react";

type Review = { q: string; a: string };

const base: Review[] = [
  { q: "This is incredible.", a: "P. Lee" },
  { q: "Made profits already and it's only been a day.", a: "A. Harley" },
  { q: "Best thing I’ve done all year. Changed my mindset completely.", a: "David C" },
  { q: "Only started on Wednesday and I've pulled out $500 profit.", a: "V. Loq" },
  { q: "The EV tools are legit. Slowly compounding every day.", a: "Sam R" },
  { q: "Support is actually 24/7. Got help at 2am.", a: "Jess K" },
  { q: "Signals + discipline = profits. Super happy so far.", a: "O. Martinez" },
  { q: "First week and I covered my subscription 3x.", a: "Nat P" },
  { q: "The community keeps me on track. Great vibes.", a: "C. Stone" },
  { q: "UI is clean and the methods are straightforward.", a: "Leo M" },
  { q: "Arb opportunities pop constantly. Loving it.", a: "I. Faris" },
  { q: "Didn’t expect results this quickly. Impressed.", a: "B. Smith" },
  { q: "Courses are concise. Learned a lot fast.", a: "M. T" },
  { q: "Finally a disciplined system that clicks for me.", a: "R. Patel" },
];

// Duplicate for seamless marquee
const REVIEWS = [...base, ...base];

function StarsRow() {
  return (
    <div className="flex items-center gap-1 text-[color:var(--brand)]" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className="drop-shadow" fill="currentColor" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 lg:py-24 border-t border-[var(--border)] overflow-hidden">
      <div className="container-safe">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="text-3xl font-bold text-center"
        >
          What Members Say
        </motion.h2>

        {/* Marquee Row 1 */}
        <div className="mt-8 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--bg)] to-transparent" />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
            className="flex gap-6 w-[200%]"
          >
            {REVIEWS.map((r, idx) => (
              <figure
                key={`r1-${idx}`}
                className="w-[260px] md:w-[320px] shrink-0 rounded-2xl p-6 ring-1 ring-[var(--border)] bg-[color:var(--surface)] hover-card"
              >
                <StarsRow />
                <blockquote className="text-sm leading-relaxed mt-3">“{r.q}”</blockquote>
                <figcaption className="mt-4 text-xs text-[color:var(--muted)]">— {r.a}</figcaption>
              </figure>
            ))}
          </motion.div>
        </div>

        {/* Marquee Row 2 (reverse) */}
        <div className="mt-6 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--bg)] to-transparent" />
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
            className="flex gap-6 w-[200%]"
          >
            {REVIEWS.map((r, idx) => (
              <figure
                key={`r2-${idx}`}
                className="w-[260px] md:w-[320px] shrink-0 rounded-2xl p-6 ring-1 ring-[var(--border)] bg-[color:var(--surface)] hover-card"
              >
                <StarsRow />
                <blockquote className="text-sm leading-relaxed mt-3">“{r.q}”</blockquote>
                <figcaption className="mt-4 text-xs text-[color:var(--muted)]">— {r.a}</figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
