import { Link, NavLink } from 'react-router'

const links = [
  { to: '/calculator', label: 'Calculator' },
  { to: '/results', label: 'Results' },
  { to: '/how-we-calculate', label: 'How we calculate' },
]

export default function Header() {
  return (
    <header className="border-b border-emerald-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link className="text-xl font-bold tracking-tight text-emerald-700" to="/">
          Ecobex
        </Link>

        <nav className="flex flex-wrap gap-1">
          {links.map((link) => (
            // NavLink knows when its page is open, so we can highlight it
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700'
                  : 'rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
