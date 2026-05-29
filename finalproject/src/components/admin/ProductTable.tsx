"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import type { Product, ProductPage } from "@/models/product.model";
import type { AxiosError } from "axios";
import ProductService from "@/services/product.service";
import type { ApiErrorPayload } from "@/types/api-error-payload.type";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getProducts()
      .then((result) => {
        const data = result?.content ?? [];
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err: unknown) => {
        console.error("Error al cargar productos:", err);

        const axiosErr = err as AxiosError<ApiErrorPayload>;
        // opcional: podrías mostrar un toast o setear un estado de error
        if (axiosErr?.response?.data?.message || axiosErr?.response?.data?.error) {
          console.error("API message:", axiosErr.response.data.message ?? axiosErr.response.data.error);
        }
      })
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
        <div className="admin-table-actions">
          <Link href={`/admin/products/${p.id}/edit`}>
            <Button variant="outline">Editar</Button>
          </Link>
          <Button
            variant="outline"
            className="ui-button--danger"
            onClick={() => handleDelete(p.id)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <p className="admin-table-loading">Cargando productos...</p>;
  }

  return (
    <div className="admin-table-shell">
      <div className="admin-table-shell__inner">
        <Table
          columns={columns}
          data={products}
          keyExtractor={(p) => String(p.id ?? Math.random())}
        />
      </div>
    </div>
  );
}