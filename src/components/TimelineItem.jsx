import callIcon from '../assets/call.png'
import textIcon from '../assets/text.png'
import videoIcon from '../assets/video.png'

function formatDate(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function capitalize(word) {
  return String(word || '')
    .split(' ')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ')
}

const interactionMeta = {
  call: { icon: callIcon, label: 'Call' },
  text: { icon: textIcon, label: 'Text' },
  video: { icon: videoIcon, label: 'Video' },
}

export default function TimelineItem({ entry }) {
  const type = String(entry.type || '').toLowerCase()
  const meta = interactionMeta[type] || { icon: textIcon, label: capitalize(type || 'Interaction') }
  const friendName = entry.friendName || 'Unknown Friend'

  return (
    <article className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-start gap-3">
        <img src={meta.icon} alt="" aria-hidden="true" className="mt-0.5 h-7 w-7 object-contain" />

        <div>
          <p className="text-sm font-semibold text-slate-700">
            {meta.label} <span className="font-medium text-slate-500">with {friendName}</span>
          </p>
          <p className="text-xs font-semibold text-slate-400">{formatDate(entry.date)}</p>
        </div>
      </div>
    </article>
  )
}
