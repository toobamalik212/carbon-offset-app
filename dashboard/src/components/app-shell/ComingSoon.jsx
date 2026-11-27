// A placeholder for a tab whose module isn't built yet
export default function ComingSoon({ title, description, flow }) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-display-xs font-semibold text-primary">{title}</h1>
      <div className="rounded-2xl border border-dashed border-primary bg-primary p-10 text-center">
        <p className="text-md font-semibold text-primary">Coming next</p>
        <p className="mt-1 text-sm text-tertiary">{description}</p>
        <p className="mt-3 text-xs text-quaternary">Flow {flow} in docs/flows.md</p>
      </div>
    </div>
  )
}
