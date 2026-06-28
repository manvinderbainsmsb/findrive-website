import { supabase } from '../lib/supabase'
import type { Lead, LeadStatus } from './types'
import { LOAN_TYPE_LABELS, STATUS_LABELS, STATUS_OPTIONS } from './types'

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  converted: 'bg-green-50 text-green-700 border-green-200',
  lost: 'bg-gray-100 text-gray-500 border-gray-200',
}

export default function LeadsTable({
  leads,
  onStatusChange,
}: {
  leads: Lead[]
  onStatusChange: (id: string, status: LeadStatus) => void
}) {
  async function updateStatus(id: string, status: LeadStatus) {
    onStatusChange(id, status)
    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (error) {
      console.error('Failed to update lead status:', error.message)
    }
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-500">
        No leads match the current filters.
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Loan Type</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Age</th>
              <th className="px-5 py-3">Employment</th>
              <th className="px-5 py-3">Submitted</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50/60">
                <td className="px-5 py-3 font-semibold text-brand-dark whitespace-nowrap">{lead.name}</td>
                <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                  <div>{lead.phone}</div>
                  <div className="text-xs text-gray-400">{lead.email}</div>
                </td>
                <td className="px-5 py-3 text-gray-600 whitespace-nowrap">
                  {LOAN_TYPE_LABELS[lead.loan_type] ?? lead.loan_type}
                </td>
                <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{lead.location}</td>
                <td className="px-5 py-3 text-gray-600">{lead.age}</td>
                <td className="px-5 py-3 text-gray-600 whitespace-nowrap capitalize">
                  {lead.employment_type.replace('_', ' ')}
                </td>
                <td className="px-5 py-3 text-gray-500 whitespace-nowrap text-xs">
                  {new Date(lead.created_at).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-5 py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold focus:outline-none ${STATUS_COLORS[lead.status]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
