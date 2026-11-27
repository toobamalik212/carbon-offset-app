// Turns usage (streaming hours, AI prompts) into CO₂, water and energy, using only the
// figures in data/factors.js. Every result is a range: { low, central, high }.
// Anything factors.js has no figure for is left out and reported as "not estimated yet".
import { AI_PROMPT, GRID, STREAMING } from '../data/factors.js'

function add(a, b) {
  return { low: a.low + b.low, central: a.central + b.central, high: a.high + b.high }
}

function scale(range, by) {
  return { low: range.low * by, central: range.central * by, high: range.high * by }
}

// AI prompts: energy and water come from AI_PROMPT; CO₂ is energy times the world grid figure
export function aiFootprint(prompts) {
  const energyWh = scale(AI_PROMPT.energyWh, prompts)
  return {
    energyWh,
    gCO2: scale(energyWh, GRID.world.gCO2PerKWh / 1000),
    waterMl: scale(AI_PROMPT.waterMl, prompts),
  }
}

// Streaming: only CO₂ is sourced. Energy and water per hour are not estimated yet.
export function streamingFootprint(hours) {
  return { gCO2: scale(STREAMING.gCO2, hours), energyWh: null, waterMl: null }
}

// Adds up a list of days (from sampleUsage.js) for the habits the person tracks
export function totalFootprint(days, habits = { streaming: true, aiChats: true }) {
  const usage = {
    streamingHours: habits.streaming ? days.reduce((sum, d) => sum + d.streamingHours, 0) : 0,
    aiPrompts: habits.aiChats ? days.reduce((sum, d) => sum + d.aiPrompts, 0) : 0,
  }
  const ai = aiFootprint(usage.aiPrompts)
  const streaming = streamingFootprint(usage.streamingHours)

  return {
    usage,
    byCategory: { streaming: streaming.gCO2, aiChats: ai.gCO2 },
    gCO2: add(streaming.gCO2, ai.gCO2),
    // Water and energy cover AI chats only, because streaming has no sourced figure for them
    waterMl: ai.waterMl,
    energyWh: ai.energyWh,
  }
}
