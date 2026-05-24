'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialValue?: string;
  className?: string;
}

export default function SearchBar({ initialValue = '', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full pl-4 pr-12 py-2.5 rounded-2xl border border-white/15 bg-white/5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      <button
        type="submit"
        className="absolute right-3 text-slate-400 hover:text-white transition-colors"
        aria-label="Buscar"
      >
      </button>
    </form>
  );
}