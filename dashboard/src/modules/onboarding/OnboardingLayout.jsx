import { ArrowLeft } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { ProgressBar } from '@/components/base/progress-indicators/progress-indicators'
import { STEPS, stepIndex } from './steps.js'

// The frame every onboarding step sits in: logo, progress, title, then the step's own content.
// `footer` holds the step's buttons, so Back, Skip and Continue always sit in the same place.
export default function OnboardingLayout({ stepId, title, description, onBack, onSkip, footer, children }) {
  const number = stepIndex(stepId) + 1

  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <span className="font-display text-xl font-semibold text-brand-secondary">Ecobex</span>
        <span className="text-sm text-tertiary">
          Step {number} of {STEPS.length}
        </span>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 pb-16 md:items-center">
        <div className="w-full max-w-xl rounded-2xl border border-secondary bg-primary p-6 shadow-xs md:p-10">
          <ProgressBar value={number} max={STEPS.length} />

          {onBack && (
            <Button color="link-gray" size="sm" iconLeading={ArrowLeft} onPress={onBack} className="mt-6">
              Back
            </Button>
          )}

          <h1 className="mt-6 font-display text-display-xs font-semibold text-primary">{title}</h1>
          {description && <p className="mt-2 text-md text-tertiary">{description}</p>}

          <div className="mt-8">{children}</div>

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            {onSkip && (
              <Button color="tertiary" onPress={onSkip}>
                Skip for now
              </Button>
            )}
            {footer}
          </div>
        </div>
      </main>
    </div>
  )
}
