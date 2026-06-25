import EmiCalculator from './EmiCalculator'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      {/* Translucent brand-gradient overlay on top of the background photo */}
      <div className="absolute inset-0 bg-brand-dark/70" />
      <div className="absolute inset-0 bg-brand-gradient opacity-40 mix-blend-multiply" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Car financing,{' '}
            <span className="text-transparent bg-clip-text bg-brand-gradient">made simple.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-200 max-w-xl">
            Fast approvals. Transparent terms. No hidden charges. Whether you're buying a
            pre-owned car or unlocking funds against the one you own, FinDrive gets you there.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {[
              'Approval in as little as 24 hours',
              'No hidden charges, ever',
              '50+ trusted lending partners',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-white font-medium text-sm sm:text-base">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#apply"
              className="inline-flex items-center rounded-full bg-brand-gradient px-8 py-4 text-base font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Check your eligibility
            </a>
          </div>
        </div>

        <EmiCalculator />
      </div>
    </section>
  )
}
