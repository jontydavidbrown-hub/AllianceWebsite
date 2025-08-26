'use client';
import * as React from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "./anim";

function clamp(n:number, min:number, max:number){ return Math.max(min, Math.min(max, n)); }

export default function EVEstimator(){
  const [bankroll, setBankroll] = React.useState<number>(1000);
  const [betsPerDay, setBetsPerDay] = React.useState<number>(25);

  // Fixed assumptions per request
  const stakePct = 1.0; // % of bankroll per bet
  const edgePct = 3.0;  // expected ROI per bet (%)

  const stake = bankroll * (stakePct/100);
  const evPerBet = stake * (edgePct/100);
  const dailyEV = evPerBet * betsPerDay;
  const monthlyEV = dailyEV * 30;
  const yearlyEV = dailyEV * 365;

  return (
    <section id="ev-estimator" className="py-16 lg:py-24 border-t border-[var(--border)]">
      <div className="container-safe">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger} className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold">Estimated EV Earnings</motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-[color:var(--muted)]">
              Enter your bankroll and how many <strong>+EV</strong> bets you plan to place each day. Estimates use simple expected value math (not guarantees).
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 grid gap-5">
              {/* Bankroll */}
              <div className="rounded-2xl ring-1 ring-[var(--border)] bg-[color:var(--surface)] p-5 grad-border">
                <label className="text-sm text-[color:var(--muted)]">Bankroll</label>
                <div className="mt-2 flex items-center gap-3">
                  <span className="px-3 py-2 rounded-lg border border-[var(--border)]">$</span>
                  <input
                    type="number"
                    min={50}
                    step={50}
                    value={bankroll}
                    onChange={(e)=> setBankroll(clamp(parseFloat(e.target.value||'0'), 50, 1000000))}
                    className="flex-1 rounded-lg bg-transparent border border-[var(--border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                  />
                </div>
              </div>

              {/* Bets per day */}
              <div className="rounded-2xl ring-1 ring-[var(--border)] bg-[color:var(--surface)] p-5 grad-border">
                <label className="text-sm text-[color:var(--muted)]">Bets per day: <strong>{betsPerDay}</strong></label>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={betsPerDay}
                  onChange={(e)=> setBetsPerDay(parseInt(e.target.value))}
                  className="mt-3 w-full"
                />
                <div className="mt-1 text-xs text-[color:var(--muted)]">Drag to set your daily volume.</div>
              </div>
            </motion.div>
          </div>

          {/* Results tile */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl ring-1 ring-[var(--border)] bg-[color:var(--surface)] p-6 grad-border hover-card"
          >
            <h3 className="text-xl font-semibold">Your Estimated Profits</h3>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl border border-[var(--border)] p-4">
                <div className="text-sm text-[color:var(--muted)]">Daily</div>
                <div className="mt-1 text-2xl font-bold">${dailyEV.toFixed(2)}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] p-4">
                <div className="text-sm text-[color:var(--muted)]">30 Days</div>
                <div className="mt-1 text-2xl font-bold">${monthlyEV.toFixed(2)}</div>
              </div>
              <div className="rounded-xl border border-[var(--border)] p-4">
                <div className="text-sm text-[color:var(--muted)]">365 Days</div>
                <div className="mt-1 text-2xl font-bold">${yearlyEV.toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-[color:var(--bg)]/40 p-4 text-sm leading-relaxed">
              <p><strong>How this works:</strong> Expected Profit = Bankroll × (Stake% per bet) × (+EV%) × (Bets/Day).</p>
              <p className="mt-2 text-[color:var(--muted)]">This model assumes a 1% stake per bet and a 3% average +EV. Real‑world results vary with limits, execution speed, and discipline.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
