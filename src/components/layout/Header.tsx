'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hexagon, Box, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const nav = [
  { name: 'Home', href: '/' },
  { name: 'Blocks', href: '/blocks' },
  { name: 'Transactions', href: '/txs' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur border-b border-white/10">
      <div className="container-page h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Hexagon className="w-8 h-8 text-primary-400" />
          <span className="font-bold text-lg hidden sm:inline">Quantix Explorer</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-dark-300 hover:text-white hover:bg-white/5'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-500/30">
            TESTNET
          </span>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-white/10 bg-dark-900 py-4">
          <div className="container-page space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-lg text-sm font-medium',
                  pathname === item.href
                    ? 'bg-primary-500/10 text-primary-400'
                    : 'text-dark-300 hover:bg-white/5'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
