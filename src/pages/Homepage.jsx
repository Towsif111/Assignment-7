import { UserPlus } from 'lucide-react'
import FriendCard from '../components/FriendCard'
import Loader from '../components/Loader'
import SummaryCards from '../components/SummaryCards'
import { useFriends } from '../context/FriendsContext'
import { useTimeline } from '../context/TimelineContext'

function normalizeStatus(status) {
	return String(status || '').trim().toLowerCase().replace('-', ' ')
}

function getCurrentMonthInteractions(entries) {
	const now = new Date()

	return entries.filter((entry) => {
		const date = new Date(entry.date)
		return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
	}).length
}

export default function HomePage() {
	const { friends, loading, error } = useFriends()
	const { entries } = useTimeline()

	if (loading) {
		return <Loader />
	}

	if (error) {
		return (
			<div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-700">
				{error}
			</div>
		)
	}

	const summaryCards = [
		{ label: 'Total Friends', value: friends.length },
		{
			label: 'On Track',
			value: friends.filter((friend) => normalizeStatus(friend.status) === 'on track').length,
		},
		{
			label: 'Need Attention',
			value: friends.filter((friend) => normalizeStatus(friend.status) === 'overdue').length,
		},
		{ label: 'Interactions This Month', value: getCurrentMonthInteractions(entries) },
	]

	return (
		<section className="mx-auto w-full max-w-5xl space-y-8">
			<div className="px-4 py-10 text-center sm:px-8 sm:py-12">
				<h1 className="text-5xl font-bold tracking-tight text-slate-800 sm:text-6xl">
					Friends to keep close in your life
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-500">
					Your personal shelf of meaningful connections. Browse, tend, and nurture the
					relationships that matter most.
				</p>
				<button
					type="button"
					className="mt-7 inline-flex items-center gap-2 rounded bg-emerald-800 px-6 py-3 text-base font-semibold text-white shadow-md shadow-emerald-900/20 transition hover:bg-emerald-700"
				>
					<UserPlus size={18} />
					Add a Friend
				</button>
			</div>

			<SummaryCards cards={summaryCards} />

			<section className="border-t border-slate-200 pt-8">
				<h2 className="text-3xl font-bold text-slate-800">Your Friends</h2>

				<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{friends.map((friend) => (
						<FriendCard key={friend.id} friend={friend} />
					))}
				</div>
			</section>
		</section>
	)
}
