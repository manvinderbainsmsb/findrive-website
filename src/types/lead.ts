export type LoanType = 'used_car_finance' | 'loan_against_car'
export type EmploymentType = 'salaried' | 'self_employed'

export interface LeadFormData {
  name: string
  phone: string
  email: string
  loan_type: LoanType | ''
  location: string
  age: string
  employment_type: EmploymentType | ''
}

export const initialLeadFormData: LeadFormData = {
  name: '',
  phone: '',
  email: '',
  loan_type: '',
  location: '',
  age: '',
  employment_type: '',
}

export type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>

export function validateLeadForm(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Please enter your full name.'
  } else if (data.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters.'
  }

  const phoneDigits = data.phone.replace(/\D/g, '')
  if (!phoneDigits) {
    errors.phone = 'Please enter your phone number.'
  } else if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.loan_type) {
    errors.loan_type = 'Please select a loan type.'
  }

  if (!data.location.trim()) {
    errors.location = 'Please enter your city/location.'
  }

  const ageNum = Number(data.age)
  if (!data.age.trim()) {
    errors.age = 'Please enter your age.'
  } else if (!Number.isFinite(ageNum) || ageNum < 18 || ageNum > 75) {
    errors.age = 'Age must be between 18 and 75.'
  }

  if (!data.employment_type) {
    errors.employment_type = 'Please select your employment type.'
  }

  return errors
}
