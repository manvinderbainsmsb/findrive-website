const features = [
  {
    title: 'Used Car Finance',
    subtitle: 'Buy the car you want, on terms that work for you.',
    points: [
      'Finance up to 90% of the car value',
      'Flexible tenure from 12 to 60 months',
      'Competitive interest rates from trusted lenders',
    ],
    cta: 'Explore used car finance',
    image: '/used-car-finance.jpg',
    fallbackIcon: '🚗',
  },
  {
    title: 'Loan Against Car',
    subtitle: 'Unlock the value of your car without giving it up.',
    points: [
      'Quick, secured loan against your existing car',
      'Keep driving while you access funds',
      'Funds disbursed in as little as 24-48 hours',
    ],
    cta: 'Explore loan against car',
    image: '/loan-against-car.jpg',
    fallbackIcon: '💳',
    reverse: true,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {features.map((f) => (
          <div
            key={f.title}
            className={`grid lg:grid-cols-2 gap-10 items-center ${
              f.reverse ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="rounded-3xl bg-gray-50 overflow-hidden flex items-center justify-center min-h-[260px]">
              <img
                src={f.image}
                alt={f.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget
                  img.style.display = 'none'
                  img.parentElement!.innerHTML += `<span class="text-6xl">${f.fallbackIcon}</span>`
                }}
              />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-brand-dark">{f.title}</h3>
              <p className="mt-3 text-lg text-gray-600">{f.subtitle}</p>
              <ul className="mt-6 space-y-3">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-brand-dark">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white text-[10px]">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base">{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#apply"
                className="mt-7 inline-flex items-center rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity"
              >
                {f.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
