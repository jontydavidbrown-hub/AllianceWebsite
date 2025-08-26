"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { href: "#pricing", label: "Pricing" },
  { href: "#features", label: "AI Methods" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--border)] transition-all ${
        scrolled
          ? "bg-[color:var(--bg)]/90 backdrop-blur shadow-soft"
          : "bg-[color:var(--bg)]/70 backdrop-blur-sm"
      }`}
    >
      <div className="container-safe flex h-16 items-center justify-between">
        {/* Crest logo only (no 'W&W Global Alliance' text) */}
        <a href="/" aria-label="Home" className="flex items-center gap-2">
          <img
            src="/media/crest.png"
            alt="Global Alliance crest"
            className="h-10 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[color:var(--brand)] hover:after:w-full after:transition-all"
            >
              {n.label}
            </a>
          ))}
          <Link href="https://whop.com" className="btn-outline">
            Sign Up
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)]">
          <div className="container-safe py-2 flex flex-col gap-2">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
            <Link href="https://whop.com" className="btn-outline">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
