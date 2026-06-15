"use client";

import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AdminGuard } from "@/guards/AdminGuard";
import { Product } from "@/models/product.model";
import ProductService from "@/services/product.service";
import type { ApiErrorPayload } from "@/types/api-error-payload.type";
import type { ProductNumericField } from "@/types/product-numeric-field.type";

const numericProductFields: ProductNumericField[] = ["price", "discountedPrice", "discountPersent", "quantity"];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    discountPersent: 0,
    quantity: 0,
    brand: "",
    color: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await ProductService.getProductById(productId);
        setFormData(product);
      } catch (err: unknown) {
        let message = "Error al cargar el producto";
        if (err instanceof Error) message = err.message;
        const axiosErr = err as AxiosError<ApiErrorPayload>;
        message = axiosErr?.response?.data?.message ?? message;
        message = axiosErr?.response?.data?.error ?? message;
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
      [name]: numericProductFields.includes(name as ProductNumericField)
        ? Number(value)
        : value,
    }));
  };

  const discountedPrice = formData.price
    ? Math.round(formData.price - (formData.price * (formData.discountPersent ?? 0)) / 100)
    : 0;

  const validateForm = (): string | null => {
    if (!formData.title || formData.title.trim() === "") {
      return "El nombre del producto es requerido";
    }
    if (!formData.description || formData.description.trim() === "") {
      return "La descripción es requerida";
    }
    if (formData.description.trim().length < 10) {
      return "La descripción debe tener al menos 10 caracteres";
    }
    if (formData.price === undefined || formData.price <= 0) {
      return "El precio debe ser mayor a 0";
    }
    if (formData.discountPersent === undefined || formData.discountPersent < 0 || formData.discountPersent > 100) {
      return "El descuento debe estar entre 0 y 100";
    }
    if (formData.quantity === undefined || formData.quantity < 0) {
      return "La cantidad no puede ser negativa";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await ProductService.updateProduct(productId, formData as Product);
      router.push("/admin/products");
    } catch (err: unknown) {
      let message = "Error al actualizar producto";
      if (err instanceof Error) message = err.message;
      const axiosErr = err as AxiosError<ApiErrorPayload>;
      message = axiosErr?.response?.data?.message ?? message;
      message = axiosErr?.response?.data?.error ?? message;
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
          <div className="admin-form__section">
            <div className="admin-form__section-header">
              <p className="admin-form__section-eyebrow">Información del producto</p>
              <h3 className="admin-form__section-title">Editar detalles</h3>
            </div>

            <div className="admin-form__grid">
              <Input
                label="Nombre"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                placeholder="Nombre del producto"
                required
              />
              <Input
                label="Marca"
                name="brand"
                value={formData.brand || ""}
                onChange={handleInputChange}
                placeholder="Ej: Nike"
              />
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">
              <p className="admin-form__section-eyebrow">Descripción</p>
              <h3 className="admin-form__section-title">Información comercial (mínimo 10 caracteres)</h3>
            </div>

            <div className="admin-form__field">
              <label className="admin-form__label">Descripción</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="admin-form__textarea"
                rows={5}
                placeholder="Describe el producto..."
                minLength={10}
                required
              />
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">
              <p className="admin-form__section-eyebrow">Precio y stock</p>
              <h3 className="admin-form__section-title">Valores y disponibilidad</h3>
            </div>

            <div className="admin-form__grid admin-form__grid--three">
              <Input
                label="Precio (Bs)"
                name="price"
                type="number"
                value={formData.price ?? ""}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                required
              />
              <Input
                label="Descuento (0-100%)"
                name="discountPersent"
                type="number"
                value={formData.discountPersent ?? ""}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                max="100"
                required
              />
              <Input label="Precio Final" value={String(discountedPrice)} disabled />
            </div>

            <div className="admin-form__grid">
              <Input
                label="Cantidad en Stock"
                name="quantity"
                type="number"
                value={formData.quantity ?? ""}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                required
              />
              <Input
                label="Color"
                name="color"
                value={formData.color || ""}
                onChange={handleInputChange}
                placeholder="Ej: Rojo, Azul"
              />
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">
              <p className="admin-form__section-eyebrow">Clasificación</p>
              <h3 className="admin-form__section-title">Detalles de catálogo</h3>
            </div>

            <div className="admin-form__grid admin-form__grid--three">
              <Input
                label="URL Imagen"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <div className="admin-form__field">
                <label className="admin-form__label">Categoría</label>
                <p className="admin-form__text">{formData.category?.name || "Sin categoría asignada"}</p>
              </div>
              <Input
                label="Color"
                name="color"
                value={formData.color || ""}
                onChange={handleInputChange}
                placeholder="Ej: Rojo, Azul"
              />
            </div>
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
