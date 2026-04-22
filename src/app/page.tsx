'use client';

import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '@/components/SearchBar';
import { StatsGrid } from '@/components/home/StatsGrid';
import { LatestBlocks } from '@/components/home/LatestBlocks';
import { LatestTransactions } from '@/components/home/LatestTransactions';
import { getStats, getBlocks, getTransactions } from '@/lib/api';

export default function HomePage() {
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    refetchInterval: 12000,
  });

  const { data: blocks } = useQuery({
    queryKey: ['blocks', 6],
    queryFn: () => getBlocks(6),
    refetchInterval: 12000,
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions', 6],
    queryFn: () => getTransactions(6),
    refetchInterval: 12000,
  });

  return (
    <div className="container-page py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Quantix Testnet Explorer
        </h1>
        <p className="text-dark-400 mb-8 max-w-xl mx-auto">
          The post-quantum secure blockchain. Search for blocks, transactions, and addresses.
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Latest */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <LatestBlocks blocks={blocks} />
        <LatestTransactions transactions={transactions} />
      </div>
    </div>
  );
}
