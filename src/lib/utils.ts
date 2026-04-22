import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function formatQTX(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) / 1e18 : value / 1e18;
  if (num === 0) return '0 QTX';
  if (num < 0.001) return '<0.001 QTX';
  if (num < 1) return num.toFixed(4) + ' QTX';
  return formatNumber(Math.floor(num * 1000) / 1000) + ' QTX';
}

export function formatHash(hash: string, chars = 8): string {
  if (!hash || hash.length <= chars * 2) return hash;
  return `${hash.slice(0, chars)}...${hash.slice(-chars)}`;
}

export function formatTime(timestamp: string, short = false): string {
  const date = new Date(timestamp);
  if (short) {
    const now = Date.now();
    const diff = Math.floor((now - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }
  return date.toLocaleString();
}
