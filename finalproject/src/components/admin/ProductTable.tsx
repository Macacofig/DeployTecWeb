"use client";

import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { Product } from "@/models/product.model";
import { apiClient } from "@/services/api.service";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/admin/products/")
      .then((res) => {
        const data = res.data.content ?? res.data;
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error al cargar productos:", err))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { header: "ID", accessor: "id" as keyof Product },
    { header: "Nombre", accessor: "title" as keyof Product },
    {
      header: "Precio",
      accessor: (p: Product) => `$${Number(p.price).toFixed(2)}`,
    },
    { header: "Stock", accessor: "stock" as keyof Product },
    {
      header: "Acciones",
      accessor: (p: Product) => (
        <Button
          variant="outline"
          onClick={() => alert(`Editar producto ID: ${p.id}`)}
        >
          Editar
        </Button>
      ),
    },
  ];

  if (loading) {
    return <p className="text-slate-400">Cargando productos...</p>;
  }

  return (
    <Table
      columns={columns}
      data={products}
      keyExtractor={(p) => String(p.id ?? Math.random())}
    />
  );
}