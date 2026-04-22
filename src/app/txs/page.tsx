'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FileText, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getTransactions } from '@/lib/api';
import { formatNumber, formatTime, formatQTX, formatHash } from '@/lib/utils';

export default function TransactionsPage() {
  const [page, setPage] = useState(0);
  const pageSize = 25;

  const { data: txs } = useQuery({
    queryKey: ['transactions', pageSize, page * pageSize],
    queryFn: () => getTransactions(pageSize, page * pageSize),
  });

  return (
    <div className="container-page py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-primary-400" />
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Block</th>
                <th>Age</th>
                <th>From</th>
                <th></th>
                <th>To</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {txs?.map((tx: any) => (
                <tr key={tx.hash}>
                  <td>
                    <Link href={`/tx/${tx.hash}`} className="link-primary hash">
                      {formatHash(tx.hash)}
                    </Link>
                  </td>
                  <td>
                    <Link href={`/block/${tx.blockNumber}`} className="link-primary">
                      {formatNumber(tx.blockNumber)}
                    </Link>
                  </td>
                  <td className="text-dark-400">{formatTime(tx.timestamp, true)}</td>
                  <td>
                    <Link href={`/address/${tx.from}`} className="link-primary hash">
                      {formatHash(tx.from)}
                    </Link>
                  </td>
                  <td><ArrowRight className="w-4 h-4 text-dark-500" /></td>
                  <td>
                    <Link href={`/address/${tx.to}`} className="link-primary hash">
                      {formatHash(tx.to)}
                    </Link>
                  </td>
                  <td className="font-medium">{formatQTX(tx.value)}</td>
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
