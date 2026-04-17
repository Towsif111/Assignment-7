import { useMemo, useState } from 'react'
import TimelineItem from '../components/TimelineItem'
import { useTimeline } from '../context/TimelineContext'

const filterOptions = [
	{ value: 'all', label: 'All Interactions' },
	{ value: 'call', label: 'Call' },
	{ value: 'text', label: 'Text' },
	{ value: 'video', label: 'Video' },
]

export default function TimelinePage() {
	const [filter, setFilter] = useState('all')
	const { entries } = useTimeline()

	const visibleEntries = useMemo(() => {
		const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date))

		if (filter === 'all') {
			return sorted
		}

		return sorted.filter((entry) => entry.type === filter)
	}, [entries, filter])

	return (
		<section className="mx-auto w-full max-w-3xl">
			<div>
				<h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Timeline</h1>

				<label className="mt-8 block w-full max-w-95 text-sm font-semibold text-slate-700">
					<select
						value={filter}
						onChange={(event) => setFilter(event.target.value)}
						className="mt-2 block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 shadow-sm outline-none"
					>
						{filterOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</label>
			</div>

			<div className="mt-8 space-y-3">
				{visibleEntries.length === 0 ? (
					<article className="rounded-xl border border-slate-200 bg-white px-5 py-6 text-center text-sm text-slate-500 shadow-sm">
						No entries found for this filter yet.
					</article>
				) : (
					visibleEntries.map((entry) => <TimelineItem key={entry.id} entry={entry} />)
				)}
			</div>
		</section>
	)
}
