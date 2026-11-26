// The onboarding steps, in order. Each one is its own page at /onboarding/<id>.
// Flow F1 in docs/flows.md.
export const STEPS = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'sign-up', title: 'Create your account' },
  { id: 'privacy', title: 'Privacy and consent' },
  { id: 'goal', title: 'Your goal', skippable: true },
  { id: 'habits', title: 'What to track' },
  { id: 'pin', title: 'Pin Ecobex', skippable: true },
]

export function stepIndex(id) {
  return STEPS.findIndex((step) => step.id === id)
}

export function nextStepId(id) {
  return STEPS[stepIndex(id) + 1]?.id
}

export function previousStepId(id) {
  return STEPS[stepIndex(id) - 1]?.id
}
