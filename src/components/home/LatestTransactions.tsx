import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import { formatQTX, formatTime, formatHash } from '@/lib/utils';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
}

export function LatestTransactions({ transactions }: { transactions?: Transaction[] }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-400" />
          <span className="font-semibold">Latest Transactions</span>
        </div>
        <Link href="/txs" className="text-primary-400 text-sm hover:underline flex items-center gap-1">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="divide-y divide-white/5">
        {transactions?.map((tx) => (
          <div key={tx.hash} className="p-4 hover:bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div>
                <Link href={`/tx/${tx.hash}`} className="link-primary hash">
                  {formatHash(tx.hash)}
                </Link>
                <p className="text-dark-400 text-sm mt-1">
                  {formatTime(tx.timestamp, true)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  <Link href={`/address/${tx.from}`} className="link-primary hash">
                    {formatHash(tx.from)}
                  </Link>
                  <span className="text-dark-400 mx-1">→</span>
                  <Link href={`/address/${tx.to}`} className="link-primary hash">
                    {formatHash(tx.to)}
                  </Link>
                </div>
                <p className="text-dark-400 text-sm mt-1">{formatQTX(tx.value)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
