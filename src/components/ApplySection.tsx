import LeadForm from './LeadForm'

export default function ApplySection() {
  return (
    <section id="apply" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Apply for Your Loan</h2>
          <p className="mt-4 text-gray-600">
            Fill in your details below and our team will get back to you with the best financing options.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 sm:p-10 shadow-lg border border-gray-100">
          <LeadForm />
        </div>
      </div>
    </section>
  )
}
