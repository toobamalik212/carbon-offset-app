import { ChevronDown } from '@untitledui/icons'
import { AI_PROMPT, GRID, STREAMING, VIDEO_CALL } from '../../../data/factors.js'

// "How is this calculated?": every figure behind the numbers above, with its source,
// one click away (the unique proposition). The full page comes with "How we calculate".
const rows = [
  {
    label: 'AI chat, per prompt',
    value: `${AI_PROMPT.energyWh.low}–${AI_PROMPT.energyWh.high} Wh energy · ${AI_PROMPT.waterMl.low}–${AI_PROMPT.waterMl.high} mL water`,
    confidence: AI_PROMPT.confidence,
    sources: AI_PROMPT.energyWh.sources,
  },
  {
    label: 'Electricity, world average',
    value: `${GRID.world.gCO2PerKWh} g CO₂ per kWh (${GRID.world.year})`,
    confidence: 'Medium',
    sources: [GRID.world.source],
  },
  {
    label: 'Video streaming, per hour',
    value: `${STREAMING.gCO2.low}–${STREAMING.gCO2.high} g CO₂ · energy and water not estimated yet`,
    confidence: STREAMING.confidence,
    sources: STREAMING.gCO2.sources,
  },
  { label: 'Video calls', value: 'Not estimated yet: no source we trust', confidence: VIDEO_CALL.confidence, sources: [] },
]

export default function MethodPanel() {
  return (
    <details className="group rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
      <summary className="flex cursor-pointer list-none items-center justify-between text-md font-semibold text-primary">
        How are these numbers calculated?
        <ChevronDown className="size-5 text-fg-tertiary transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <p className="mt-3 text-sm text-tertiary">
        Every number is an estimate. We multiply your usage by the figures below and show the range between the lowest and highest
        source.
      </p>
      <ul className="mt-4 flex flex-col divide-y divide-secondary">
        {rows.map((row) => (
          <li key={row.label} className="py-3">
            <p className="text-sm font-medium text-primary">{row.label}</p>
            <p className="text-sm text-secondary">{row.value}</p>
            <p className="mt-1 text-xs text-tertiary">
              Confidence: {row.confidence}
              {row.sources.map((source) => (
                <span key={source.url}>
                  {' · '}
                  <a href={source.url} target="_blank" rel="noreferrer" className="underline hover:text-secondary">
                    {source.name}
                  </a>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </details>
  )
}
