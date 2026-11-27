// Saves the account and onboarding answers in this browser's localStorage.
// DEMO ONLY: there is no backend and no password, so this is not real sign-in or security.
// Anything typed here stays on this device and is never sent anywhere.

const KEY = 'ecobex.onboarding'

const EMPTY = {
  account: null, // { name, email, createdAt }
  signedIn: false,
  consentAt: null, // when the person agreed to tracking
  goals: [], // any of 'reduce', 'understand', 'contribute'
  habits: { streaming: true, aiChats: true },
  pinned: false,
  skipped: [], // step ids the person skipped, shown later as a setup checklist
  lastStep: 'welcome', // where to resume if the tab was closed
  complete: false,
}

// Some browsers block storage; fall back to sample-only behaviour instead of crashing
export function loadOnboarding() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY)) ?? {}
    // Older saves had a single goal; turn it into a list
    if (saved.goal && !saved.goals) saved.goals = [saved.goal]
    return { ...EMPTY, ...saved }
  } catch {
    return { ...EMPTY }
  }
}

export function saveOnboarding(changes) {
  const next = { ...loadOnboarding(), ...changes }
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage unavailable: the answers last only until the page is closed
  }
  return next
}

export function clearOnboarding() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Nothing to clear
  }
}

// The step to send someone to when they come back
export function resumeStep(state) {
  if (!state.account) return state.lastStep === 'welcome' ? 'welcome' : 'sign-up'
  if (!state.consentAt) return 'privacy'
  return state.lastStep
}
