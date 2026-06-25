const columns = [
  {
    title: 'Products',
    links: ['Used Car Finance', 'Loan Against Car', 'EMI Calculator', 'Eligibility Check'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Contact Us', 'Lending Partners'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'FAQs', 'How It Works', 'Customer Stories'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Grievance Redressal'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src="/logo.png" alt="FinDrive" className="h-9 w-auto opacity-90" />
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} FinDrive. Driving Your Finance Forward. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
