"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";

type FormState = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      setError("Please enter both your email and password.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful. Redirecting to the marketplace...");
      router.push("/marketplace");
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : "Unable to sign in. Please try again.";
      setError(message.replace("Firebase: Error (auth/", "").replace(")", ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface px-6 py-20">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-card backdrop-blur-xl">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Welcome back</p>
            <h1 className="text-4xl font-semibold text-white">Student login</h1>
            <p className="text-slate-300">Sign in to access your saved resources, payment status, and custom service requests.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm text-slate-300">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-purple-400/60"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => handleChange("password", event.target.value)}
                placeholder="Enter password"
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-purple-400/60"
              />
            </label>

            {error ? (
              <p className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                {success}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            New to CampusVault?{' '}
            <Link href="/signup" className="font-semibold text-purple-200 hover:text-purple-100">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
