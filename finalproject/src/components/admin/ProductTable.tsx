"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { Product, ProductPage } from "@/models/product.model";
import { apiClient } from "@/services/api.service";
import ProductService from "@/services/product.service";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<ProductPage>("/products/all")
      .then((res: { data: ProductPage }) => {
        const data = res.data.content ?? res.data;
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err: unknown) => console.error("Error al cargar productos:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      await ProductService.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      alert("Producto eliminado exitosamente");
    } catch (err: unknown) {
      console.error("Error al eliminar producto:", err);
      alert("Error al eliminar el producto");
    }
  };

  const columns = [
    { header: "ID", accessor: "id" as keyof Product },
    { header: "Nombre", accessor: "title" as keyof Product },
    {
      header: "Precio",
      accessor: (p: Product) => `$${Number(p.price).toFixed(2)}`,
    },
    { header: "Stock", accessor: "quantity" as keyof Product },
    {
      header: "Acciones",
      accessor: (p: Product) => (
        <div className="flex gap-2">
          <Link href={`/admin/products/${p.id}/edit`}>
            <Button variant="outline">Editar</Button>
          </Link>
          <Button
            variant="outline"
            className="text-red-600 hover:bg-red-50"
            onClick={() => handleDelete(p.id)}
          >
            Eliminar
          </Button>
        </div>
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