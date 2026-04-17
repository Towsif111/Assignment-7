import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', iconClass: 'fa-solid fa-house' },
  { to: '/timeline', label: 'Timeline', iconClass: 'fa-regular fa-clock' },
  { to: '/stats', label: 'Stats', iconClass: 'fa-solid fa-chart-line' },
]

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex w-full max-w-450 items-center justify-between px-8 py-5 sm:px-12 lg:px-20">
        <div className="text-3xl font-bold tracking-tight">
          <span className="text-slate-900">Keen</span>
          <span className="text-emerald-700">Keeper</span>
        </div>

        <ul className="flex items-center gap-2 sm:gap-3">
          {navItems.map(({ to, label, iconClass }) => {
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-base font-semibold transition ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-900'
                    }`
                  }
                >
                  <i className={`${iconClass} text-sm`} aria-hidden="true"></i>
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
