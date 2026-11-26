import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Mail01, User01 } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import OnboardingLayout from '../OnboardingLayout.jsx'
import { emailProblem } from '../emailCheck.js'

export default function SignUpStep({ state, onBack, onNext }) {
  const [name, setName] = useState(state.account?.name ?? '')
  const [email, setEmail] = useState(state.account?.email ?? '')
  // Only show errors after the person tries to continue, not while they type
  const [tried, setTried] = useState(false)

  const nameError = name.trim() ? null : 'Enter your name.'
  const emailError = emailProblem(email)

  function submit(event) {
    event.preventDefault()
    setTried(true)
    if (nameError || emailError) return
    onNext({ account: { name: name.trim(), email: email.trim(), createdAt: new Date().toISOString() }, signedIn: true })
  }

  return (
    <form onSubmit={submit} noValidate>
      <OnboardingLayout
        stepId="sign-up"
        title="Create your account"
        description="No password needed. Your name and email stay in this browser."
        onBack={onBack}
        footer={
          <Button type="submit" size="lg" iconTrailing={ArrowRight}>
            Continue
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <Input
            label="Name"
            icon={User01}
            placeholder="What should we call you?"
            value={name}
            onChange={setName}
            isInvalid={tried && !!nameError}
            hint={tried ? nameError : undefined}
            autoComplete="given-name"
          />
          <Input
            label="Email"
            type="email"
            icon={Mail01}
            placeholder="name@example.com"
            value={email}
            onChange={setEmail}
            isInvalid={tried && !!emailError}
            hint={tried && emailError ? emailError : 'Used to sign back in on this browser.'}
            autoComplete="email"
          />
        </div>

        <p className="mt-6 text-sm text-tertiary">
          Already have an account?{' '}
          <Link to="/sign-in" className="font-semibold text-brand-secondary hover:underline">
            Sign in
          </Link>
        </p>
      </OnboardingLayout>
    </form>
  )
}
