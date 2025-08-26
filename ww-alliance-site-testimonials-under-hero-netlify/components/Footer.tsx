import Link from "next/link";

export default function Footer(){
  return (
    <footer className="py-10 border-t border-[var(--border)]">
      <div className="container-safe flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[color:var(--muted)]">© {new Date().getFullYear()} The W&W Global Alliance</p>
        <div className="flex items-center gap-4 text-sm">
          <Link href="#pricing" className="hover:text-[color:var(--brand)]">Pricing</Link>
          <Link href="#features" className="hover:text-[color:var(--brand)]">AI Methods</Link>
          <Link href="#contact" className="hover:text-[color:var(--brand)]">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
