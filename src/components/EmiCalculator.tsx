import { useMemo, useState } from 'react'

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [tenureMonths, setTenureMonths] = useState(36)
  const [interestRate, setInterestRate] = useState(10.5)

  const emi = useMemo(() => {
    const principal = loanAmount
    const monthlyRate = interestRate / 12 / 100
    const n = tenureMonths

    if (monthlyRate === 0) return principal / n

    const factor = Math.pow(1 + monthlyRate, n)
    return (principal * monthlyRate * factor) / (factor - 1)
  }, [loanAmount, tenureMonths, interestRate])

  const totalPayment = emi * tenureMonths
  const totalInterest = totalPayment - loanAmount

  return (
    <div className="rounded-3xl bg-white/95 backdrop-blur p-6 sm:p-8 shadow-2xl">
      <h3 className="text-lg font-bold text-brand-dark mb-6">EMI Calculator</h3>

      <SliderField
        label="Loan Amount"
        value={loanAmount}
        min={50000}
        max={3000000}
        step={10000}
        prefix="₹"
        onChange={setLoanAmount}
      />

      <SliderField
        label="Tenure (months)"
        value={tenureMonths}
        min={6}
        max={84}
        step={1}
        suffix=" mo"
        onChange={setTenureMonths}
      />

      <SliderField
        label="Interest Rate (p.a.)"
        value={interestRate}
        min={6}
        max={24}
        step={0.1}
        suffix="%"
        onChange={setInterestRate}
      />

      <div className="mt-6 rounded-2xl bg-gray-50 p-5 space-y-3">
        <Row label="Monthly EMI" value={`₹${Math.round(emi).toLocaleString('en-IN')}`} highlight />
        <Row label="Total Interest" value={`₹${Math.round(totalInterest).toLocaleString('en-IN')}`} />
        <Row label="Total Payment" value={`₹${Math.round(totalPayment).toLocaleString('en-IN')}`} />
      </div>

      <a
        href="#apply"
        className="mt-6 block text-center rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity"
      >
        Apply for this loan
      </a>
    </div>
  )
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  onChange: (value: number) => void
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-brand-dark">{label}</label>
        <span className="text-sm font-bold text-transparent bg-clip-text bg-brand-gradient">
          {prefix}
          {value.toLocaleString('en-IN')}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-blue h-2 cursor-pointer"
      />
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={highlight ? 'text-xl font-extrabold text-brand-dark' : 'text-sm font-semibold text-brand-dark'}>
        {value}
      </span>
    </div>
  )
}
