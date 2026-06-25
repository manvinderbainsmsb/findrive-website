import { useState } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#why-us', label: 'Why FinDrive' },
  { href: '#apply', label: 'Apply Now' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-32">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.png" alt="FinDrive logo" className="h-28 w-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-dark">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-brand-blue transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#apply"
          className="hidden md:inline-flex items-center rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-90 transition-opacity"
        >
          Get a Quote
        </a>

        <button
          className="md:hidden p-2 text-brand-dark"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3 text-sm font-semibold text-brand-dark">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="block py-1">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#apply"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex w-full justify-center rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  )
}
