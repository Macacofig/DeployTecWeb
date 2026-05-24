"use client";

import { useState } from "react";
import type { ProductFilters } from "../../models/product.model";

interface Props {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
}

const SORT_OPTIONS = [
  { label: "Relevancia", value: "" },
  { label: "Menor precio", value: "price_low" },
  { label: "Mayor precio", value: "price_high" },
  { label: "Descuento", value: "discount" },
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductFiltersPanel({ filters, onFilterChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const update = (partial: Partial<ProductFilters>) =>
    onFilterChange({ ...filters, ...partial, pageNumber: 0 });

  return (
    <>
      <button
        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-white/15 rounded-xl text-sm font-medium text-slate-300 mb-4 hover:bg-white/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⚙️ Filtros
      </button>

      <aside className={`${isOpen ? "block" : "hidden"} lg:block space-y-6`}>
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] mb-2">Ordenar</h3>
          <select
            value={filters.sort ?? ""}
            onChange={(e) => update({ sort: e.target.value || undefined })}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] mb-2">Precio</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={filters.minPrice ?? ""}
              onChange={(e) => update({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-1/2 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <input
              type="number"
              placeholder="Máx"
              value={filters.maxPrice ?? ""}
              onChange={(e) => update({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-1/2 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] mb-2">Talla</h3>
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                onClick={() => update({ sizes: filters.sizes === size ? undefined : size })}
                className={`px-3 py-1 rounded-full text-xs border transition-all ${
                  filters.sizes === size
                    ? "bg-brand-500 text-white border-brand-500"
                    : "border-white/15 text-slate-400 hover:border-brand-400/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onFilterChange({ pageNumber: 0, pageSize: 12 })}
          className="text-sm text-red-400 hover:text-red-300 underline"
        >
          Limpiar filtros
        </button>
      </aside>
    </>
  );
}