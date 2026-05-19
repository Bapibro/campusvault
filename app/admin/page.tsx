import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-16">
      <div className="container space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Admin dashboard</p>
              <h1 className="text-3xl font-semibold text-white">Manage resources and orders</h1>
            </div>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-purple-400/40">
              Student view
            </Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-purple-200/80">Pending approvals</p>
              <p className="mt-4 text-3xl font-semibold text-white">2</p>
              <p className="mt-2 text-slate-400">Approve uploads and send access details manually.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-purple-200/80">Custom requests</p>
              <p className="mt-4 text-3xl font-semibold text-white">4</p>
              <p className="mt-2 text-slate-400">Track lab manual and handwritten request volumes.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-purple-200/80">Revenue to confirm</p>
              <p className="mt-4 text-3xl font-semibold text-white">₹1,248</p>
              <p className="mt-2 text-slate-400">Mark payments complete after screenshot verification.</p>
            </div>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Resource management</h2>
            <p className="mt-3 text-slate-300">Upload and edit marketplace items from a clean admin view. Each item can include notes, PYQs, assignments, or lab manuals.</p>
          </section>
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Order approvals</h2>
            <p className="mt-3 text-slate-300">Review payment screenshots, approve orders, and provide access links manually.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
