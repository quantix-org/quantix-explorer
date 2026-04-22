'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Box } from 'lucide-react';
import { getBlock } from '@/lib/api';
import { formatNumber, formatTime, formatHash } from '@/lib/utils';
import { CopyButton } from '@/components/CopyButton';

export default function BlockPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: block, isLoading } = useQuery({
    queryKey: ['block', id],
    queryFn: () => getBlock(id),
  });

  if (isLoading) {
    return (
      <div className="container-page py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-dark-800 rounded w-48 mb-6" />
          <div className="card p-6 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-6 bg-dark-700 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="container-page py-8">
        <div className="card p-12 text-center">
          <h2 className="text-xl font-bold mb-2">Block Not Found</h2>
          <p className="text-dark-400">The block you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Box className="w-8 h-8 text-primary-400" />
          <h1 className="text-2xl font-bold">Block #{formatNumber(block.number)}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/block/${block.number - 1}`}
            className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href={`/block/${block.number + 1}`}
            className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="card p-6">
        <div className="detail-row">
          <span className="detail-label">Block Height</span>
          <span className="detail-value font-semibold">{formatNumber(block.number)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Timestamp</span>
          <span className="detail-value">{formatTime(block.timestamp)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Transactions</span>
          <span className="detail-value">
            <Link href={`/txs?block=${block.number}`} className="link-primary">
              {block.txCount} transactions
            </Link>
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Validator</span>
          <span className="detail-value flex items-center gap-2">
            <Link href={`/address/${block.validator}`} className="link-primary hash">
              {block.validator}
            </Link>
            <CopyButton text={block.validator} />
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Block Hash</span>
          <span className="detail-value flex items-center gap-2">
            <span className="hash">{block.hash}</span>
            <CopyButton text={block.hash} />
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Parent Hash</span>
          <span className="detail-value flex items-center gap-2">
            <Link href={`/block/${block.parentHash}`} className="link-primary hash">
              {formatHash(block.parentHash)}
            </Link>
            <CopyButton text={block.parentHash} />
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Gas Used</span>
          <span className="detail-value">
            {formatNumber(block.gasUsed)} / {formatNumber(block.gasLimit)} 
            ({((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%)
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">State Root</span>
          <span className="detail-value hash">{block.stateRoot}</span>
        </div>
      </div>
    </div>
  );
}
