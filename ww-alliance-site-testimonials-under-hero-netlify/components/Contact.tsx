'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "./anim";

export default function Contact(){
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-16 lg:py-24 border-t border-[var(--border)]">
      <div className="container-safe">
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="text-3xl font-bold">Contact Us</motion.h2>
        <motion.form
          className="mt-8 grid sm:grid-cols-2 gap-4 max-w-3xl"
          onSubmit={(e)=>{ e.preventDefault(); setSent(true); }}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.input variants={fadeUp} required placeholder="First name" className="rounded-lg bg-transparent border border-[var(--border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]" />
          <motion.input variants={fadeUp} required placeholder="Last name" className="rounded-lg bg-transparent border border-[var(--border)] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]" />
          <motion.input variants={fadeUp} required type="email" placeholder="Email*" className="rounded-lg bg-transparent border border-[var(--border)] px-4 py-3 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]" />
          <motion.textarea variants={fadeUp} required placeholder="Message*" rows={5} className="rounded-lg bg-transparent border border-[var(--border)] px-4 py-3 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"></motion.textarea>
          <motion.button variants={fadeUp} className="btn sm:col-span-2" type="submit">Submit</motion.button>
        </motion.form>
        {sent && <p className="mt-4 text-[color:var(--brand)]">Thanks! We’ll be in touch.</p>}
      </div>
    </section>
  )
}
