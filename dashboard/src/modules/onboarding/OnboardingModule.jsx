import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { loadOnboarding, saveOnboarding } from './onboardingStore.js'
import { STEPS, nextStepId, previousStepId, stepIndex } from './steps.js'
import WelcomeStep from './steps/WelcomeStep.jsx'
import SignUpStep from './steps/SignUpStep.jsx'
import PrivacyStep from './steps/PrivacyStep.jsx'
import GoalStep from './steps/GoalStep.jsx'
import HabitsStep from './steps/HabitsStep.jsx'
import PinStep from './steps/PinStep.jsx'

const SCREENS = {
  welcome: WelcomeStep,
  'sign-up': SignUpStep,
  privacy: PrivacyStep,
  goal: GoalStep,
  habits: HabitsStep,
  pin: PinStep,
}

// Shows one onboarding step at /onboarding/<step>. Each step saves its answers before moving on,
// so closing the tab and coming back resumes where the person left off.
export default function OnboardingModule() {
  const { stepId } = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState(loadOnboarding)

  // Remember the furthest step reached in the browser, for resuming later
  useEffect(() => {
    if (SCREENS[stepId] && stepIndex(stepId) > stepIndex(loadOnboarding().lastStep)) {
      saveOnboarding({ lastStep: stepId })
    }
  }, [stepId])

  if (!SCREENS[stepId]) return <Navigate to="/onboarding/welcome" replace />
  // Steps after sign-up need an account, and steps after privacy need agreement
  if (stepIndex(stepId) > stepIndex('sign-up') && !state.account) return <Navigate to="/onboarding/sign-up" replace />
  if (stepIndex(stepId) > stepIndex('privacy') && !state.consentAt) return <Navigate to="/onboarding/privacy" replace />

  function goTo(id, changes = {}) {
    const isLast = stepId === STEPS.at(-1).id
    setState(saveOnboarding({ ...changes, complete: isLast || state.complete }))
    // Someone finishing a skipped step from the dashboard checklist goes straight back
    navigate(id && !state.complete ? `/onboarding/${id}` : '/dashboard')
  }

  const Screen = SCREENS[stepId]
  const back = previousStepId(stepId)

  return (
    <Screen
      state={state}
      onBack={back ? () => navigate(`/onboarding/${back}`) : undefined}
      onNext={(changes) => goTo(nextStepId(stepId), changes)}
      onSkip={() => goTo(nextStepId(stepId), { skipped: [...new Set([...state.skipped, stepId])] })}
    />
  )
}
