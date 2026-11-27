import { useLocation, useNavigate } from 'react-router'
import { LogOut01 } from '@untitledui/icons'
import { NavItemBase } from '@/components/application/app-navigation/base-components/nav-item'
import { Avatar } from '@/components/base/avatar/avatar'
import { ButtonUtility } from '@/components/base/buttons/button-utility'
import { loadOnboarding, saveOnboarding } from '../../modules/onboarding/onboardingStore.js'
import { NAV_GROUPS } from './navItems.js'

function initials(name = '') {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// The sidebar's contents: logo, grouped tabs, and the signed-in person at the bottom.
// Used both in the desktop sidebar and inside the mobile menu.
export default function SideNav({ showLogo = true }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { account } = loadOnboarding()

  function signOut() {
    // Demo sign-out: keeps the data in this browser and asks for the email next time
    saveOnboarding({ signedIn: false })
    navigate('/sign-in')
  }

  return (
    <div className="flex h-full flex-col bg-primary pt-5">
      {showLogo && <p className="mb-6 px-5 font-display text-xl font-semibold text-brand-secondary">Ecobex</p>}

      <nav aria-label="Main" className="flex flex-col gap-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-5 pb-1 text-xs font-bold text-quaternary uppercase">{group.label}</p>
            <ul className="px-3">
              {group.items.map((item) => (
                <li key={item.href} className="py-0.5">
                  <NavItemBase type="link" href={item.href} icon={item.icon} current={pathname.startsWith(item.href)}>
                    {item.label}
                  </NavItemBase>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {account && (
        <div className="mt-auto flex items-center gap-3 border-t border-secondary px-4 py-4">
          <Avatar size="sm" initials={initials(account.name)} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-primary">{account.name}</p>
            <p className="truncate text-xs text-tertiary">{account.email}</p>
          </div>
          <ButtonUtility size="xs" color="tertiary" tooltip="Sign out" icon={LogOut01} onPress={signOut} />
        </div>
      )}
    </div>
  )
}
