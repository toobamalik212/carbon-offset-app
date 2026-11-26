import { Navigate } from 'react-router'
import { loadOnboarding, resumeStep } from './onboardingStore.js'

// Decides where "/" goes: the dashboard once onboarding is done, the sign-in page
// for someone who signed out, otherwise the onboarding step they were last on.
export default function StartRedirect() {
  const state = loadOnboarding()
  if (state.complete && state.signedIn) return <Navigate to="/metrics" replace />
  if (state.account && !state.signedIn) return <Navigate to="/sign-in" replace />
  return <Navigate to={`/onboarding/${resumeStep(state)}`} replace />
}
