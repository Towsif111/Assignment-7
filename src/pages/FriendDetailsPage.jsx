import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import fallbackAvatar from '../assets/logo.png'
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
	const [toasts, setToasts] = useState([])
	const toastTimers = useRef([])
	const toastIdCounter = useRef(0)
	const { id } = useParams()
	const { getFriendById, loading } = useFriends()
	const { addInteraction } = useTimeline()

	useEffect(() => {
		return () => {
			toastTimers.current.forEach((timerId) => window.clearTimeout(timerId))
			toastTimers.current = []
		}
	}, [])

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

		const label = `${type[0].toUpperCase() + type.slice(1)} logged for ${friend.name}`
		const id = `${type}-${toastIdCounter.current += 1}`

		setToasts((currentToasts) => [...currentToasts, { id, label }])

		const timerId = window.setTimeout(() => {
			setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
		}, 2500)

		toastTimers.current.push(timerId)
	}

	return (
		<>
			<div className="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950 shadow-lg shadow-emerald-100"
					>
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
							<i className="fa-solid fa-check text-sm" aria-hidden="true"></i>
						</span>
						<p className="text-sm font-semibold">{toast.label}</p>
					</div>
				))}
			</div>

			<section className="grid gap-4 lg:grid-cols-[0.95fr_2fr]">
				<div className="space-y-4">
				<article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex flex-col items-center text-center">
						<img
							src={friend.picture || fallbackAvatar}
							alt={friend.name}
							className="h-20 w-20 rounded-full object-cover"
							onError={(event) => {
								event.currentTarget.onerror = null
								event.currentTarget.src = fallbackAvatar
							}}
						/>
						<h1 className="mt-3 text-xl font-bold text-slate-900">{friend.name}</h1>
						<div className="mt-2">
							<StatusBadge status={friend.status} />
						</div>
					</div>

					<div className="mt-3 flex flex-wrap justify-center gap-2">
						{friend.tags.map((tag) => (
							<span
								key={tag}
								className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase text-emerald-800"
							>
								{tag}
							</span>
						))}
					</div>

					<p className="mt-4 text-center text-sm italic leading-7 text-slate-500">"{friend.bio}"</p>
					<p className="mt-2 text-center text-sm text-slate-500">Preferred: email</p>
				</article>

				<button
					type="button"
					className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-xl font-semibold text-slate-700 shadow-sm"
				>
					<i className="fa-regular fa-bell" aria-hidden="true"></i>
					Snooze 2 Weeks
				</button>

				<button
					type="button"
					className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-xl font-semibold text-slate-700 shadow-sm"
				>
					<i className="fa-solid fa-box-archive" aria-hidden="true"></i>
					Archive
				</button>

				<button
					type="button"
					className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-3 text-xl font-semibold text-rose-500 shadow-sm"
				>
					<i className="fa-regular fa-trash-can" aria-hidden="true"></i>
					Delete
				</button>
			</div>

			<div className="space-y-4">
				<section className="grid gap-3 sm:grid-cols-3">
					<article className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
						<p className="text-3xl font-black text-emerald-900">{friend.days_since_contact}</p>
						<p className="mt-2 text-sm text-slate-500">Days Since Contact</p>
					</article>
					<article className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
						<p className="text-3xl font-black text-emerald-900">{friend.goal}</p>
						<p className="mt-2 text-sm text-slate-500">Goal (Days)</p>
					</article>
					<article className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
						<p className="text-2xl font-black text-emerald-900">{formatDueDate(friend.next_due_date)}</p>
						<p className="mt-2 text-sm text-slate-500">Next Due</p>
					</article>
				</section>

				<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold text-emerald-900">Relationship Goal</h2>
						<button
							type="button"
								className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
						>
							Edit
						</button>
					</div>
						<p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
						Connect every <span className="font-black text-slate-900">{friend.goal} days</span>
					</p>
				</section>

				<section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
						<h2 className="text-2xl font-bold text-emerald-900">Quick Check-In</h2>
					<div className="mt-4 grid gap-3 sm:grid-cols-3">
						<button
							type="button"
							onClick={() => handleCheckIn('call')}
								className="inline-flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
						>
									<i className="fa-solid fa-phone-volume text-lg" aria-hidden="true"></i>
							<span>Call</span>
						</button>
						<button
							type="button"
							onClick={() => handleCheckIn('text')}
								className="inline-flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
						>
									<i className="fa-regular fa-message text-lg" aria-hidden="true"></i>
							<span>Text</span>
						</button>
						<button
							type="button"
							onClick={() => handleCheckIn('video')}
								className="inline-flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
						>
									<i className="fa-solid fa-video text-lg" aria-hidden="true"></i>
							<span>Video</span>
						</button>
					</div>
				</section>
			</div>
			</section>
		</>
	)
}
