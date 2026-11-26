import { useState } from 'react'
import { ArrowRight, Globe01, MessageChatCircle, PlayCircle, VideoRecorder } from '@untitledui/icons'
import { Badge } from '@/components/base/badges/badges'
import { Button } from '@/components/base/buttons/button'
import { Toggle } from '@/components/base/toggle/toggle'
import OnboardingLayout from '../OnboardingLayout.jsx'

// Only habits with a sourced figure in data/factors.js can be switched on.
// The others are shown as "Not estimated yet" so nobody sees a made-up number.
const habits = [
  { id: 'streaming', icon: PlayCircle, label: 'Video streaming', hint: 'YouTube, Netflix and similar' },
  { id: 'aiChats', icon: MessageChatCircle, label: 'AI chats', hint: 'ChatGPT, Gemini, Claude' },
  { id: 'browsing', icon: Globe01, label: 'Browsing', hint: 'Everything else you open', notEstimated: true },
  { id: 'videoCalls', icon: VideoRecorder, label: 'Video calls', hint: 'Meet, Zoom, Teams', notEstimated: true },
]

export default function HabitsStep({ state, onBack, onNext }) {
  const [chosen, setChosen] = useState(state.habits)
  const noneOn = !Object.values(chosen).some(Boolean)

  return (
    <OnboardingLayout
      stepId="habits"
      title="What should Ecobex track?"
      description="Ecobex measures these automatically. Change them any time in Settings."
      onBack={onBack}
      footer={
        <Button size="lg" iconTrailing={ArrowRight} isDisabled={noneOn} onPress={() => onNext({ habits: chosen })}>
          Continue
        </Button>
      }
    >
      <ul className="flex flex-col gap-3">
        {habits.map((habit) => (
          <li key={habit.id} className="flex items-center gap-4 rounded-xl border border-secondary p-4">
            <habit.icon className="size-5 shrink-0 text-fg-tertiary" aria-hidden="true" />
            {habit.notEstimated ? (
              <>
                <div className="flex-1">
                  <p className="text-md font-medium text-tertiary">{habit.label}</p>
                  <p className="text-sm text-quaternary">{habit.hint}</p>
                </div>
                <Badge color="gray" size="sm">Not estimated yet</Badge>
              </>
            ) : (
              <Toggle
                className="flex-1 flex-row-reverse justify-between"
                size="md"
                label={habit.label}
                hint={habit.hint}
                isSelected={!!chosen[habit.id]}
                onChange={(on) => setChosen({ ...chosen, [habit.id]: on })}
              />
            )}
          </li>
        ))}
      </ul>

      {noneOn && <p className="mt-4 text-sm text-error-primary">Switch on at least one habit so Ecobex has something to measure.</p>}
    </OnboardingLayout>
  )
}
