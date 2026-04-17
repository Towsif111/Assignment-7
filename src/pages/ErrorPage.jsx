import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Error Page</h1>
      <p className="mt-3 max-w-xl text-base text-slate-500">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Back to Home
      </Link>
    </section>
  )
}