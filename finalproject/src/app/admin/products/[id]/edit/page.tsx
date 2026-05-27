"use client";

import { useEffect, useState } from "react";
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
      } catch (err: any) {
        setError(err?.response?.data?.message || "Error al cargar el producto");
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
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al actualizar producto");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="max-w-2xl mx-auto p-6">
          <p className="text-slate-400">Cargando producto...</p>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-white">
            Editar Producto - {formData.title}
          </h1>
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Volver
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4"
        >

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Stock"
              name="quantity"
              type="number"
              value={formData.quantity || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-4">
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
      </div>
    </AdminGuard>
  );
}
