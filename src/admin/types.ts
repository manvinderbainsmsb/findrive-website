export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost'

export interface Lead {
  id: string
  created_at: string
  name: string
  phone: string
  email: string
  loan_type: string
  location: string
  age: number
  employment_type: string
  status: LeadStatus
}

export const STATUS_OPTIONS: LeadStatus[] = ['new', 'contacted', 'converted', 'lost']

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  converted: 'Converted',
  lost: 'Lost',
}

export const LOAN_TYPE_LABELS: Record<string, string> = {
  used_car_finance: 'Used Car Finance',
  loan_against_car: 'Loan Against Car',
  new_car_finance: 'New Car Finance',
  personal_loan: 'Personal Loan',
}
