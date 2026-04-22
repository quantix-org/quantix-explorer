'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { getAddress, getAddressTransactions } from '@/lib/api';
import { formatNumber, formatQTX, formatTime, formatHash } from '@/lib/utils';
import { CopyButton } from '@/components/CopyButton';

export default function AddressPage() {
  const params = useParams();
  const address = params.address as string;

  const { data: info } = useQuery({
    queryKey: ['address', address],
    queryFn: () => getAddress(address),
  });

  const { data: txs } = useQuery({
    queryKey: ['address-txs', address],
    queryFn: () => getAddressTransactions(address, 25),
  });

  return (
    <div className="container-page py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="w-8 h-8 text-primary-400" />
        <div>
          <h1 className="text-2xl font-bold">Address</h1>
          <div className="flex items-center gap-2">
            <span className="text-dark-400 hash text-sm">{address}</span>
            <CopyButton text={address} />
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <span className="stat-label">Balance</span>
          <span className="stat-value">{info ? formatQTX(info.balance) : '...'}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Transactions</span>
          <span className="stat-value">{info ? formatNumber(info.txCount) : '...'}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Type</span>
          <span className="stat-value text-lg">
            {info?.isContract ? 'Contract' : info?.isValidator ? 'Validator' : 'Account'}
          </span>
        </div>
      </div>

      {/* Transactions */}
      <div className="card">
        <div className="p-4 border-b border-white/10">
          <h2 className="font-semibold">Transactions</h2>
        </div>
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
              {txs?.map((tx: any) => {
                const isIn = tx.to?.toLowerCase() === address.toLowerCase();
                return (
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
                      {tx.from === address ? (
                        <span className="hash text-dark-400">{formatHash(tx.from)}</span>
                      ) : (
                        <Link href={`/address/${tx.from}`} className="link-primary hash">
                          {formatHash(tx.from)}
                        </Link>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${isIn ? 'badge-success' : 'badge-pending'}`}>
                        {isIn ? <ArrowDownLeft className="w-3 h-3 mr-1" /> : <ArrowUpRight className="w-3 h-3 mr-1" />}
                        {isIn ? 'IN' : 'OUT'}
                      </span>
                    </td>
                    <td>
                      {tx.to === address ? (
                        <span className="hash text-dark-400">{formatHash(tx.to)}</span>
                      ) : (
                        <Link href={`/address/${tx.to}`} className="link-primary hash">
                          {formatHash(tx.to)}
                        </Link>
                      )}
                    </td>
                    <td className="font-medium">{formatQTX(tx.value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
