"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AdminGuard } from "@/guards/AdminGuard";
import { apiClient } from "@/services/api.service";

export default function CreateProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient.post("/admin/products/creates", {
        title,
        price: parseFloat(price),
        description,
        stock: parseInt(stock),
      });
      router.push("/admin/products");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-white mb-6">Crear Producto</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4"
        >
            <Input
              label="Nombre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              label="Precio"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <Input
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" isLoading={loading}>
              Guardar Producto
            </Button>
          </form>
      </div>
    </AdminGuard>
  );
}