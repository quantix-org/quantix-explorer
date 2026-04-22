import { Box, FileText, Users, Coins, Clock, TrendingUp } from 'lucide-react';
import { formatNumber, formatQTX } from '@/lib/utils';

interface Stats {
  blockHeight: number;
  totalTxs: number;
  validators: number;
  totalStaked: string;
  avgBlockTime: number;
  tps: number;
}

export function StatsGrid({ stats }: { stats?: Stats }) {
  const items = [
    { label: 'Block Height', value: stats?.blockHeight, icon: Box, format: formatNumber },
    { label: 'Transactions', value: stats?.totalTxs, icon: FileText, format: formatNumber },
    { label: 'Validators', value: stats?.validators, icon: Users, format: (v: number) => v.toString() },
    { label: 'Total Staked', value: stats?.totalStaked, icon: Coins, format: formatQTX },
    { label: 'Avg Block Time', value: stats?.avgBlockTime, icon: Clock, format: (v: number) => `${v}s` },
    { label: 'TPS', value: stats?.tps, icon: TrendingUp, format: (v: number) => v.toFixed(1) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((item, i) => (
        <div key={i} className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <item.icon className="w-4 h-4 text-primary-400" />
            <span className="stat-label">{item.label}</span>
          </div>
          <span className="stat-value">
            {item.value !== undefined ? item.format(item.value as any) : '...'}
          </span>
        </div>
      ))}
    </div>
  );
}
