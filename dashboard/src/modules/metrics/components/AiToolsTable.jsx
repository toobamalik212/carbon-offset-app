import { Table, TableCard } from '@/components/application/table/table'
import { formatRange } from '../../../lib/format.js'

// AI chats split by tool, like Offset AI's "Tracked AI tools" table
export default function AiToolsTable({ tools }) {
  if (tools.length === 0) return null

  return (
    <TableCard.Root>
      <TableCard.Header title="AI tools" badge="Sample" />
      <Table aria-label="AI tools">
        <Table.Header>
          <Table.Head id="name" label="Tool" isRowHeader />
          <Table.Head id="prompts" label="Prompts" />
          <Table.Head id="co2" label="CO₂ (estimate)" />
          <Table.Head id="water" label="Water (estimate)" />
        </Table.Header>
        <Table.Body items={tools}>
          {(tool) => {
            const co2 = formatRange(tool.gCO2, 'g')
            const water = formatRange(tool.waterMl, 'mL')
            return (
              <Table.Row id={tool.id}>
                <Table.Cell className="font-medium text-primary">{tool.name}</Table.Cell>
                <Table.Cell>{tool.prompts}</Table.Cell>
                <Table.Cell>
                  ≈ {co2.central} {co2.unit}
                </Table.Cell>
                <Table.Cell>
                  ≈ {water.central} {water.unit}
                </Table.Cell>
              </Table.Row>
            )
          }}
        </Table.Body>
      </Table>
    </TableCard.Root>
  )
}
