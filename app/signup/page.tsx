import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-20">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-card backdrop-blur-xl">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Join CampusVault</p>
            <h1 className="text-4xl font-semibold text-white">Create your student account</h1>
            <p className="text-slate-300">Sign up to browse resources, request custom manuals, and manage payments.</p>
          </div>
          <form className="space-y-6">
            <label className="block">
              <span className="text-sm text-slate-300">Full Name</span>
              <input type="text" placeholder="Your name" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-purple-400/60" />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Email</span>
              <input type="email" placeholder="you@example.com" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-purple-400/60" />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Password</span>
              <input type="password" placeholder="Create a password" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-purple-400/60" />
            </label>
            <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-4 text-sm font-semibold text-white transition hover:brightness-110">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-purple-200 hover:text-purple-100">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
