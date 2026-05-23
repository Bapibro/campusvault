'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import qrCode from '@/public/assets/images/upi_qr_code.png';

export default function UPIPaymentPanel() {
  return (
    <motion.div
      className="card-border rounded-[2rem] border border-purple-400/20 bg-white/5 p-8 shadow-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-6 rounded-3xl border border-purple-500/50 bg-slate-900/60 p-6 text-center shadow-glow">
        <div className="relative mx-auto mb-4 h-44 w-44 rounded-3xl border border-purple-500/50 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/10 p-2 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          <Image
            src={qrCode}
            alt="Paytm UPI QR Code for Mr Saurabh Bhola Mukherjee"
            className="h-full w-full rounded-2xl object-cover"
            priority
          />
        </div>
        <p className="text-sm uppercase tracking-[0.2em] text-purple-200/70">Mr Saurabh Bhola Mukherjee</p>
        <p className="mt-2 text-lg font-semibold text-white">Scan & Pay Securely</p>
      </div>
      <div className="space-y-4 text-sm text-slate-300">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-200/70">UPI ID</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="font-medium text-white">8261814191@pthdfc</p>
            <button
              onClick={() => navigator.clipboard.writeText('8261814191@pthdfc')}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-purple-400/40 hover:text-purple-100"
            >
              Copy
            </button>
          </div>
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
