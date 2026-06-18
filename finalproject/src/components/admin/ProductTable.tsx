"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import type { Product } from "@/models/product.model";
import type { AxiosError } from "axios";
import ProductService from "@/services/product.service";
import type { ApiErrorPayload } from "@/types/api-error-payload.type";
import { formatPrice } from "@/utils/currency.util";

const ADMIN_PRODUCTS_PAGE_SIZE = 100;

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        setLoading(true);
        const firstPage = await ProductService.getProducts({
          pageNumber: 0,
          pageSize: ADMIN_PRODUCTS_PAGE_SIZE,
        });

        const allProducts = Array.isArray(firstPage?.content) ? [...firstPage.content] : [];
        const totalPages = firstPage?.totalPages ?? 1;

        for (let pageNumber = 1; pageNumber < totalPages; pageNumber += 1) {
          const page = await ProductService.getProducts({
            pageNumber,
            pageSize: ADMIN_PRODUCTS_PAGE_SIZE,
          });

          if (Array.isArray(page?.content)) {
            allProducts.push(...page.content);
          }
        }

        if (!ignore) {
          setProducts(allProducts);
        }
      } catch (err: unknown) {
        console.error("Error al cargar productos:", err);

        const axiosErr = err as AxiosError<ApiErrorPayload>;
        if (axiosErr?.response?.data?.message || axiosErr?.response?.data?.error) {
          console.error("API message:", axiosErr.response.data.message ?? axiosErr.response.data.error);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      await ProductService.deleteProduct(id);
      setProducts((currentProducts) => currentProducts.filter((p) => p.id !== id));
      alert("Producto eliminado exitosamente");
    } catch (err: unknown) {
      console.error("Error al eliminar producto:", err);
      alert("Error al eliminar el producto");
    }
  };

  const getStockStatus = (quantity: number) => {
    const LOW_STOCK_THRESHOLD = 4;
    const isLow = quantity <= LOW_STOCK_THRESHOLD;
    const status = isLow ? "Stock Bajo" : "En Stock";
    const tone = isLow ? "admin-stock-badge--warning" : "admin-stock-badge--success";
    const icon = isLow ? "!" : "OK";

    return (
      <div className={`admin-stock-badge ${tone}`}>
        <span className="admin-stock-badge__icon">{icon}</span>
        <div className="admin-stock-badge__content">
          <span className="admin-stock-badge__status">{status}</span>
          <span className="admin-stock-badge__value">{quantity} u.</span>
        </div>
      </div>
    );
  };

  const columns = [
    { header: "ID", accessor: "id" as keyof Product },
    { header: "Nombre", accessor: "title" as keyof Product },
    {
      header: "Precio",
      accessor: (p: Product) => formatPrice(Number(p.price)),
    },
    {
      header: "Stock",
      accessor: (p: Product) => getStockStatus(p.quantity ?? 0),
    },
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
    return <p className="admin-table-loading admin-products-table__loading">Cargando productos...</p>;
  }

  return (
    <div className="admin-table-shell admin-products-table-shell">
      <div className="admin-table-shell__inner admin-products-table-shell__inner">
        <Table
          columns={columns}
          data={products}
          keyExtractor={(p) => String(p.id)}
        />
      </div>
    </div>
  );
}
