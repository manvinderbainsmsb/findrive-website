const stats = [
  { value: '24 hrs', label: 'Fastest loan approval' },
  { value: '98.5%', label: 'Applications processed smoothly' },
  { value: '24x7', label: 'Customer support' },
]

export default function TrustStats() {
  return (
    <section className="bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center sm:justify-start">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-brand-gradient">
                {s.value}
              </span>
              <span className="text-sm text-gray-300">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
