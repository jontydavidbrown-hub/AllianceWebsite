'use client';
import { motion } from "framer-motion";
import { fadeUp, stagger } from "./anim";

const items = [
  {
    title: "AI Positive EV Betting",
    desc: "Over 15,000 EV+ bets per day. Use the power of math to guarantee long-term profits with no guesswork.",
    img: "https://www.jointhealliance.com.au/_files/ugd/ff0b6d_675f41b51b254bb7b66dcdd41f785c23~mv2.png"
  },
  {
    title: "AI Sure / Arbitrage Betting",
    desc: "100% guaranteed wins. Our arbitrage software detects bets with a 100% win rate and delivers them up to 500+ times per day.",
    img: "https://www.jointhealliance.com.au/_files/ugd/ff0b6d_2f15b7837983412a9e77710e293272c6~mv2.png"
  },
  {
    title: "AI Greyhound & Horse Betting",
    desc: "Place more accurate, winning bets using real-time data and advanced statistical models.",
    img: "https://www.jointhealliance.com.au/_files/ugd/ff0b6d_39f0ab61fccb46e6a85d72f0f8e0f5e7~mv2.png"
  },
  {
    title: "AI Crypto Trading",
    desc: "Trade at a professional level instantly. Use AI crypto slips with an 82% win rate.",
    img: "https://www.jointhealliance.com.au/_files/ugd/ff0b6d_5002a5c33b7341b0a8227b83aeb6eca4~mv2.png"
  }
];

export default function Features(){
  return (
    <section id="features" className="py-16 lg:py-24 border-t border-[var(--border)]">
      <div className="container-safe">
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="text-3xl font-bold">
          Make Money With AI
        </motion.h2>
        <motion.p initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="mt-2 text-[color:var(--muted)]">
          Our state-of-the-art AI technology powers multiple profit methods.
        </motion.p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((it)=> (
            <motion.div key={it.title} variants={fadeUp} className="rounded-2xl ring-1 ring-[var(--border)] overflow-hidden bg-[color:var(--surface)] hover-card">
              <div className="relative h-40 bg-[color:var(--bg)]/40">
                <img
                  src={it.img}
                  alt={it.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }}
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{it.title}</h3>
                <p className="text-sm mt-2 text-[color:var(--muted)]">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
