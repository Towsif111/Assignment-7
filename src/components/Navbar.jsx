import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/stats', label: 'Stats' },
]

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex w-full max-w-450 items-center justify-between px-8 py-5 sm:px-12 lg:px-20">
        <div className="text-5xl font-bold tracking-tight [zoom:0.42] sm:[zoom:0.52]">
          <span className="text-slate-900">Keen</span>
          <span className="text-emerald-700">Keeper</span>
        </div>

        <ul className="flex items-center gap-2 sm:gap-3">
          {navItems.map(({ to, label }) => {
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-lg px-5 py-3 text-2xl font-semibold [zoom:0.5] transition ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-900'
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
