"use client";

import { useMemo, useState } from "react";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { AdminGuard } from "@/guards/AdminGuard";

import ProductService from "@/services/product.service";

import type { CreateProductRequest } from "@/models/product.model";

export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] =
    useState<CreateProductRequest>({
      title: "",
      description: "",

      price: 0,

      discountPersent: 0,

      quantity: 0,

      brand: "",
      color: "",

      size: [],

      imageUrl: "",

      topLevelCategory: "",
      secondLevelCategory: "",
      thirdLevelCategory: "",
    });

  const discountedPrice = useMemo(() => {
    const price = formData.price || 0;

    const discount =
      formData.discountPersent || 0;

    return Math.round(
      price - (price * discount) / 100
    );
  }, [
    formData.price,
    formData.discountPersent,
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: [
        "price",
        "discountPersent",
        "quantity",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const payload = {
        ...formData,
        discountedPrice,
      };

      await ProductService.createProduct(payload);

      router.push("/admin/products");
    } catch (err: unknown) {
      console.error("ERROR FRONT:", err);

      let message = "Error al crear producto";

      if (err instanceof Error) message = err.message;

      const axiosErr = err as AxiosError<{ message?: string }>;
      message = axiosErr?.response?.data?.message ?? message;

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <main className="page-shell page-shell--medium admin-page">
        <header className="admin-page__header">
          <p className="page-header__eyebrow">Admin / Productos</p>
          <h1 className="page-header__title page-header__title--medium">
            Crear Producto
          </h1>
          <p className="page-header__description">Agrega un nuevo producto</p>
        </header>

        <form onSubmit={handleSubmit} className="admin-form surface-card">
          <div className="admin-form__grid">
            <Input
              label="Nombre"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              label="Marca"
              name="brand"
              value={formData.brand || ""}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form__field">
            <label className="admin-form__label">Descripción</label>

            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={4}
              className="admin-form__textarea"
            />
          </div>

          <div className="admin-form__grid">
            <Input
              label="Precio"
              name="price"
              type="number"
              value={String(formData.price)}
              onChange={handleChange}
              required
            />

            <Input
              label="Descuento %"
              name="discountPersent"
              type="number"
              value={String(
                formData.discountPersent
              )}
              onChange={handleChange}
            />

            <Input
              label="Precio Final"
              value={String(discountedPrice)}
              disabled
            />
          </div>

          <div className="admin-form__grid">
            <Input
              label="Cantidad"
              name="quantity"
              type="number"
              value={String(formData.quantity)}
              onChange={handleChange}
              required
            />

            <Input
              label="Color"
              name="color"
              value={formData.color || ""}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form__grid">
            <Input
              label="Categoría Principal"
              name="topLevelCategory"
              value={formData.topLevelCategory}
              onChange={handleChange}
            />

            <Input
              label="Categoría Secundaria"
              name="secondLevelCategory"
              value={formData.secondLevelCategory}
              onChange={handleChange}
            />

            <Input
              label="Categoría Terciaria"
              name="thirdLevelCategory"
              value={formData.thirdLevelCategory}
              onChange={handleChange}
            />
          </div>

          <Input
            label="URL Imagen"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
          />

          {error && <p className="admin-form__error">{error}</p>}

          <div className="admin-form__actions">
            <Button
              type="submit"
              isLoading={loading}
            >
              Crear Producto
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.push("/admin/products")
              }
            >
              Cancelar
            </Button>
          </div>
        </form>
      </main>
    </AdminGuard>
  );
}