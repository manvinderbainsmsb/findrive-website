import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Lead } from './types'
import { LOAN_TYPE_LABELS } from './types'

const PIE_COLORS = ['#1565d8', '#1f8fae', '#3aab4a', '#f59e0b']

export default function LeadsCharts({ leads }: { leads: Lead[] }) {
  const byDay = groupByDay(leads)
  const byLoanType = groupByLoanType(leads)

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-brand-dark mb-4">Leads over the last 14 days</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={byDay}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={28} />
            <Tooltip />
            <Bar dataKey="count" fill="#1565d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-brand-dark mb-4">Leads by loan type</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={byLoanType} dataKey="count" nameKey="label" innerRadius={50} outerRadius={80} paddingAngle={2}>
              {byLoanType.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <ul className="mt-3 flex flex-wrap gap-3 justify-center text-xs text-gray-600">
          {byLoanType.map((item, i) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
              />
              {item.label} ({item.count})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function groupByDay(leads: Lead[]) {
  const days: { day: string; count: number }[] = []
  const counts = new Map<string, number>()

  for (let i = 13; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    counts.set(key, 0)
  }

  for (const lead of leads) {
    const key = new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
  }

  for (const [day, count] of counts) {
    days.push({ day, count })
  }

  return days
}

function groupByLoanType(leads: Lead[]) {
  const counts = new Map<string, number>()
  for (const lead of leads) {
    const label = LOAN_TYPE_LABELS[lead.loan_type] ?? lead.loan_type
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }
  return Array.from(counts, ([label, count]) => ({ label, count }))
}
