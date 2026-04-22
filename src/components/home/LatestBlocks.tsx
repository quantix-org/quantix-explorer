import Link from 'next/link';
import { Box, ArrowRight } from 'lucide-react';
import { formatNumber, formatTime, formatHash } from '@/lib/utils';

interface Block {
  number: number;
  timestamp: string;
  validator: string;
  txCount: number;
}

export function LatestBlocks({ blocks }: { blocks?: Block[] }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-primary-400" />
          <span className="font-semibold">Latest Blocks</span>
        </div>
        <Link href="/blocks" className="text-primary-400 text-sm hover:underline flex items-center gap-1">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="divide-y divide-white/5">
        {blocks?.map((block) => (
          <div key={block.number} className="p-4 hover:bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div>
                <Link href={`/block/${block.number}`} className="link-primary font-medium">
                  {formatNumber(block.number)}
                </Link>
                <p className="text-dark-400 text-sm mt-1">
                  {formatTime(block.timestamp, true)}
                </p>
              </div>
              <div className="text-right">
                <Link href={`/address/${block.validator}`} className="link-primary hash text-sm">
                  {formatHash(block.validator)}
                </Link>
                <p className="text-dark-400 text-sm mt-1">{block.txCount} txns</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
