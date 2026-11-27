// Everything the Dashboard tab shows for one time range, worked out from the sample usage.
// Each figure comes from lib/footprint.js, which only uses data/factors.js.
import { AI_TOOLS, SAMPLE_DAYS } from '../../data/sampleUsage.js'
import { aiFootprint, streamingFootprint, totalFootprint } from '../../lib/footprint.js'

export const RANGES = [
  { id: 'today', label: 'Today', days: 1 },
  { id: '7d', label: '7 days', days: 7 },
  { id: '30d', label: '30 days', days: 30 },
]

const PREVIOUS_LABEL = { today: 'yesterday', '7d': 'previous 7 days', '30d': 'previous 30 days' }

function lastDays(count, offset = 0) {
  const end = SAMPLE_DAYS.length - offset
  return SAMPLE_DAYS.slice(Math.max(0, end - count), end)
}

export function metricsFor(rangeId, habits) {
  const range = RANGES.find((r) => r.id === rangeId)
  const days = lastDays(range.days)
  const previousDays = lastDays(range.days, range.days)

  const now = totalFootprint(days, habits)
  const before = totalFootprint(previousDays, habits)

  // The chart always shows at least a week, so "Today" still has a trend to read
  const chartDays = lastDays(Math.max(range.days, 7))
  const trend = chartDays.map((day) => {
    const f = totalFootprint([day], habits)
    return {
      label: new Date(day.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
      central: Math.round(f.gCO2.central),
      band: [Math.round(f.gCO2.low), Math.round(f.gCO2.high)],
    }
  })

  // Per AI tool, like Offset AI's tools table
  const tools = habits.aiChats
    ? AI_TOOLS.map((tool) => {
        const prompts = days.reduce((sum, d) => sum + d.aiByTool[tool.id], 0)
        return { ...tool, prompts, ...aiFootprint(prompts) }
      })
    : []

  // Top sites by time, domains only (privacy promise: no full addresses)
  const minutesBySite = {}
  if (habits.streaming) {
    days.forEach((d) => Object.entries(d.sites).forEach(([domain, min]) => (minutesBySite[domain] = (minutesBySite[domain] ?? 0) + min)))
  }
  const topSites = Object.entries(minutesBySite)
    .map(([domain, minutes]) => ({ domain, minutes, gCO2: streamingFootprint(minutes / 60).gCO2 }))
    .sort((a, b) => b.minutes - a.minutes)

  return { range, previousLabel: PREVIOUS_LABEL[rangeId], now, before, trend, tools, topSites }
}

// Always the last 30 days, for the Contribute card
export function last30Days(habits) {
  return totalFootprint(lastDays(30), habits)
}
