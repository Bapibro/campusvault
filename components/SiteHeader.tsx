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
        <Link href="/" className="text-lg font-semibold text-white">CampusVault</Link>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
