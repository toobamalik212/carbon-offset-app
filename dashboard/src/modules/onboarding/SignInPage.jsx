import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { InfoCircle, Mail01 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { emailProblem } from './emailCheck.js'
import { loadOnboarding, resumeStep, saveOnboarding } from './onboardingStore.js'

// Demo sign-in: finds the account saved in this browser by its email. No password, no server.
export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  function submit(event) {
    event.preventDefault()
    const problem = emailProblem(email)
    if (problem) return setError(problem)

    const state = loadOnboarding()
    if (state.account?.email.toLowerCase() !== email.trim().toLowerCase()) {
      return setError("There's no Ecobex account with that email in this browser.")
    }
    const next = saveOnboarding({ signedIn: true })
    navigate(next.complete ? '/dashboard' : `/onboarding/${resumeStep(next)}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <header className="px-6 py-5 md:px-10">
        <span className="font-display text-xl font-semibold text-brand-secondary">Ecobex</span>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 pb-16 md:items-center">
        <form onSubmit={submit} noValidate className="w-full max-w-md rounded-2xl border border-secondary bg-primary p-6 shadow-xs md:p-10">
          <h1 className="font-display text-display-xs font-semibold text-primary">Welcome back</h1>
          <p className="mt-2 text-md text-tertiary">Enter the email you signed up with.</p>

          <Input
            className="mt-8"
            label="Email"
            type="email"
            icon={Mail01}
            placeholder="name@example.com"
            value={email}
            onChange={(value) => {
              setEmail(value)
              setError(null)
            }}
            isInvalid={!!error}
            hint={error ?? undefined}
            autoComplete="email"
          />

          <Button type="submit" size="lg" className="mt-6 w-full">
            Sign in
          </Button>

          {/* Gap G4 in docs/flows.md: without a backend, accounts can't move between browsers */}
          <div className="mt-6 flex gap-3 rounded-xl bg-secondary p-4">
            <InfoCircle className="mt-0.5 size-5 shrink-0 text-fg-tertiary" aria-hidden="true" />
            <p className="text-sm text-tertiary">Your account lives in this browser only. On another browser, create a new one.</p>
          </div>

          <p className="mt-6 text-center text-sm text-tertiary">
            New to Ecobex?{' '}
            <Link to="/onboarding/welcome" className="font-semibold text-brand-secondary hover:underline">
              Get started
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}
