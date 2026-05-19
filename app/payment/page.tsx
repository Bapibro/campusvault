import Link from 'next/link';
import UPIPaymentPanel from '@/components/UPIPaymentPanel';

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-16">
      <div className="container space-y-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-card backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Payment guide</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Simple UPI checkout for every purchase</h1>
              <p className="mt-4 text-slate-300">CampusVault uses a manual but reliable payment flow: scan the UPI code, pay, then send the screenshot so admin can approve access.</p>
            </div>
            <UPIPaymentPanel />
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-card backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h2 className="text-lg font-semibold text-white">Step 1</h2>
              <p className="mt-4 text-slate-300">Choose a resource on the marketplace and click Buy Now.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h2 className="text-lg font-semibold text-white">Step 2</h2>
              <p className="mt-4 text-slate-300">Scan the UPI QR code and complete the payment using your preferred app.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h2 className="text-lg font-semibold text-white">Step 3</h2>
              <p className="mt-4 text-slate-300">Send the screenshot to admin from the dashboard or contact page for manual access approval.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-card backdrop-blur-xl">
          <h2 className="text-3xl font-semibold text-white">Need help?</h2>
          <p className="mt-4 text-slate-300">If you’re unsure about the payment, use the contact button in your dashboard or message support with your order details.</p>
          <Link href="/dashboard" className="mt-8 inline-flex rounded-2xl bg-purple-600 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
            Open dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
