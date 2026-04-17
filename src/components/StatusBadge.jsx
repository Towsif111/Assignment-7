function normalizeStatus(status) {
  return String(status || '').trim().toLowerCase().replace('-', ' ')
}

export default function StatusBadge({ status }) {
  const normalized = normalizeStatus(status)

  const map = {
    overdue: 'bg-rose-500 text-white',
    'almost due': 'bg-amber-500 text-white',
    'on track': 'bg-emerald-700 text-white',
  }

  const label =
    normalized === 'on track'
      ? 'On-Track'
      : normalized
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${map[normalized] || 'bg-slate-500 text-white'}`}>
      {label}
    </span>
  )
}