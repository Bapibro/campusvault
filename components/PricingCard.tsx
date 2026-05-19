'use client';

import { motion } from 'framer-motion';

export default function PricingCard({
  title,
  price,
  description,
  features,
  featured,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <motion.div
      className={`card-border rounded-[2rem] border p-8 shadow-card bg-white/5 transition ${featured ? 'border-purple-400/30 bg-purple-500/10' : 'border-slate-700/70'}`}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-purple-200/70">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{price}</p>
        </div>
        {featured ? (
          <motion.span
            className="rounded-full bg-violet-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-100"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Featured
          </motion.span>
        ) : null}
      </div>
      <p className="mt-6 text-sm leading-6 text-slate-300">{description}</p>
      <ul className="mt-8 space-y-3 text-sm text-slate-300">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/15 text-purple-100">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <motion.button
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
        whileTap={{ scale: 0.98 }}
      >
        Start Now
      </motion.button>
    </motion.div>
  );
}

