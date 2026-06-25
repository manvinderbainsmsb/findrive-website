import { useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  initialLeadFormData,
  validateLeadForm,
  type LeadFormData,
  type LeadFormErrors,
} from '../types/lead'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(initialLeadFormData)
  const [errors, setErrors] = useState<LeadFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(field: keyof LeadFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validationErrors = validateLeadForm(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const { error } = await supabase.from('leads').insert([
      {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        loan_type: formData.loan_type,
        location: formData.location.trim(),
        age: Number(formData.age),
        employment_type: formData.employment_type,
      },
    ])

    if (error) {
      setStatus('error')
      setErrorMessage(error.message || 'Something went wrong. Please try again.')
      return
    }

    setStatus('success')
    setFormData(initialLeadFormData)
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-green-800">Thank you, your application has been received!</h3>
        <p className="mt-2 text-green-700">
          A FinDrive representative will reach out to you shortly to discuss your financing options.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 inline-flex items-center rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5" noValidate>
      <Field label="Full Name" error={errors.name}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={inputClass(!!errors.name)}
          placeholder="John Doe"
        />
      </Field>

      <Field label="Phone Number" error={errors.phone}>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={inputClass(!!errors.phone)}
          placeholder="9876543210"
        />
      </Field>

      <Field label="Email Address" error={errors.email}>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={inputClass(!!errors.email)}
          placeholder="john@example.com"
        />
      </Field>

      <Field label="Loan Type" error={errors.loan_type}>
        <select
          value={formData.loan_type}
          onChange={(e) => handleChange('loan_type', e.target.value)}
          className={inputClass(!!errors.loan_type)}
        >
          <option value="">Select loan type</option>
          <option value="used_car_finance">Used Car Finance</option>
          <option value="loan_against_car">Loan Against Car</option>
        </select>
      </Field>

      <Field label="City / Location" error={errors.location}>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className={inputClass(!!errors.location)}
          placeholder="Mumbai"
        />
      </Field>

      <Field label="Age" error={errors.age}>
        <input
          type="number"
          min={18}
          max={75}
          value={formData.age}
          onChange={(e) => handleChange('age', e.target.value)}
          className={inputClass(!!errors.age)}
          placeholder="30"
        />
      </Field>

      <Field label="Employment Type" error={errors.employment_type} full>
        <select
          value={formData.employment_type}
          onChange={(e) => handleChange('employment_type', e.target.value)}
          className={inputClass(!!errors.employment_type)}
        >
          <option value="">Select employment type</option>
          <option value="salaried">Salaried</option>
          <option value="self_employed">Self Employed</option>
        </select>
      </Field>

      {status === 'error' && (
        <div className="sm:col-span-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full inline-flex justify-center items-center rounded-full bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  )
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-lg border px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:ring-2 transition-shadow',
    hasError
      ? 'border-red-400 focus:ring-red-200'
      : 'border-gray-300 focus:ring-brand-blue/30 focus:border-brand-blue',
  ].join(' ')
}

function Field({
  label,
  error,
  children,
  full,
}: {
  label: string
  error?: string
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-semibold text-brand-dark mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
