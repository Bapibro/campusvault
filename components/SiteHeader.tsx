'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Payment', href: '/payment' },
  { label: 'Login', href: '/login' },
  { label: 'Signup', href: '/signup' },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/90 backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <motion.span
            animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
          />
          CampusVault
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -1 }}>
              <Link href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </header>
  );
}
