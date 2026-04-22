'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlocks } from '@/lib/api';
import { formatNumber, formatTime, formatHash } from '@/lib/utils';

export default function BlocksPage() {
  const [page, setPage] = useState(0);
  const pageSize = 25;

  const { data: blocks } = useQuery({
    queryKey: ['blocks', pageSize, page * pageSize],
    queryFn: () => getBlocks(pageSize, page * pageSize),
  });

  return (
    <div className="container-page py-8">
      <div className="flex items-center gap-3 mb-6">
        <Box className="w-8 h-8 text-primary-400" />
        <h1 className="text-2xl font-bold">Blocks</h1>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Block</th>
                <th>Age</th>
                <th>Txn</th>
                <th>Validator</th>
                <th>Gas Used</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {blocks?.map((block: any) => (
                <tr key={block.number}>
                  <td>
                    <Link href={`/block/${block.number}`} className="link-primary font-medium">
                      {formatNumber(block.number)}
                    </Link>
                  </td>
                  <td className="text-dark-400">{formatTime(block.timestamp, true)}</td>
                  <td>{block.txCount}</td>
                  <td>
                    <Link href={`/address/${block.validator}`} className="link-primary hash">
                      {formatHash(block.validator)}
                    </Link>
                  </td>
                  <td>{formatNumber(block.gasUsed)}</td>
                  <td>
                    <Link href={`/block/${block.hash}`} className="link-primary hash">
                      {formatHash(block.hash)}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-white/10">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 disabled:opacity-50 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-dark-400">Page {page + 1}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
