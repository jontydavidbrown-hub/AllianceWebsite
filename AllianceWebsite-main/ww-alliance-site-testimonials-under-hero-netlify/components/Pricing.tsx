'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "./anim";
import { Check, ShieldCheck, Headphones, Clock } from "lucide-react";
import { useState } from "react";

type Tier = {
  label: string;
  price: string;
  cadence: string;
  perks: string[];
  cta: { label: string; href: string };
  badge: string;
  featured?: boolean;
  note?: string;
};

const tiers: Tier[] = [
  {
    label: "GOLD",
    price: "$29.99",
    cadence: "Per Week",
    perks: ["AI Money Making","Exclusive Money Making Methods","Mentoring with Real World Millionaires","Access to Global Community","Members Lounge","Complete Online Course Access","24/7 Live Support"],
    cta: { label: "Join Free", href: "https://whop.com" },
    badge: "VALUE ENTRY",
  },
  {
    label: "DIAMOND",
    price: "$99.99",
    cadence: "Per Month",
    perks: ["Everything in GOLD","Priority Support & Mentoring","Early Access to New AI Methods","Private Strategies & Signals"],
    cta: { label: "Join Free", href: "https://whop.com" },
    badge: "MOST POPULAR",
    featured: true,
    note: "Best for most members"
  },
  {
    label: "PLATINUM",
    price: "$899.99",
    cadence: "Per Year",
    perks: ["Everything in DIAMOND","Annual Savings vs Monthly","VIP Community Access","Exclusive Workshops & AMAs"],
    cta: { label: "Join Free", href: "https://whop.com" },
    badge: "FLAGSHIP TIER",
  },
  {
    label: "LIFETIME ACCESS",
    price: "One Time $2000",
    cadence: "",
    perks: ["Lifetime Access to everything on the platform"],
    cta: { label: "Get Access", href: "https://whop.com" },
    badge: "MOST EXCLUSIVE"
  }
];

const bundles = [
  {
    label: "THE ELITE SYNDICATE BUNDLE",
    price: "One Time $3000",
    desc: "Elite Syndicate lifetime membership + W&W Global Alliance lifetime platform access.",
    cta: { label: "Get Access", href: "https://whop.com" }
  },
  {
    label: "WEALTH PILOT BUNDLE",
    price: "One Time $4000",
    desc: "Wealth Pilot AI lifetime + W&W Global Alliance lifetime platform access.",
    cta: { label: "Get Access", href: "https://whop.com" }
  },
  {
    label: "ULTIMATE BUNDLE",
    price: "One Time $5000",
    desc: "Lifetime W&W platform + Elite Syndicate + Wealth Pilot AI lifetime access.",
    cta: { label: "Get Access", href: "https://whop.com" }
  }
];

