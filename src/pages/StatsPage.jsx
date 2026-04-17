import { useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { useTimeline } from '../context/TimelineContext'

const chartColors = {
	text: '#7c3aed',
	call: '#355e55',
	video: '#34a853',
}

const interactionLabels = {
	text: 'Text',
	call: 'Call',
	video: 'Video',
}

export default function StatsPage() {
	const { entries } = useTimeline()

	const chartData = useMemo(() => {
		const counts = {
			text: 0,
			call: 0,
			video: 0,
		}

		entries.forEach((entry) => {
			const type = String(entry.type || '').toLowerCase()
			if (type in counts) {
				counts[type] += 1
			}
		})

		return Object.entries(counts).map(([key, value]) => ({
			name: interactionLabels[key],
			value,
			fill: chartColors[key],
		}))
	}, [entries])

	const hasData = chartData.some((item) => item.value > 0)

	return (
		<section className="mx-auto w-full max-w-6xl">
			<h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
				Friendship Analytics
			</h1>

			<div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:px-8 sm:py-6">
				<p className="text-base font-medium text-emerald-900 sm:text-lg">By Interaction Type</p>

				<div className="mt-6 flex min-h-80 items-center justify-center sm:min-h-90">
					{hasData ? (
						<PieChart width={460} height={340}>
							<Pie
								data={chartData}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								innerRadius={92}
								outerRadius={132}
								paddingAngle={6}
								cornerRadius={16}
							>
								{chartData.map((entry) => (
									<Cell key={entry.name} fill={entry.fill} stroke={entry.fill} />
								))}
							</Pie>
						</PieChart>
					) : (
						<div className="flex flex-col items-center justify-center text-center text-sm text-slate-500">
							<p>No timeline interactions yet.</p>
							<p className="mt-1">Log Call, Text, or Video from a friend details page.</p>
						</div>
					)}
				</div>

				<div className="mt-2 flex items-center justify-center gap-7 text-xs text-slate-500 sm:gap-8 sm:text-sm">
					{chartData.map((entry) => (
						<div key={entry.name} className="flex items-center gap-2">
							<span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
							<span>{entry.name}: {entry.value}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}