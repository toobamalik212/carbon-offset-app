import { Link, Navigate, useNavigate } from 'react-router'
import { CheckCircle, Circle } from '@untitledui/icons'
import { Badge } from '@/components/base/badges/badges'
import { Button } from '@/components/base/buttons/button'
import { clearOnboarding, loadOnboarding } from '../onboarding/onboardingStore.js'

// Placeholder for the Metrics module (flow F2), so onboarding has somewhere to land.
// The real dashboard, with side navigation and sample figures, is the next module.
export default function MetricsPage() {
  const navigate = useNavigate()
  const state = loadOnboarding()
  if (!state.complete) return <Navigate to="/" replace />

  // Steps the person skipped come back here as a short setup checklist
  const checklist = [
    { id: 'goal', label: 'Set a goal', done: !!state.goal },
    { id: 'pin', label: 'Pin Ecobex to your toolbar', done: state.pinned },
  ].filter((item) => state.skipped.includes(item.id))

  return (
    <div className="min-h-screen bg-secondary px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-display-xs font-semibold text-primary">Hi {state.account?.name}</h1>
          <Badge color="gray" size="md">Sample</Badge>
        </div>

        {checklist.some((item) => !item.done) && (
          <div className="rounded-2xl border border-secondary bg-primary p-6">
            <p className="text-md font-semibold text-primary">Finish setting up</p>
            <ul className="mt-4 flex flex-col gap-3">
              {checklist.map((item) => (
                <li key={item.id} className="flex items-center gap-3 text-sm text-secondary">
                  {item.done ? <CheckCircle className="size-5 text-fg-success-primary" /> : <Circle className="size-5 text-fg-quaternary" />}
                  <Link to={`/onboarding/${item.id}`} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-2xl border border-dashed border-primary bg-primary p-10 text-center">
          <p className="text-md font-semibold text-primary">Your metrics go here</p>
          <p className="mt-1 text-sm text-tertiary">The Metrics module is next: CO₂ and water as ranges, by period and category.</p>
        </div>

        {/* For testing onboarding again. Settings will replace this with Clear data. */}
        <div>
          <Button
            color="link-gray"
            size="sm"
            onPress={() => {
              clearOnboarding()
              navigate('/')
            }}
          >
            Reset demo and start onboarding again
          </Button>
        </div>
      </div>
    </div>
  )
}
