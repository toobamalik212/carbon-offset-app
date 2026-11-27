import { BarChartSquare02, HeartHand, Settings01, Trophy01 } from '@untitledui/icons'

// The side navigation. "Main" holds the jobs; "Account" holds utilities like Settings,
// kept apart so they don't compete with the jobs (docs/flows.md, navigation decision).
// Add a new tab here when its module is built.
export const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: BarChartSquare02 },
      { label: 'Contribute', href: '/contribute', icon: HeartHand },
      { label: 'Leaderboard', href: '/leaderboard', icon: Trophy01 },
    ],
  },
  {
    label: 'Account',
    items: [{ label: 'Settings', href: '/settings', icon: Settings01 }],
  },
]
