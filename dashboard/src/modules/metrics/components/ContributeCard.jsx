import { ArrowRight, HeartHand } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { formatRange } from '../../../lib/format.js'

// The way into Contribute (flow F3), like Offset AI's dashboard banner.
// Says "contribute", never "offset" or "neutral" (EU 2024/825 and the UK Green Claims Code).
export default function ContributeCard({ footprint }) {
  const co2 = formatRange(footprint.gCO2, 'g')

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-brand bg-primary p-5 shadow-xs sm:flex-row sm:items-center">
      <FeaturedIcon icon={HeartHand} color="brand" theme="light" size="md" />
      <div className="flex-1">
        <p className="text-md font-semibold text-primary">
          Your last 30 days: ≈ {co2.central} {co2.unit} CO₂
        </p>
        <p className="text-sm text-secondary">Contribute to a verified climate project. It funds the project; it doesn't cancel your emissions.</p>
      </div>
      <Button href="/contribute" iconTrailing={ArrowRight}>
        Contribute
      </Button>
    </div>
  )
}
