import { useState } from 'react'

const faqs = [
  {
    question: 'What is the maximum loan amount I can get?',
    answer:
      'Loan amounts depend on the product — used and new car finance can go up to 90-100% of the car value, loan against car is based on your car\'s current market value, and personal loans go up to ₹25 lakh, subject to your eligibility.',
  },
  {
    question: 'How long does approval and disbursal take?',
    answer:
      'Most applications are approved within 24-48 hours of submitting your details and documents. Funds are typically disbursed shortly after approval.',
  },
  {
    question: 'What documents do I need to apply?',
    answer:
      'Generally you\'ll need ID proof, address proof, income proof (salary slips or ITR), and for car-related loans, the vehicle\'s RC and insurance documents. Our loan expert will confirm the exact list for your product.',
  },
  {
    question: 'Will a low credit score affect my application?',
    answer:
      'A higher credit score helps you get better rates, but we work with 50+ lending partners with varying eligibility criteria, so options may still be available even with a moderate score.',
  },
  {
    question: 'Are there any hidden charges?',
    answer:
      'No. All processing fees, interest rates, and foreclosure charges are disclosed upfront before you accept any offer — there are no hidden costs.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.question} className="rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-brand-dark">{faq.question}</span>
                  <span
                    className={`shrink-0 text-brand-blue transition-transform ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
