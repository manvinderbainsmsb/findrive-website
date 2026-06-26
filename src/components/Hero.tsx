import LeadForm from './LeadForm'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 pb-16 lg:pb-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      {/* Translucent overlay so the background photo stays visible but content remains legible */}
      <div className="absolute inset-0 bg-white/85" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div id="apply" className="order-2 lg:order-1 rounded-2xl bg-white/95 backdrop-blur p-6 sm:p-10 shadow-md border border-gray-100">
          <LeadForm />
        </div>

        <div className="order-1 lg:order-2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
            Get the right finance.
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Drop your details and our loan expert will call you back.
          </p>
        </div>
      </div>
    </section>
  )
}
