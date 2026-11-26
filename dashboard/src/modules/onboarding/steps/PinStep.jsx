import { ArrowRight, Pin01, PuzzlePiece01 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import OnboardingLayout from '../OnboardingLayout.jsx'

const instructions = [
  { icon: PuzzlePiece01, text: 'Click the puzzle piece in the top right of Chrome.' },
  { icon: Pin01, text: 'Find Ecobex in the list and click its pin.' },
]

// A real extension cannot pin itself; the person does it in Chrome's own menu.
// This page only explains it, with a drawing of Chrome's toolbar.
export default function PinStep({ onBack, onNext, onSkip }) {
  return (
    <OnboardingLayout
      stepId="pin"
      title="Pin Ecobex to your toolbar"
      description="Then today's footprint is one click away."
      onBack={onBack}
      onSkip={onSkip}
      footer={
        <Button size="lg" iconTrailing={ArrowRight} onPress={() => onNext({ pinned: true })}>
          Done, go to my dashboard
        </Button>
      }
    >
      {/* Drawing of the toolbar, not a screenshot */}
      <div aria-hidden="true" className="flex items-center justify-end gap-3 rounded-xl border border-secondary bg-secondary px-4 py-3">
        <div className="h-2 flex-1 rounded-full bg-tertiary" />
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-solid font-display text-sm font-semibold text-white">
          E
        </span>
        <span className="flex size-8 items-center justify-center rounded-full ring-2 ring-brand">
          <PuzzlePiece01 className="size-5 text-fg-secondary" />
        </span>
      </div>

      <ol className="mt-6 flex flex-col gap-4">
        {instructions.map((item, index) => (
          <li key={item.text} className="flex items-center gap-3 text-md text-secondary">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-brand-secondary">
              {index + 1}
            </span>
            <item.icon className="size-5 shrink-0 text-fg-tertiary" aria-hidden="true" />
            {item.text}
          </li>
        ))}
      </ol>
    </OnboardingLayout>
  )
}
