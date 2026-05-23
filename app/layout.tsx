import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import AnimatedPageShell from '@/components/AnimatedPageShell';

export const metadata: Metadata = {
  title: 'CampusVault',
  description: 'A modern student marketplace for notes, lab manuals, and exam prep resources.',
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '917000000000';
const whatsappMessage = encodeURIComponent('Hi, I want study resources from CampusVault');
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <AnimatedPageShell>{children}</AnimatedPageShell>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with CampusVault on WhatsApp"
          className="fixed bottom-4 right-4 z-[100] flex items-center gap-3 rounded-full border border-[#25D366]/40 bg-slate-950/90 px-4 py-3 text-white shadow-[0_0_35px_rgba(37,211,102,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/70 hover:shadow-[0_0_45px_rgba(37,211,102,0.45)] sm:bottom-6 sm:right-6"
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-slate-950">
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-5 w-5" aria-hidden="true">
              <path d="M12.04 2.06c-5.4 0-9.78 4.38-9.78 9.78 0 1.73.45 3.4 1.31 4.86L2 22l5.43-1.42a9.76 9.76 0 0 0 4.61 1.1c5.4 0 9.78-4.38 9.78-9.78 0-5.4-4.38-9.78-9.78-9.78Zm0 17.87a8.08 8.08 0 0 1-4.13-1.11l-.29-.17-3.22.84.86-3.14-.19-.3A8.07 8.07 0 1 1 12.04 19.93Zm4.43-6.05c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-1.42-.71-2.35-1.27-3.1-2.28-.23-.29-.19-.45.07-.75.11-.12.24-.32.36-.48.12-.16.16-.28.24-.47.08-.2.04-.37-.02-.52-.06-.15-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.41-.14 0-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2.01 0 1.19.86 2.32 1 2.48.14.16 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.51.59.19 1.13.16 1.56.1.48-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
            </svg>
          </span>
          <span className="hidden sm:inline text-sm font-semibold text-white">Chat with us</span>
          <span className="sm:hidden text-sm font-semibold text-white">Chat</span>
        </a>
      </body>
    </html>
  );
}
