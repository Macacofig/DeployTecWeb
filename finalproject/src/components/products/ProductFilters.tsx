"use client";

import { useState } from "react";
import type { ProductFilters } from "../../models/product.model";

interface Props {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
}

const SORT_OPTIONS = [
  { label: "Menor precio", value: "price_low" },
  { label: "Mayor precio", value: "price_high" },
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductFiltersPanel({ filters, onFilterChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const update = (partial: Partial<ProductFilters>) =>
    onFilterChange({ ...filters, ...partial, pageNumber: 0 });

  return (
    <>
      <button
        className="filter-panel__toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⚙️ Filtros
      </button>

      <aside className={`filter-panel ${isOpen ? "filter-panel--open" : ""}`}>
        <div className="filter-panel__group">
          <h3 className="filter-panel__title">Ordenar</h3>
          <select
            value={filters.sort ?? ""}
            onChange={(e) => update({ sort: e.target.value || undefined })}
            className="filter-panel__select"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-panel__group">
          <h3 className="filter-panel__title">Precio</h3>
          <div className="filter-panel__inputs">
            <input
              type="number"
              placeholder="Mín"
              value={filters.minPrice ?? ""}
              onChange={(e) => update({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="filter-panel__input"
            />
            <input
              type="number"
              placeholder="Máx"
              value={filters.maxPrice ?? ""}
              onChange={(e) => update({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="filter-panel__input"
            />
          </div>
        </div>

        <div className="filter-panel__group">
          <h3 className="filter-panel__title">Talla</h3>
          <div className="filter-panel__tags">
            {SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                onClick={() => update({ sizes: filters.sizes === size ? undefined : size })}
                className={`filter-panel__tag ${filters.sizes === size ? "filter-panel__tag--active" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onFilterChange({ pageNumber: 0, pageSize: 12 })}
          className="filter-panel__clear"
        >
          Limpiar filtros
        </button>
      </aside>
    </>
  );
}