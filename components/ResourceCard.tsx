'use client';

import { motion } from 'framer-motion';
import { Resource } from '@/lib/data';

export default function ResourceCard({
  resource,
  onBuy,
}: {
  resource: Resource;
  onBuy?: () => void;
}) {
  return (
    <motion.article
      className="card-border rounded-3xl border border-white/10 overflow-hidden bg-white/5 shadow-card transition hover:border-purple-400/40"
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 pb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/70">{resource.subject}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{resource.title}</h3>
          </div>
          <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs text-purple-100">{resource.badge}</span>
        </div>
        <p className="text-sm text-slate-300">{resource.preview}</p>
        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Semester</p>
            <p className="mt-1 text-sm font-medium text-white">{resource.semester}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Price</p>
            <p className="mt-1 text-xl font-semibold text-white">{resource.price}</p>
          </div>
        </div>
      </div>
      <motion.button
        type="button"
        onClick={onBuy}
        className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Buy Now
      </motion.button>
    </motion.article>
  );
}
