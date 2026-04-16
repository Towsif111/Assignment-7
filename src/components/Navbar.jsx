import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/stats', label: 'Stats' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-lg font-bold tracking-tight text-slate-900">KeenKeeper</div>

        <ul className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ to, label }) => {
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
