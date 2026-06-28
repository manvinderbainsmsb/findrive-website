import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import LeadsCharts from './LeadsCharts'
import LeadsTable from './LeadsTable'
import type { Lead, LeadStatus } from './types'
import { LOAN_TYPE_LABELS, STATUS_LABELS, STATUS_OPTIONS } from './types'

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [loanTypeFilter, setLoanTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    let active = true

    async function loadLeads() {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (!active) return

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setLeads((data ?? []) as Lead[])
      }
      setLoading(false)
    }

    loadLeads()
    return () => {
      active = false
    }
  }, [])

  const loanTypes = useMemo(() => Array.from(new Set(leads.map((l) => l.loan_type))), [leads])

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase()
    return leads.filter((lead) => {
      if (loanTypeFilter !== 'all' && lead.loan_type !== loanTypeFilter) return false
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false
      if (query) {
        const haystack = `${lead.name} ${lead.phone} ${lead.email} ${lead.location}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })
  }, [leads, search, loanTypeFilter, statusFilter])

  function handleStatusChange(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="FinDrive" className="h-9 w-auto" />
            <span className="text-sm font-semibold text-gray-400">CRM Dashboard</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-gray-500 hover:text-brand-blue transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Leads" value={leads.length} />
          <StatCard label="New" value={leads.filter((l) => l.status === 'new').length} />
          <StatCard label="Contacted" value={leads.filter((l) => l.status === 'contacted').length} />
          <StatCard label="Converted" value={leads.filter((l) => l.status === 'converted').length} />
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading leads...</p>
        ) : error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : (
          <>
            <LeadsCharts leads={leads} />

            <div className="flex flex-wrap gap-3 mb-4">
              <input
                type="text"
                placeholder="Search name, phone, email, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-[220px] rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
              <select
                value={loanTypeFilter}
                onChange={(e) => setLoanTypeFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              >
                <option value="all">All Loan Types</option>
                {loanTypes.map((type) => (
                  <option key={type} value={type}>
                    {LOAN_TYPE_LABELS[type] ?? type}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              >
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            <LeadsTable leads={filteredLeads} onStatusChange={handleStatusChange} />
          </>
        )}
      </main>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
      <div className="text-2xl font-extrabold text-brand-dark">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}
