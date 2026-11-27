import { useState } from 'react'
import { ArrowRight } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Checkbox } from '@/components/base/checkbox/checkbox'
import OnboardingLayout from '../OnboardingLayout.jsx'

const goals = [
  { id: 'reduce', label: 'Reduce my footprint', hint: 'See which habits weigh most and cut back.' },
  { id: 'understand', label: 'Understand my impact', hint: 'Just curious what my digital life adds up to.' },
  { id: 'contribute', label: "Contribute for what I can't reduce", hint: 'Support a verified climate project.' },
]

// People can pick more than one goal
export default function GoalStep({ state, onBack, onNext, onSkip }) {
  const [chosen, setChosen] = useState(state.goals)

  function toggle(id, on) {
    setChosen(on ? [...chosen, id] : chosen.filter((goal) => goal !== id))
  }

  return (
    <OnboardingLayout
      stepId="goal"
      title="What brings you to Ecobex?"
      description="Pick as many as you like. You can change this later in Settings."
      onBack={onBack}
      onSkip={onSkip}
      footer={
        <Button size="lg" iconTrailing={ArrowRight} isDisabled={chosen.length === 0} onPress={() => onNext({ goals: chosen })}>
          Continue
        </Button>
      }
    >
      <div role="group" aria-label="Your goals" className="flex flex-col gap-3">
        {goals.map((option) => (
          <div key={option.id} className="rounded-xl border border-secondary p-4">
            <Checkbox
              size="md"
              label={option.label}
              hint={option.hint}
              isSelected={chosen.includes(option.id)}
              onChange={(on) => toggle(option.id, on)}
            />
          </div>
        ))}
      </div>
    </OnboardingLayout>
  )
}
