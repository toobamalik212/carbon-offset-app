import { Globe01, MessageChatCircle, PlayCircle, VideoRecorder } from '@untitledui/icons'
import { Badge } from '@/components/base/badges/badges'
import { ProgressBar } from '@/components/base/progress-indicators/progress-indicators'
import { formatRange } from '../../../lib/format.js'

// Where the CO₂ comes from, by habit. Habits with no sourced figure are listed, not hidden,
// with "Not estimated yet" and no number.
export default function CategoryBreakdown({ footprint, habits }) {
  const total = footprint.gCO2.central || 1
  const rows = [
    { id: 'streaming', icon: PlayCircle, label: 'Video streaming', on: habits.streaming, gCO2: footprint.byCategory.streaming, usage: `${footprint.usage.streamingHours.toFixed(1)} h` },
    { id: 'aiChats', icon: MessageChatCircle, label: 'AI chats', on: habits.aiChats, gCO2: footprint.byCategory.aiChats, usage: `${footprint.usage.aiPrompts} prompts` },
    { id: 'browsing', icon: Globe01, label: 'Browsing', notEstimated: true },
    { id: 'videoCalls', icon: VideoRecorder, label: 'Video calls', notEstimated: true },
  ]

  return (
    <div className="rounded-2xl border border-secondary bg-primary p-5 shadow-xs">
      <p className="text-md font-semibold text-primary">Where it comes from</p>
      <ul className="mt-4 flex flex-col divide-y divide-secondary">
        {rows.map((row) => {
          const value = row.gCO2 && formatRange(row.gCO2, 'g')
          const share = row.gCO2 ? Math.round((row.gCO2.central / total) * 100) : 0
          return (
            <li key={row.id} className="flex items-center gap-4 py-3">
              <row.icon className="size-5 shrink-0 text-fg-tertiary" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-primary">{row.label}</p>
                {row.notEstimated ? (
                  <p className="text-xs text-quaternary">No sourced figure yet</p>
                ) : row.on ? (
                  <div className="mt-1.5 flex items-center gap-3">
                    <ProgressBar value={share} className="max-w-48" />
                    <span className="text-xs text-tertiary">{share}%</span>
                  </div>
                ) : (
                  <p className="text-xs text-quaternary">Not tracked (change in Settings)</p>
                )}
              </div>
              {row.notEstimated ? (
                <Badge color="gray" size="sm">Not estimated yet</Badge>
              ) : (
                row.on && (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">
                      ≈ {value.central} {value.unit}
                    </p>
                    <p className="text-xs text-tertiary">{row.usage}</p>
                  </div>
                )
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
