'use client';

import { motion } from 'framer-motion';

export default function UPIPaymentPanel() {
  return (
    <motion.div
      className="card-border rounded-[2rem] border border-purple-400/20 bg-white/5 p-8 shadow-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-center">
        <div className="mx-auto mb-4 h-44 w-44 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 p-6 shadow-glow">
          <motion.div
            className="h-full w-full rounded-2xl bg-white/90 bg-[radial-gradient(circle_at_center,_rgba(59,_130,_246,0.2),_transparent_45%)]"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-purple-200/70">UPI Payment</p>
        <p className="mt-2 text-lg font-semibold text-white">Scan QR to pay</p>
      </div>
      <div className="space-y-4 text-sm text-slate-300">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-200/70">UPI ID</p>
          <p className="mt-2 font-medium text-white">campusvault@upi</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-200/70">Amount</p>
          <p className="mt-2 font-medium text-white">Depends on selected resource</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-200/70">Next Step</p>
          <p className="mt-2 leading-6">After payment, upload your screenshot via the dashboard or WhatsApp, and admin will provide access manually.</p>
        </div>
      </div>
      <motion.button
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Payment Flow
      </motion.button>
    </motion.div>
  );
}
