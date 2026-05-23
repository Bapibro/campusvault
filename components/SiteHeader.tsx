'use client';

import { onAuthStateChanged, type User } from 'firebase/auth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { auth } from '@/lib/firebase';

const navItems = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Payment', href: '/payment' },
  { label: 'Login', href: '/login' },
  { label: 'Signup', href: '/signup' },
];

export default function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const dashboardHref = user ? '/dashboard' : '/login';

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/90 backdrop-blur-xl">
      <div className="container flex flex-wrap items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <motion.span
            animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
          />
          CampusVault
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          {navItems.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -1 }}>
              <Link
                href={item.href}
                className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ y: -1 }}>
            <Link
              href={dashboardHref}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-purple-400/40 hover:text-purple-100"
            >
              Your Purchases
            </Link>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
