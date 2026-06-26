import { useState } from 'react'

const productLinks = [
  { href: '#new-car-finance', label: 'New Car Loans' },
  { href: '#used-car-finance', label: 'Used Car Loans' },
  { href: '#loan-against-car', label: 'Loans Against Car' },
  { href: '#personal-loan', label: 'Personal Loans' },
]

const links = [
  { href: '#home', label: 'Home' },
  { href: '#emi-calculator', label: 'EMI Calculator' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.png" alt="FinDrive logo" className="h-28 w-auto -my-4" />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-dark">
          <li
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-brand-blue transition-colors">
              Loan Products
              <span className={`text-xs transition-transform ${productsOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {productsOpen && (
              <div className="absolute left-0 top-full pt-2 w-56">
                <div className="rounded-xl bg-white shadow-lg border border-gray-100 py-2">
                  {productLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm font-medium text-brand-dark hover:bg-gray-50 hover:text-brand-blue transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>
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
          <ul className="flex flex-col gap-1 pt-3 text-sm font-semibold text-brand-dark">
            <li>
              <button
                className="flex w-full items-center justify-between py-2"
                onClick={() => setMobileProductsOpen((o) => !o)}
              >
                Loan Products
                <span className={`text-xs transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {mobileProductsOpen && (
                <ul className="pl-3 flex flex-col gap-1 pb-1">
                  {productLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-sm font-medium text-gray-600"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="block py-2">
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
