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
      className="card-border relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-card"
      whileHover={{
        y: -8,
        scale: 1.012,
        boxShadow: '0 0 45px rgba(139, 92, 246, 0.2)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-fuchsia-500/10 to-violet-500/5" />
      <div className="relative p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 pb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200/70">{resource.subject}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{resource.title}</h3>
          </div>
          <motion.span
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-full bg-purple-500/15 px-3 py-1 text-xs text-purple-100"
          >
            {resource.badge}
          </motion.span>
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
        className="relative z-10 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(232, 121, 249, 0.3)' }}
        whileTap={{ scale: 0.98 }}
      >
        Buy Now
      </motion.button>
    </motion.article>
  );
}
