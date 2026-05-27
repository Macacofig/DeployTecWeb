"use client";

import { useMemo, useState } from "react";
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
    } catch (err: any) {
      console.error("ERROR FRONT:", err);

      setError(
        err?.response?.data?.message ||
        "Error al crear producto"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-white">
            Crear Producto
          </h1>

          <p className="text-slate-400 mt-2">
            Agrega un nuevo producto
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            p-6
            space-y-6
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Descripción
            </label>

            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={4}
              className="
                w-full
                rounded-lg
                border
                border-slate-600
                bg-slate-700
                px-3
                py-2
                text-white
                placeholder-slate-400
                focus:outline-none
                focus:border-blue-500
              "
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <div className="flex gap-4">
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
      </div>
    </AdminGuard>
  );
}