const steps = [
  {
    step: '01',
    title: 'Share Your Details',
    description: 'Fill out a short form with your contact, car, and loan requirements.',
  },
  {
    step: '02',
    title: 'Get Matched',
    description: 'Our team reviews your profile and matches you with the best lending options.',
  },
  {
    step: '03',
    title: 'Quick Verification',
    description: 'Submit minimal documents for a fast, hassle-free verification process.',
  },
  {
    step: '04',
    title: 'Receive Funds',
    description: 'Once approved, funds are disbursed directly — often within 24-48 hours.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">How It Works</h2>
          <p className="mt-4 text-gray-600">Four simple steps to drive your finance forward.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="relative pl-2">
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-brand-gradient mb-3">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
