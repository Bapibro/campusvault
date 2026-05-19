'use client';

import { useEffect, useState, type ChangeEvent, type DragEvent } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/Modal';
import type { Resource } from '@/lib/data';

export default function PurchaseModal({
  open,
  onClose,
  resource,
}: {
  open: boolean;
  onClose: () => void;
  resource: Resource | null;
}) {
  const [fileName, setFileName] = useState<string>('');
  const [status, setStatus] = useState<'form' | 'submitted'>('form');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!open) {
      setFileName('');
      setStatus('form');
      setDragActive(false);
    }
  }, [open]);

  if (!resource) return null;

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      handleFileSelect(event.target.files[0]);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files?.[0]) {
      handleFileSelect(event.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    setStatus('submitted');
  };

  return (
    <Modal open={open} onClose={onClose} title="UPI Payment Details">
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 text-center shadow-glow">
            <div className="mx-auto mb-4 h-40 w-40 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 p-6">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-slate-200">QR Code</div>
            </div>
            <p className="text-sm uppercase tracking-[0.18em] text-purple-200/80">UPI ID</p>
            <p className="mt-2 text-base font-semibold text-white">yourname@upi</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.18em] text-purple-200/80">Payment instructions</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>1. Scan the QR code or use your UPI app.</p>
              <p>2. Pay <span className="font-semibold text-white">{resource.price}</span> for the selected note.</p>
              <p>3. Upload the screenshot below and press &quot;I Have Paid&quot;.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-card">
          <p className="text-sm uppercase tracking-[0.18em] text-purple-200/80">Selected resource</p>
          <p className="mt-4 text-xl font-semibold text-white">{resource.title}</p>
          <p className="mt-1 text-sm text-slate-300">Price: <span className="font-semibold text-white">{resource.price}</span></p>
        </div>

        {status === 'submitted' ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-[1.75rem] border border-emerald-400/20 bg-emerald-500/10 p-6 text-white"
          >
            <p className="font-semibold text-white">Payment submitted.</p>
            <p className="mt-2 text-sm text-slate-300">Access will be verified shortly.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div
              className={`rounded-[1.75rem] border-2 ${dragActive ? 'border-purple-400/50 bg-purple-500/10' : 'border-white/10 bg-slate-900/80'} px-4 py-10 text-center transition`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200/80">Upload screenshot</p>
              <p className="mt-3 text-sm text-slate-300">Drag and drop your payment screenshot here, or use the button below.</p>
              <p className="mt-4 text-sm text-slate-400">{fileName || 'No file selected yet'}</p>
            </div>
            <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-purple-400/40 hover:bg-white/10">
              Select screenshot
              <input type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
            </label>
            <motion.button
              type="button"
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-4 text-sm font-semibold text-white transition hover:brightness-110"
            >
              I Have Paid
            </motion.button>
          </div>
        )}
      </div>
    </Modal>
  );
}
