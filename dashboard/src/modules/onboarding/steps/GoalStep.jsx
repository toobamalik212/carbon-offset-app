import { useState } from 'react'
import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { RadioButton, RadioGroup } from '@/components/base/radio-buttons/radio-buttons'
import OnboardingLayout from '../OnboardingLayout.jsx'

const goals = [
  { id: 'reduce', label: 'Reduce my footprint', hint: 'See which habits weigh most and cut back.' },
  { id: 'understand', label: 'Understand my impact', hint: 'Just curious what my digital life adds up to.' },
  { id: 'contribute', label: "Contribute for what I can't reduce", hint: 'Support a verified climate project.' },
]

export default function GoalStep({ state, onBack, onNext, onSkip }) {
  const [goal, setGoal] = useState(state.goal)

  return (
    <OnboardingLayout
      stepId="goal"
      title="What brings you to Ecobex?"
      description="You can change this later in Settings."
      onBack={onBack}
      onSkip={onSkip}
      footer={
        <Button size="lg" iconTrailing={ArrowRight} isDisabled={!goal} onPress={() => onNext({ goal })}>
          Continue
        </Button>
      }
    >
      <RadioGroup aria-label="Your goal" value={goal} onChange={setGoal} size="md" className="gap-3">
        {goals.map((option) => (
          <div key={option.id} className="rounded-xl border border-secondary p-4">
            <RadioButton value={option.id} label={option.label} hint={option.hint} size="md" />
          </div>
        ))}
      </RadioGroup>
    </OnboardingLayout>
  )
}
