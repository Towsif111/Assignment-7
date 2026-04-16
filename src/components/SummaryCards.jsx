export default function SummaryCards({ cards }) {
	return (
		<section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{cards.map((card) => (
				<article
					key={card.label}
					className="rounded-lg border border-slate-200 bg-white px-5 py-6 text-center shadow-sm"
				>
					<p className="text-4xl font-black leading-none text-emerald-900">{card.value}</p>
					<p className="mt-2 text-sm text-slate-500">
						{card.label}
					</p>
				</article>
			))}
		</section>
	)
}
