'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import AnimatedHoverCard from '@/components/AnimatedHoverCard';
import { auth, db } from '@/lib/firebase';

type PurchaseRecord = {
  id: string;
  title: string;
  subject: string;
  semester: string;
  price: string;
  badge: string;
  preview: string;
  purchasedAt?: { toDate?: () => Date } | null;
  openUrl?: string;
  downloadUrl?: string;
};

const getFormattedDate = (value?: { toDate?: () => Date } | null) => {
  if (!value) {
    return 'Just now';
  }

  if (typeof value.toDate === 'function') {
    const date = value.toDate();
    if (!date || Number.isNaN(date.getTime())) {
      return 'Just now';
    }

    return date.toLocaleString();
  }

  return 'Just now';
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribePurchases: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
      setIsLoading(false);

      if (unsubscribePurchases) {
        unsubscribePurchases();
      }

      if (!currentUser) {
        setPurchases([]);
        return;
      }

      const purchasesQuery = query(
        collection(db, 'users', currentUser.uid, 'purchases'),
        orderBy('purchasedAt', 'desc')
      );

      unsubscribePurchases = onSnapshot(
        purchasesQuery,
        (snapshot) => {
          setPurchases(
            snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...(docSnap.data() as Omit<PurchaseRecord, 'id'>),
            }))
          );
        },
        () => {
          setPurchases([]);
        }
      );
    });

    return () => {
      if (unsubscribePurchases) {
        unsubscribePurchases();
      }
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (authChecked && !user) {
      router.push('/login');
    }
  }, [authChecked, router, user]);

  const handleOpenPurchase = (purchase: PurchaseRecord) => {
    const url = purchase.downloadUrl || purchase.openUrl || '/marketplace';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!authChecked || isLoading) {
    return (
      <main className="min-h-screen bg-surface px-6 py-16">
        <div className="container flex min-h-[50vh] items-center justify-center">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 px-8 py-6 text-white shadow-card backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Loading your dashboard...
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-16 sm:px-6">
      <div className="container space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Your Purchases</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Your CampusVault purchases</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                Track your saved resources with real-time updates, review purchase details, and open the resource when you are ready.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-purple-400/40"
              >
                Browse resources
              </Link>
              <Link
                href="/payment"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Payment guide
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-purple-200/80">Purchased notes</p>
              <p className="mt-4 text-3xl font-semibold text-white">{purchases.length}</p>
              <p className="mt-2 text-sm text-slate-300">Live count from your Firestore purchases.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-purple-200/80">Latest subject</p>
              <p className="mt-4 text-lg font-semibold text-white">
                {purchases[0]?.subject || 'No purchases yet'}
              </p>
              <p className="mt-2 text-sm text-slate-300">Your most recent resource category.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-purple-200/80">Account</p>
              <p className="mt-4 text-sm font-semibold text-white">{user.email || 'Signed in'}</p>
              <p className="mt-2 text-sm text-slate-300">Secure access is tied to your Firebase session.</p>
            </div>
          </div>
        </motion.section>

        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Saved resources</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Your purchase history</h2>
            </div>
            <p className="text-sm text-slate-300">Realtime updates are synced from Firestore.</p>
          </div>

          {purchases.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center shadow-card"
            >
              <p className="text-4xl">📚</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">No purchases yet</h3>
              <p className="mt-3 text-slate-300">Purchase a resource from the marketplace to see it appear here instantly.</p>
              <Link
                href="/marketplace"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Explore marketplace
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {purchases.map((purchase) => (
                <AnimatedHoverCard key={purchase.id} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-card">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-purple-200/70">{purchase.subject}</p>
                        <h3 className="mt-3 text-lg font-semibold text-white">{purchase.title}</h3>
                      </div>
                      <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs text-purple-100">
                        {purchase.badge}
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-slate-300">{purchase.preview}</p>

                    <div className="grid gap-3 text-sm sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
                        <p className="text-slate-400">Semester</p>
                        <p className="mt-1 font-semibold text-white">{purchase.semester}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
                        <p className="text-slate-400">Price</p>
                        <p className="mt-1 font-semibold text-white">{purchase.price}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
                      <p className="text-slate-400">Purchased on</p>
                      <p className="mt-1 text-sm font-semibold text-white">{getFormattedDate(purchase.purchasedAt)}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPurchase(purchase)}
                      className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      {purchase.downloadUrl ? 'Download' : 'Open'}
                    </button>
                  </div>
                </AnimatedHoverCard>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
