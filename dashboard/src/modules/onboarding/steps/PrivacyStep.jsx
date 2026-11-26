import { useState } from 'react'
import { Check, InfoCircle, XClose } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import OnboardingLayout from '../OnboardingLayout.jsx'

const measured = [
  'Time spent streaming and on AI tools',
  'How much data pages load',
  'How many AI prompts you send (not what they say)',
  'Site domains, such as youtube.com, kept on this device',
]

const neverCollected = ['Full web addresses (URLs)', 'Page content', 'The text of your AI prompts', 'Anything sent to a server: there is none']

function List({ items, icon: Icon, iconClass }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-secondary">
          <Icon className={`mt-0.5 size-4 shrink-0 ${iconClass}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

// The Chrome Web Store requires this disclosure and an affirmative "agree" inside the
// extension before any browsing data is collected. Tracking starts only after Agree.
export default function PrivacyStep({ onBack, onNext }) {
  const [declined, setDeclined] = useState(false)

  return (
    <OnboardingLayout
      stepId="privacy"
      title="What Ecobex measures"
      description="Ecobex needs your agreement before it measures anything."
      onBack={onBack}
      footer={
        <>
          <Button color="secondary" size="lg" onPress={() => setDeclined(true)}>
            Not now
          </Button>
          <Button size="lg" onPress={() => onNext({ consentAt: new Date().toISOString() })}>
            Agree and start tracking
          </Button>
        </>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-secondary p-4">
          <p className="mb-3 text-sm font-semibold text-primary">Measured</p>
          <List items={measured} icon={Check} iconClass="text-fg-success-primary" />
        </div>
        <div className="rounded-xl border border-secondary p-4">
          <p className="mb-3 text-sm font-semibold text-primary">Never collected</p>
          <List items={neverCollected} icon={XClose} iconClass="text-fg-quaternary" />
        </div>
      </div>

      <p className="mt-4 text-sm text-tertiary">You can pause tracking or delete everything at any time in Settings.</p>

      {declined && (
        <div role="status" className="mt-6 flex gap-3 rounded-xl border border-secondary bg-secondary p-4">
          <InfoCircle className="mt-0.5 size-5 shrink-0 text-fg-brand-primary" aria-hidden="true" />
          <p className="text-sm text-secondary">
            Without your agreement Ecobex can't measure anything, and nothing has been collected. Your answers so far are saved,
            so you can come back to this step whenever you're ready.
          </p>
        </div>
      )}
    </OnboardingLayout>
  )
}