export default function Pricing(){
  const [open, setOpen] = useState(false);

  const Featured = tiers.find(t => t.featured);
  const Others = tiers.filter(t => !t.featured);

  return (
    <section id="pricing" className="py-16 lg:py-24 border-t border-[var(--border)]">
      <div className="container-safe">
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="text-3xl font-bold">
          Pricing Plans
        </motion.h2>
        <motion.p initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="mt-2 text-[color:var(--muted)]">
          Choose the plan that fits your goals. Instant access. 24/7 community.
        </motion.p>

        {/* Featured card in the middle */}
        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {/* Left column (others split) */}
          <div className="space-y-6">
            {Others.slice(0, 1).map((t) => <Card key={t.label} t={t} />)}
          </div>

          {/* Featured column */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}
            className="relative"
          >
            {Featured && <Card t={Featured} featured />}
          </motion.div>

          {/* Right column (others remainder) */}
          <div className="space-y-6">
            {Others.slice(1).map((t) => <Card key={t.label} t={t} />)}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-10 trust-badges">
          <div className="trust-badge">
            <span className="icon"><ShieldCheck size={16} /></span>
            Secure checkout
          </div>
          <div className="trust-badge">
            <span className="icon"><Headphones size={16} /></span>
            24/7 live support
          </div>
          <div className="trust-badge">
            <span className="icon"><Clock size={16} /></span>
            Instant access
          </div>
        </div>

        {/* Bundles */}
        <motion.h3 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="mt-16 text-2xl font-bold">
          Bundles
        </motion.h3>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid lg:grid-cols-3 gap-6"
        >
          {bundles.map((b)=> (
            <motion.div
              key={b.label}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="rounded-2xl ring-1 ring-[var(--border)] bg-[color:var(--surface)] p-6 flex flex-col hover-card grad-border"
            >
              <div className="text-xs uppercase tracking-widest text-[color:var(--brand)]">Most Exclusive</div>
              <h4 className="mt-2 text-lg font-semibold">{b.label}</h4>
              <div className="mt-3 text-2xl font-bold">{b.price}</div>
              <p className="mt-3 text-sm text-[color:var(--muted)]">{b.desc}</p>
              <div className="mt-6">
                <Link href={b.cta.href} className="btn btn-boost w-full text-center">{b.cta.label}</Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Compare plans */}
        <div className="mt-10 flex items-center gap-3">
          <button className="btn-outline" onClick={()=>setOpen(true)}>Compare plans</button>
        </div>

        {open && <CompareModal onClose={()=>setOpen(false)} />}
      </div>
    </section>
  )
}

function Card({ t, featured }: { t: Tier; featured?: boolean }) {
  return (
    <div className={`relative rounded-2xl ring-1 ring-[var(--border)] bg-[color:var(--surface)] p-6 flex flex-col hover-card ${featured ? "grad-border anim-float shadow-soft" : ""}`}>
      {featured && <div className="ribbon">{t.badge || "FEATURED"}</div>}
      {!featured && <div className="text-xs uppercase tracking-widest text-[color:var(--brand)]">{t.badge}</div>}
      <h3 className={`mt-2 text-xl font-semibold ${featured ? "text-[color:var(--brand)]" : ""}`}>{t.label}</h3>
      <div className="mt-3 text-3xl font-bold">{t.price}</div>
      {t.cadence && <div className="mt-1 text-sm text-[color:var(--muted)]">{t.cadence}</div>}
      {t.note && <div className="mt-1 text-xs text-[color:var(--muted)]">{t.note}</div>}

      <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
        {t.perks.map(p => (
          <li key={p} className="flex items-start gap-2">
            <Check size={16} className="mt-[2px] text-[color:var(--brand)]" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href={t.cta.href} className={`btn btn-boost w-full text-center ${featured ? "" : ""}`}>{t.cta.label}</Link>
      </div>
    </div>
  );
}

function CompareModal({ onClose }: { onClose: () => void }){
  const cols = ["GOLD", "DIAMOND", "PLATINUM", "LIFETIME"];
  const rows = [
    { k: "AI Money Making", v: [true, true, true, true] },
    { k: "Exclusive Methods", v: [true, true, true, true] },
    { k: "Mentoring", v: [true, true, true, true] },
    { k: "Priority Support", v: [false, true, true, true] },
    { k: "Early Access Methods", v: [false, true, true, true] },
    { k: "Annual Savings", v: [false, false, true, false] },
    { k: "Lifetime Access", v: [false, false, false, true] },
  ];

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute left-1/2 top-1/2 w-[min(960px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[color:var(--surface)] ring-1 ring-[var(--border)] p-6"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">Compare Plans</h4>
          <button className="btn-outline" onClick={onClose}>Close</button>
        </div>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[color:var(--muted)]">
                <th className="py-3 pr-4">Feature</th>
                {cols.map(c => <th key={c} className="py-3 px-4">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.k} className="border-t border-[var(--border)]">
                  <td className="py-3 pr-4">{r.k}</td>
                  {r.v.map((val, i) => (
                    <td key={i} className="py-3 px-4">{val ? <span className="text-[color:var(--brand)]">Yes</span> : <span className="text-[color:var(--muted)]">—</span>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
