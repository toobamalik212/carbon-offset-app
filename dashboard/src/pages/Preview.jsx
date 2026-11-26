// A showcase of the Untitled UI components we have copied in, using Ecobex green.
// It is only for checking the design system works. The numbers are made-up sample data, not real tracking.
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Cloud01, Droplets01, Zap } from '@untitledui/icons'
import { Button } from '@/components/base/buttons/button'
import { Badge } from '@/components/base/badges/badges'
import { Input } from '@/components/base/input/input'
import { Checkbox } from '@/components/base/checkbox/checkbox'
import { RadioButton, RadioGroup } from '@/components/base/radio-buttons/radio-buttons'
import { Toggle } from '@/components/base/toggle/toggle'
import { ProgressBar } from '@/components/base/progress-indicators/progress-indicators'
import { Tabs } from '@/components/application/tabs/tabs'
import { Table, TableCard } from '@/components/application/table/table'
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { ChartTooltipContent } from '@/components/application/charts/charts-base'

const ranges = [
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
  { id: 'month', label: 'This month' },
]

// Sample usage only
const tools = [
  { id: 'chatgpt', name: 'ChatGPT', prompts: 125, co2: '≈ 18 g', share: 89 },
  { id: 'gemini', name: 'Gemini', prompts: 16, co2: '≈ 2 g', share: 11 },
]

const trend = [
  { day: 'Mon', co2: 4 },
  { day: 'Tue', co2: 7 },
  { day: 'Wed', co2: 5 },
  { day: 'Thu', co2: 9 },
  { day: 'Fri', co2: 6 },
  { day: 'Sat', co2: 3 },
  { day: 'Sun', co2: 8 },
]

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      {children}
    </section>
  )
}

export default function Preview() {
  const [range, setRange] = useState('7d')
  const [dark, setDark] = useState(false)

  // Untitled UI switches to dark mode with a "dark-mode" class on the page root
  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', dark)
    return () => document.documentElement.classList.remove('dark-mode')
  }, [dark])

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-display-xs font-semibold text-primary">Design system preview</h1>
          <p className="text-md text-tertiary">Untitled UI components in Ecobex green. Sample data only.</p>
        </div>
        <Toggle label="Dark mode" isSelected={dark} onChange={setDark} />
      </div>

      <Section title="Buttons and badges">
        <div className="flex flex-wrap items-center gap-3">
          <Button color="primary">Offset your impact</Button>
          <Button color="secondary">See how we calculate</Button>
          <Button color="tertiary">Skip</Button>
          <Button color="primary" isDisabled>Disabled</Button>
          <Badge color="success" size="md">Low</Badge>
          <Badge color="warning" size="md">Medium</Badge>
          <Badge color="brand" size="md">Estimate</Badge>
          <Badge color="gray" size="md">Not estimated yet</Badge>
        </div>
      </Section>

      <Section title="Icons and progress">
        <div className="flex flex-wrap items-center gap-6">
          <FeaturedIcon icon={Cloud01} color="brand" theme="light" size="lg" />
          <FeaturedIcon icon={Zap} color="warning" theme="light" size="lg" />
          <FeaturedIcon icon={Droplets01} color="gray" theme="light" size="lg" />
          <div className="w-72">
            <ProgressBar value={40} />
          </div>
        </div>
      </Section>

      <Section title="Form controls">
        <div className="grid max-w-3xl gap-6 md:grid-cols-2">
          <Input label="First name" placeholder="Tooba" hint="Saved only in your browser." />
          <div className="flex flex-col gap-4">
            <Checkbox label="Track AI chats" hint="ChatGPT, Gemini, Claude" defaultSelected />
            <RadioGroup aria-label="Goal" defaultValue="reduce">
              <RadioButton value="reduce" label="Reduce my footprint" />
              <RadioButton value="offset" label="Offset what I can't reduce" />
            </RadioGroup>
          </div>
        </div>
      </Section>

      <Section title="Time-range tabs">
        <Tabs selectedKey={range} onSelectionChange={(key) => setRange(String(key))} className="w-max max-w-full">
          <Tabs.List type="button-brand" items={ranges}>
            {(tab) => <Tabs.Item {...tab} />}
          </Tabs.List>
        </Tabs>
      </Section>

      <Section title="Tracked tools table">
        <TableCard.Root>
          <TableCard.Header title="Tracked AI tools" badge="Sample" />
          <Table aria-label="Tracked AI tools">
            <Table.Header>
              <Table.Head id="name" label="Tool" isRowHeader />
              <Table.Head id="prompts" label="Prompts" />
              <Table.Head id="co2" label="CO₂e (estimate)" />
              <Table.Head id="share" label="Share" />
            </Table.Header>
            <Table.Body items={tools}>
              {(tool) => (
                <Table.Row id={tool.id}>
                  <Table.Cell className="font-medium text-primary">{tool.name}</Table.Cell>
                  <Table.Cell>{tool.prompts}</Table.Cell>
                  <Table.Cell>{tool.co2}</Table.Cell>
                  <Table.Cell>
                    <div className="w-40">
                      <ProgressBar value={tool.share} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </TableCard.Root>
      </Section>

      <Section title="Chart">
        <div className="h-64 w-full rounded-xl border border-secondary bg-primary p-4 shadow-xs">
          <ResponsiveContainer>
            <AreaChart data={trend} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border-secondary)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<ChartTooltipContent />} />
              <Area dataKey="co2" name="CO₂e (g, estimate)" stroke="var(--color-brand-600)" fill="var(--color-brand-100)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>
    </div>
  )
}
