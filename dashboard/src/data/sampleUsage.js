// SAMPLE DATA, NOT REAL TRACKING.
// Made-up daily usage that stands in for what the Ecobex extension will measure later.
// It is generated the same way every time, so the dashboard looks the same on every visit.

const DAYS = 60 // enough history to compare "last 30 days" with the 30 before

const STREAMING_SITES = [
  { domain: 'youtube.com', share: 0.55 },
  { domain: 'netflix.com', share: 0.35 },
  { domain: 'twitch.tv', share: 0.1 },
]

const AI_TOOLS = [
  { id: 'chatgpt', name: 'ChatGPT', domain: 'chatgpt.com', share: 0.62 },
  { id: 'gemini', name: 'Gemini', domain: 'gemini.google.com', share: 0.23 },
  { id: 'claude', name: 'Claude', domain: 'claude.ai', share: 0.15 },
]

// A small repeatable "random" number between 0 and 1, so the sample never changes
function wobble(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function dayKey(date) {
  return date.toISOString().slice(0, 10)
}

// One entry per day, oldest first: { date, streamingHours, aiPrompts, sites: { domain: minutes } }
function buildDays() {
  const days = []
  const today = new Date()
  for (let i = DAYS - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const weekend = date.getDay() === 0 || date.getDay() === 6
    // Usage drifts down slightly over time, so "vs previous period" shows a change
    const drift = 1 + i * 0.004

    const streamingHours = Math.round((weekend ? 2.6 : 1.4) * (0.7 + wobble(i) * 0.6) * drift * 10) / 10
    const aiPrompts = Math.round((weekend ? 8 : 22) * (0.6 + wobble(i + 100) * 0.8) * drift)

    const sites = {}
    STREAMING_SITES.forEach((site) => {
      sites[site.domain] = Math.round(streamingHours * 60 * site.share)
    })
    const aiByTool = {}
    AI_TOOLS.forEach((tool) => {
      aiByTool[tool.id] = Math.round(aiPrompts * tool.share)
    })

    days.push({ date: dayKey(date), streamingHours, aiPrompts, aiByTool, sites })
  }
  return days
}

export const SAMPLE_DAYS = buildDays()
export { AI_TOOLS, STREAMING_SITES }
