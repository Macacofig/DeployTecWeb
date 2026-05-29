"use client";

import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AdminGuard } from "@/guards/AdminGuard";
import { Product } from "@/models/product.model";
import ProductService from "@/services/product.service";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Partial<Product>>({
    description: "",
    quantity: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await ProductService.getProductById(productId);
        setFormData(product);
      } catch (err: unknown) {
          let message = "Error al cargar el producto";
          if (err instanceof Error) message = err.message;
          const axiosErr = err as AxiosError<{ message?: string }>;
          message = axiosErr?.response?.data?.message ?? message;
          setError(message);
        } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "discountedPrice", "discountPersent", "quantity"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await ProductService.updateProduct(productId, formData as Product);
      router.push("/admin/products");
    } catch (err: unknown) {
      let message = "Error al actualizar producto";
      if (err instanceof Error) message = err.message;
      const axiosErr = err as AxiosError<{ message?: string }>;
      message = axiosErr?.response?.data?.message ?? message;
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <main className="page-shell page-shell--narrow admin-page">
          <p className="admin-table-loading">Cargando producto...</p>
        </main>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <main className="page-shell page-shell--medium admin-page">
        <div className="catalog-toolbar admin-toolbar">
          <h1 className="page-header__title page-header__title--medium">
            Editar Producto - {formData.title}
          </h1>
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Volver
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form surface-card">
          <div className="admin-form__field">
            <label className="admin-form__label">Descripción</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="admin-form__textarea"
              rows={4}
            />
          </div>

          <div className="admin-form__grid">
            <Input
              label="Stock"
              name="quantity"
              type="number"
              value={formData.quantity || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && <p className="admin-form__error">{error}</p>}

          <div className="admin-form__actions">
            <Button type="submit" isLoading={submitting}>
              Guardar Cambios
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </main>
    </AdminGuard>
  );
}
