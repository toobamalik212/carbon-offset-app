import { Link } from 'react-router'
import { ArrowRight, Cloud01, Droplets01, HeartHand } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import OnboardingLayout from '../OnboardingLayout.jsx'

const points = [
  { icon: Cloud01, title: 'Measured for you', text: 'Ecobex tracks streaming and AI chats in the background. No typing numbers in.' },
  { icon: Droplets01, title: 'CO₂ and water, as ranges', text: 'Every figure is an estimate with its source one click away.' },
  { icon: HeartHand, title: 'Contribute where it counts', text: 'See the provider, price and standard of a climate project before you leave.' },
]

export default function WelcomeStep({ onNext }) {
  return (
    <OnboardingLayout
      stepId="welcome"
      title="See what your digital habits cost the planet"
      description="Set up takes about two minutes."
      footer={
        <Button size="lg" iconTrailing={ArrowRight} onPress={onNext}>
          Get started
        </Button>
      }
    >
      <ul className="flex flex-col gap-5">
        {points.map((point) => (
          <li key={point.title} className="flex gap-4">
            <FeaturedIcon icon={point.icon} color="brand" theme="light" size="md" />
            <div>
              <p className="text-md font-semibold text-primary">{point.title}</p>
              <p className="text-sm text-tertiary">{point.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-tertiary">
        Already have an account?{' '}
        <Link to="/sign-in" className="font-semibold text-brand-secondary hover:underline">
          Sign in
        </Link>
      </p>
    </OnboardingLayout>
  )
}
