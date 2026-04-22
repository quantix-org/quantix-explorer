'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { getTransaction } from '@/lib/api';
import { formatNumber, formatTime, formatQTX, formatHash } from '@/lib/utils';
import { CopyButton } from '@/components/CopyButton';

export default function TransactionPage() {
  const params = useParams();
  const hash = params.hash as string;

  const { data: tx, isLoading } = useQuery({
    queryKey: ['tx', hash],
    queryFn: () => getTransaction(hash),
  });

  if (isLoading) {
    return (
      <div className="container-page py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-dark-800 rounded w-64 mb-6" />
          <div className="card p-6 space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-6 bg-dark-700 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!tx) {
    return (
      <div className="container-page py-8">
        <div className="card p-12 text-center">
          <h2 className="text-xl font-bold mb-2">Transaction Not Found</h2>
          <p className="text-dark-400">The transaction you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-primary-400" />
        <h1 className="text-2xl font-bold">Transaction Details</h1>
        <span className={`badge ${tx.status === 'success' ? 'badge-success' : 'badge-error'}`}>
          {tx.status}
        </span>
      </div>

      {/* Details */}
      <div className="card p-6">
        <div className="detail-row">
          <span className="detail-label">Transaction Hash</span>
          <span className="detail-value flex items-center gap-2">
            <span className="hash">{tx.hash}</span>
            <CopyButton text={tx.hash} />
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className="detail-value">
            <span className={`badge ${tx.status === 'success' ? 'badge-success' : 'badge-error'}`}>
              {tx.status}
            </span>
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Block</span>
          <span className="detail-value">
            <Link href={`/block/${tx.blockNumber}`} className="link-primary">
              {formatNumber(tx.blockNumber)}
            </Link>
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Timestamp</span>
          <span className="detail-value">{formatTime(tx.timestamp)}</span>
        </div>

        {/* From/To Box */}
        <div className="my-6 p-4 bg-dark-900 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <span className="text-dark-400 text-sm">From</span>
              <div className="flex items-center gap-2 mt-1">
                <Link href={`/address/${tx.from}`} className="link-primary hash">
                  {tx.from}
                </Link>
                <CopyButton text={tx.from} />
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-dark-400" />
            <div className="flex-1">
              <span className="text-dark-400 text-sm">To</span>
              <div className="flex items-center gap-2 mt-1">
                <Link href={`/address/${tx.to}`} className="link-primary hash">
                  {tx.to}
                </Link>
                <CopyButton text={tx.to} />
              </div>
            </div>
          </div>
        </div>

        <div className="detail-row">
          <span className="detail-label">Value</span>
          <span className="detail-value text-lg font-semibold">{formatQTX(tx.value)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Transaction Fee</span>
          <span className="detail-value">{formatQTX(tx.fee)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Gas Used</span>
          <span className="detail-value">{formatNumber(tx.gasUsed)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Nonce</span>
          <span className="detail-value">{tx.nonce}</span>
        </div>
      </div>
    </div>
  );
}
