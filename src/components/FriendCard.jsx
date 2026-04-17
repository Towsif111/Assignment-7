import { Link } from 'react-router-dom'

export default function FriendCard({ friend }) {
  const statusClassMap = {
    overdue: 'bg-rose-500 text-white',
    'almost due': 'bg-amber-500 text-white',
    'almost-due': 'bg-amber-500 text-white',
    'on track': 'bg-emerald-700 text-white',
    'on-track': 'bg-emerald-700 text-white',
  }

  const normalizedStatus = String(friend.status || '').toLowerCase().trim()
  const statusLabel = normalizedStatus.replace('-', ' ')
  const statusPillClass = statusClassMap[normalizedStatus] || 'bg-slate-500 text-white'
  const prettyStatus = statusLabel
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <Link
      to={`/friends/${friend.id}`}
      className="block rounded-lg border border-slate-200 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="mx-auto h-16 w-16 rounded-full object-cover"
        loading="lazy"
      />

      <p className="mt-3 text-lg font-semibold leading-tight text-slate-800">{friend.name}</p>
      <p className="mt-1 text-xs text-slate-400">{friend.days_since_contact}d ago</p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
        {(friend.tags || []).map((tag) => (
          <span
            key={`${friend.id}-${tag}`}
            className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-2">
        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusPillClass}`}>
          {statusLabel === 'on track'
            ? 'On-Track'
            : prettyStatus}
        </span>
      </div>
    </Link>
  )
}