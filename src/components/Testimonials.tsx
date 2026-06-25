import { useState } from 'react'

const testimonials = [
  {
    quote:
      'I recently took a loan against my car with FinDrive — the process was quick, transparent, and the funds were in my account within two days.',
    name: 'Rohit Sharma',
    detail: 'Loan Against Car, Bengaluru',
  },
  {
    quote:
      'Buying my first pre-owned car felt overwhelming until FinDrive sorted out the financing. Great rates, no surprises.',
    name: 'Anita Verma',
    detail: 'Used Car Finance, Pune',
  },
  {
    quote:
      'Customer support was available whenever I had questions, and the whole experience felt genuinely hassle-free.',
    name: 'Karthik Iyer',
    detail: 'Used Car Finance, Chennai',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  return (
    <section id="why-us" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-12">
          What our customers say
        </h2>

        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-sm border border-gray-100">
          <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
          <p className="text-lg sm:text-xl text-brand-dark font-medium leading-relaxed">
            "{t.quote}"
          </p>
          <p className="mt-6 font-bold text-brand-dark">{t.name}</p>
          <p className="text-sm text-gray-500">{t.detail}</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-brand-gradient' : 'w-2.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
