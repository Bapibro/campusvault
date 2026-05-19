import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import AnimatedPageShell from '@/components/AnimatedPageShell';

export const metadata: Metadata = {
  title: 'CampusVault',
  description: 'A modern student marketplace for notes, lab manuals, and exam prep resources.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <AnimatedPageShell>{children}</AnimatedPageShell>
      </body>
    </html>
  );
}
