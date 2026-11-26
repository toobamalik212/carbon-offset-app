// Says exactly what is wrong with an email, rather than a generic "invalid email".
// Returns null when the email looks fine.
export function emailProblem(email) {
  const value = email.trim()
  if (!value) return 'Enter your email.'
  if (!value.includes('@')) return 'An email needs an @, like name@example.com.'
  const [local, domain] = value.split('@')
  if (!local) return 'Add the part before the @.'
  if (!domain || !domain.includes('.') || domain.endsWith('.')) return 'Add the domain after the @, like example.com.'
  return null
}
