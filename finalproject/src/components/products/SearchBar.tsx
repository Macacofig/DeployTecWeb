'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  initialValue?: string;
  className?: string;
}

export default function SearchBar({ initialValue = '', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      const trimmedQuery = query.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (trimmedQuery) {
        params.set('search', trimmedQuery);
      } else {
        params.delete('search');
      }

      router.push(`/products?${params.toString()}`);
    }, 400); // 400ms debounce

    return () => clearTimeout(timeoutId);
  }, [query, router, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    const params = new URLSearchParams(searchParams.toString());
    
    if (trimmedQuery) {
      params.set('search', trimmedQuery);
    } else {
      params.delete('search');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="search-bar__input"
      />
      <button
        type="submit"
        className="search-bar__button"
        aria-label="Buscar"
      >
      </button>
    </form>
  );
}