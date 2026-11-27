import { formatRange } from '../../../lib/format.js'

function duration(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h ? `${h} h ${m} min` : `${m} min`
}

// Streaming sites by time spent. Domains only, kept on this device (the privacy promise).
export default function TopSites({ sites }) {
  if (sites.length === 0) return null

  return (
    <div className="rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
      <p className="text-md font-semibold text-primary">Top streaming sites</p>
      <ul className="mt-4 flex flex-col divide-y divide-secondary">
        {sites.map((site) => {
          const co2 = formatRange(site.gCO2, 'g')
          return (
            <li key={site.domain} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-primary">{site.domain}</p>
                <p className="text-xs text-tertiary">{duration(site.minutes)}</p>
              </div>
              <p className="text-sm font-semibold text-primary">
                ≈ {co2.central} {co2.unit}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
