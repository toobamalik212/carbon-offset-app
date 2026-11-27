// Formats estimates for people: picks a sensible unit and rounds, so "1834.2 g" reads "1.8 kg".

function round(value) {
  if (value >= 100) return Math.round(value).toLocaleString()
  if (value >= 10) return value.toFixed(1)
  return value.toFixed(2)
}

// grams → g or kg, millilitres → mL or L, watt-hours → Wh or kWh
const UNITS = {
  g: { big: 'kg', factor: 1000 },
  mL: { big: 'L', factor: 1000 },
  Wh: { big: 'kWh', factor: 1000 },
}

// Picks one unit for a whole range, based on the central value, so low and high match it
export function formatRange(range, unit) {
  const { big, factor } = UNITS[unit]
  const useBig = range.central >= factor
  const divide = useBig ? factor : 1
  return {
    central: round(range.central / divide),
    low: round(range.low / divide),
    high: round(range.high / divide),
    unit: useBig ? big : unit,
  }
}

// "+12%" / "−8%" against the previous period, or null when there is nothing to compare with
export function percentChange(now, before) {
  if (!before) return null
  return Math.round(((now - before) / before) * 100)
}
