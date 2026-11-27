import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Daily CO₂: a line for the central estimate inside a shaded band from low to high.
// A band, not error bars, is how published chart guidance suggests showing uncertainty.
function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const day = payload[0].payload
  return (
    <div className="rounded-lg border border-secondary bg-primary px-3 py-2 text-sm shadow-lg">
      <p className="font-semibold text-primary">{label}</p>
      <p className="text-secondary">≈ {day.central} g CO₂</p>
      <p className="text-tertiary">
        Range {day.band[0]}–{day.band[1]} g
      </p>
    </div>
  )
}

export default function TrendChart({ data, title }) {
  return (
    <div className="rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-md font-semibold text-primary">{title}</p>
        <p className="text-xs text-tertiary">Line: central estimate · Shading: likely range</p>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-border-secondary)" />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} minTickGap={16} />
            <YAxis axisLine={false} tickLine={false} width={36} tick={{ fontSize: 12 }} />
            <Tooltip content={<TrendTooltip />} />
            <Area dataKey="band" stroke="none" fill="var(--color-brand-500)" fillOpacity={0.18} isAnimationActive={false} />
            <Line dataKey="central" stroke="var(--color-brand-600)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
