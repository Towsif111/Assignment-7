import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import StatusBadge from '../components/StatusBadge'
import { useFriends } from '../context/FriendsContext'
import { useTimeline } from '../context/TimelineContext'

function formatDueDate(dateString) {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

export default function FriendDetailsPage() {
	const { id } = useParams()
	const { getFriendById, loading } = useFriends()
	const { addInteraction } = useTimeline()

	if (loading) {
		return <Loader />
	}

	const friend = getFriendById(id)

	if (!friend) {
		return (
			<div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-700">
				Friend not found.
			</div>
		)
	}

	function handleCheckIn(type) {
		addInteraction(type, friend.name)
		window.alert(`${type[0].toUpperCase() + type.slice(1)} logged for ${friend.name}`)
	}

	return (
		<section className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
			<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
				<div className="flex flex-col items-center text-center">
					<img
						src={friend.picture}
						alt={friend.name}
						className="h-20 w-20 rounded-full object-cover ring-4 ring-emerald-100"
					/>
					<h1 className="mt-3 text-2xl font-bold text-slate-900">{friend.name}</h1>
					<div className="mt-2">
						<StatusBadge status={friend.status} />
					</div>
				</div>

				<div className="mt-5 flex flex-wrap gap-2">
					{friend.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
						>
							{tag}
						</span>
					))}
				</div>

				<p className="mt-4 text-sm text-slate-600">{friend.bio}</p>

				<p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-700">
					<span className="font-semibold text-emerald-700">Email:</span>
					{friend.email}
				</p>

				<div className="mt-6 grid gap-2 sm:grid-cols-3">
					<button
						type="button"
						className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
					>
						Snooze 2 Weeks
					</button>
					<button
						type="button"
						className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
					>
						Archive
					</button>
					<button
						type="button"
						className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700"
					>
						Delete
					</button>
				</div>
			</article>

			<div className="space-y-4">
				<section className="grid gap-3 sm:grid-cols-3">
					<article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
						<p className="text-2xl font-black text-slate-900">{friend.days_since_contact}</p>
						<p className="text-xs uppercase tracking-[0.14em] text-slate-500">Days Since Contact</p>
					</article>
					<article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
						<p className="text-2xl font-black text-slate-900">{friend.goal}</p>
						<p className="text-xs uppercase tracking-[0.14em] text-slate-500">Goal (Days)</p>
					</article>
					<article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
						<p className="text-lg font-black text-slate-900">{formatDueDate(friend.next_due_date)}</p>
						<p className="text-xs uppercase tracking-[0.14em] text-slate-500">Next Due Date</p>
					</article>
				</section>

				<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex items-center justify-between">
						<h2 className="text-base font-bold text-slate-900">Relationship Goal</h2>
						<button
							type="button"
							className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
						>
							Edit
						</button>
					</div>
					<p className="mt-3 text-sm text-slate-600">
						Reach out every {friend.goal} days to keep your connection with {friend.name} active and
						meaningful.
					</p>
				</section>

				<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<h2 className="text-base font-bold text-slate-900">Quick Check-In</h2>
					<div className="mt-4 grid gap-2 sm:grid-cols-3">
						<button
							type="button"
							onClick={() => handleCheckIn('call')}
							className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
						>
							Call
						</button>
						<button
							type="button"
							onClick={() => handleCheckIn('text')}
							className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
						>
							Text
						</button>
						<button
							type="button"
							onClick={() => handleCheckIn('video')}
							className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
						>
							Video
						</button>
					</div>
				</section>
			</div>
		</section>
	)
}
