import { TrendDown01, TrendUp01 } from '@untitledui/icons'
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'

// One headline number: a central estimate, its range, the change against the previous
// period, and a note when it only covers some habits.
// Counts (like prompts) pass isEstimate={false}, since they are not estimates.
// For a footprint, going down is good, so a fall is shown in green and a rise in amber.
export default function KpiCard({ icon, label, value, unit, rangeText, change, previousLabel, note, isEstimate = true }) {
  const fell = change !== null && change < 0
  const ChangeIcon = fell ? TrendDown01 : TrendUp01

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
      <div className="flex items-center gap-3">
        <FeaturedIcon icon={icon} color="brand" theme="light" size="sm" />
        <p className="text-sm font-medium text-tertiary">{label}</p>
      </div>

      <div>
        <p className="font-display text-display-sm font-semibold text-primary">
          {isEstimate && <span className="text-tertiary">≈ </span>}
          {value}
          <span className="ml-1 text-md font-medium text-tertiary">{unit}</span>
        </p>
        {rangeText && <p className="mt-1 text-sm text-tertiary">Range {rangeText}</p>}
      </div>

      <div className="mt-auto flex flex-col gap-1">
        {change !== null && (
          <p className={`flex items-center gap-1 text-sm font-medium ${fell ? 'text-success-primary' : 'text-warning-primary'}`}>
            <ChangeIcon className="size-4" aria-hidden="true" />
            {change > 0 ? '+' : ''}
            {change}% <span className="font-normal text-tertiary">vs {previousLabel}</span>
          </p>
        )}
        {note && <p className="text-xs text-quaternary">{note}</p>}
      </div>
    </div>
  )
}
