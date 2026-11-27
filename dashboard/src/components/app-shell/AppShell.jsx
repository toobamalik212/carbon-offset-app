import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { Menu02, XClose } from '@untitledui/icons'
import { ButtonUtility } from '@/components/base/buttons/button-utility'
import { loadOnboarding } from '../../modules/onboarding/onboardingStore.js'
import SideNav from './SideNav.jsx'

// The frame around every dashboard tab: a fixed sidebar on wide screens,
// a top bar with a menu button on small ones. Each tab renders inside <Outlet />.
export default function AppShell() {
  const { pathname } = useLocation()
  // The menu stays open only on the page it was opened on, so picking a tab closes it
  const [menuOpenOn, setMenuOpenOn] = useState(null)
  const menuOpen = menuOpenOn === pathname

  // Only signed-in people who finished onboarding see the dashboard
  const state = loadOnboarding()
  if (!state.complete || !state.signedIn) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-secondary lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-68 shrink-0 border-r border-secondary lg:sticky lg:top-0 lg:block lg:h-screen">
        <SideNav />
      </aside>

      {/* Mobile top bar and menu */}
      <header className="flex items-center justify-between border-b border-secondary bg-primary px-4 py-3 lg:hidden">
        <span className="font-display text-lg font-semibold text-brand-secondary">Ecobex</span>
        <ButtonUtility
          size="sm"
          color="tertiary"
          tooltip={menuOpen ? 'Close menu' : 'Open menu'}
          icon={menuOpen ? XClose : Menu02}
          onPress={() => setMenuOpenOn(menuOpen ? null : pathname)}
        />
      </header>
      {menuOpen && (
        <div className="border-b border-secondary lg:hidden">
          <SideNav showLogo={false} />
        </div>
      )}

      <main className="min-w-0 flex-1 px-4 py-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
