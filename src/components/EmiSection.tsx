import EmiCalculator from './EmiCalculator'

export default function EmiSection() {
  return (
    <section id="emi-calculator" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Calculate Your EMI</h2>
          <p className="mt-4 text-gray-600 max-w-md">
            Use the calculator to estimate your monthly installment before you apply. Adjust the
            loan amount, tenure, and interest rate to see what fits your budget.
          </p>
        </div>
        <EmiCalculator />
      </div>
    </section>
  )
}
