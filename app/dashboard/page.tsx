import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-16">
      <div className="container space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Student dashboard</p>
              <h1 className="text-3xl font-semibold text-white">Your CampusVault workspace</h1>
            </div>
            <Link href="/marketplace" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-purple-400/40">
              Browse resources
            </Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-purple-200/80">Recent orders</p>
              <p className="mt-4 text-3xl font-semibold text-white">0</p>
              <p className="mt-2 text-sm text-slate-400">Your purchased resources will appear here after payment.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-purple-200/80">Custom requests</p>
              <p className="mt-4 text-3xl font-semibold text-white">1</p>
              <p className="mt-2 text-sm text-slate-400">Track manuals or handwritten record requests from admin.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-purple-200/80">Payment status</p>
              <p className="mt-4 text-3xl font-semibold text-white">Pending</p>
              <p className="mt-2 text-sm text-slate-400">Upload your UPI screenshot once the payment is complete.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Upload payment screenshot</h2>
            <p className="mt-3 text-slate-300">After paying via the UPI flow, send your screenshot to admin to get access to the purchased content.</p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-purple-200/80">Upload link</p>
              <p className="mt-3 text-lg font-medium text-white">Coming soon</p>
              <p className="mt-2 text-slate-400">This placeholder will become a direct upload area in the next version.</p>
            </div>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Account actions</h2>
            <div className="mt-6 space-y-4">
              <button className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-4 text-sm font-semibold text-white transition hover:brightness-110">
                View latest notes
              </button>
              <button className="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-4 text-sm font-semibold text-white transition hover:border-purple-400/40">
                Contact admin
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
