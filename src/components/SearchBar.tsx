'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    // Block number
    if (/^\d+$/.test(q)) {
      router.push(`/block/${q}`);
    }
    // Tx hash
    else if (/^0x[a-fA-F0-9]{64}$/.test(q)) {
      router.push(`/tx/${q}`);
    }
    // Address
    else if (/^qtx1[a-zA-Z0-9]{38}$/.test(q)) {
      router.push(`/address/${q}`);
    }
    
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Address / Txn Hash / Block"
          className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-white/10 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        />
      </div>
    </form>
  );
}
