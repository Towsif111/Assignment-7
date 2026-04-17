import { Link } from 'react-router-dom'

const socialLinks = [
	{ iconClass: 'fa-brands fa-facebook', label: 'Facebook', href: '#' },
	{ iconClass: 'fa-brands fa-instagram', label: 'Instagram', href: '#' },
	{ iconClass: 'fa-brands fa-x-twitter', label: 'X', href: '#' },
]

export default function Footer() {
	return (
		<footer className="mt-10 bg-[#2c5d48] text-white">
			<div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center text-center">
					<h2 className="font-serif text-4xl font-bold leading-none tracking-tight sm:text-5xl lg:text-6xl">
						KeenKeeper
					</h2>
					<p className="mt-4 max-w-4xl text-xs leading-6 text-white/70 sm:text-sm">
						Your personal shelf of meaningful connections. Browse, tend, and nurture the
						relationships that matter most.
					</p>

					<div className="mt-8">
						<p className="text-base font-medium text-white/95">Social Links</p>
						<div className="mt-4 flex items-center justify-center gap-3">
							{socialLinks.map((social) => {
								return (
									<a
										key={social.label}
										href={social.href}
										aria-label={social.label}
										className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-transform duration-200 hover:-translate-y-0.5"
									>
										<i className={`${social.iconClass} text-base`} aria-hidden="true"></i>
									</a>
								)
							})}
						</div>
					</div>
				</div>

				<div className="mt-10 border-t border-white/10 pt-6 text-xs sm:text-sm text-white/45">
					<div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
						<span>© 2026 KeenKeeper. All rights reserved.</span>
						<div className="flex flex-wrap items-center justify-center gap-6">
							<Link to="#" className="transition hover:text-white/75">
								Privacy Policy
							</Link>
							<Link to="#" className="transition hover:text-white/75">
								Terms of Service
							</Link>
							<Link to="#" className="transition hover:text-white/75">
								Cookies
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
