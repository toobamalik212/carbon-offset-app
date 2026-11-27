import { useState } from 'react'
import { Link } from 'react-router'
import { Activity, CheckCircle, Circle, Cloud01, Droplets01, Zap } from '@untitledui/icons'
import { Tabs } from '@/components/application/tabs/tabs'
import { Badge } from '@/components/base/badges/badges'
import { formatRange, percentChange } from '../../lib/format.js'
import { loadOnboarding } from '../onboarding/onboardingStore.js'
import AiToolsTable from './components/AiToolsTable.jsx'
import CategoryBreakdown from './components/CategoryBreakdown.jsx'
import ContributeCard from './components/ContributeCard.jsx'
import KpiCard from './components/KpiCard.jsx'
import MethodPanel from './components/MethodPanel.jsx'
import TopSites from './components/TopSites.jsx'
import TrendChart from './components/TrendChart.jsx'
import { RANGES, last30Days, metricsFor } from './metricsData.js'

// The Dashboard tab (flow F2): the person's footprint for a chosen period.
// All usage is SAMPLE data until the extension measures real browsing.
export default function MetricsPage() {
  const state = loadOnboarding()
  const [rangeId, setRangeId] = useState('7d')
  const m = metricsFor(rangeId, state.habits)

  const co2 = formatRange(m.now.gCO2, 'g')
  const water = formatRange(m.now.waterMl, 'mL')
  const energy = formatRange(m.now.energyWh, 'Wh')
  const aiOnly = state.habits.streaming ? 'AI chats only: streaming water not estimated yet' : null

  // Steps skipped in onboarding come back as a short checklist until they're done
  const checklist = [
    { id: 'goal', label: 'Set your goals', done: state.goals.length > 0 },
    { id: 'pin', label: 'Pin Ecobex to your toolbar', done: state.pinned },
  ].filter((item) => state.skipped.includes(item.id))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-display-xs font-semibold text-primary">Hi {state.account?.name}</h1>
            <Badge color="gray" size="md">Sample data</Badge>
          </div>
          <p className="mt-1 text-md text-tertiary">Your digital footprint, as estimates with their ranges.</p>
        </div>
        <Tabs selectedKey={rangeId} onSelectionChange={(key) => setRangeId(String(key))} className="w-max max-w-full">
          <Tabs.List type="button-border" items={RANGES}>
            {(tab) => <Tabs.Item {...tab} />}
          </Tabs.List>
        </Tabs>
      </div>

      {checklist.some((item) => !item.done) && (
        <div className="rounded-2xl border border-secondary bg-primary p-5">
          <p className="text-md font-semibold text-primary">Finish setting up</p>
          <ul className="mt-3 flex flex-col gap-2">
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={Cloud01}
          label="CO₂"
          value={co2.central}
          unit={co2.unit}
          rangeText={`${co2.low}–${co2.high} ${co2.unit}`}
          change={percentChange(m.now.gCO2.central, m.before.gCO2.central)}
          previousLabel={m.previousLabel}
        />
        <KpiCard
          icon={Droplets01}
          label="Water"
          value={water.central}
          unit={water.unit}
          rangeText={`${water.low}–${water.high} ${water.unit}`}
          change={percentChange(m.now.waterMl.central, m.before.waterMl.central)}
          previousLabel={m.previousLabel}
          note={aiOnly}
        />
        <KpiCard
          icon={Zap}
          label="Energy"
          value={energy.central}
          unit={energy.unit}
          rangeText={`${energy.low}–${energy.high} ${energy.unit}`}
          change={percentChange(m.now.energyWh.central, m.before.energyWh.central)}
          previousLabel={m.previousLabel}
          note={aiOnly && 'AI chats only: streaming energy not estimated yet'}
        />
        <KpiCard
          icon={Activity}
          label="Activity"
          value={m.now.usage.aiPrompts}
          unit="AI prompts"
          rangeText={null}
          isEstimate={false}
          change={percentChange(m.now.usage.aiPrompts, m.before.usage.aiPrompts)}
          previousLabel={m.previousLabel}
          note={`${m.now.usage.streamingHours.toFixed(1)} h of video streaming`}
        />
      </div>

      <ContributeCard footprint={last30Days(state.habits)} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TrendChart data={m.trend} title={rangeId === 'today' ? 'CO₂ per day (g), last 7 days' : `CO₂ per day (g), last ${m.range.label}`} />
        </div>
        <CategoryBreakdown footprint={m.now} habits={state.habits} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AiToolsTable tools={m.tools} />
        </div>
        <TopSites sites={m.topSites} />
      </div>

      <MethodPanel />
    </div>
  )
}
