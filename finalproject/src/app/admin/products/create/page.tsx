"use client";

import type { FormState } from "@/types/form-state.type";
import { useMemo, useState } from "react";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { AdminGuard } from "@/guards/AdminGuard";

import ProductService from "@/services/product.service";

import type { CreateProductRequest } from "@/models/product.model";
import type { ApiErrorPayload } from "@/types/api-error-payload.type";
import type { ProductHighlight } from "@/types/product-highlight.type";
import type { ProductNumericField } from "@/types/product-numeric-field.type";

const numericProductFields: ProductNumericField[] = ["price", "discountPersent", "quantity"];

export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CreateProductRequest>({
    title: "",
    description: "",
    price: 0,
    discountPersent: 0,
    quantity: 0,
    brand: "",
    color: "",
    sizes: [],
    imageUrl: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
  });

  const discountedPrice = useMemo(() => {
    const price = formData.price || 0;

    const discount = formData.discountPersent || 0;

    return Math.round(price - (price * discount) / 100);
  }, [formData.price, formData.discountPersent]);

  const productHighlights = useMemo<ProductHighlight[]>(
    () => [
      {
        label: "Precio base",
        value: `$${formData.price.toLocaleString("es-AR")}`,
      },
      {
        label: "Descuento",
        value: `${formData.discountPersent || 0}%`,
      },
      {
        label: "Precio final",
        value: `$${discountedPrice.toLocaleString("es-AR")}`,
      },
      {
        label: "Stock",
        value: `${formData.quantity || 0} u.`,
      },
    ],
    [
      discountedPrice,
      formData.discountPersent,
      formData.price,
      formData.quantity,
    ]
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: numericProductFields.includes(name as ProductNumericField)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setFormState("submitting");
    setError("");

    let failed = false;

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

      const axiosErr = err as AxiosError<ApiErrorPayload>;
      message = axiosErr?.response?.data?.message ?? message;
      message = axiosErr?.response?.data?.error ?? message;

      failed = true;
      setFormState("error");
      setError(message);
    } finally {
      setLoading(false);

      if (!failed) {
        setFormState("idle");
      }
    }
  };

  return (
    <AdminGuard>
      <main className="page-shell page-shell--wide admin-page admin-product-create">
        <header className="admin-page__header admin-product-create__header">
          <p className="page-header__eyebrow">Catálogo</p>
          <h1 className="page-header__title page-header__title--medium">Crear Producto</h1>
          <p className="page-header__description">
            Agrega un nuevo producto con su información principal, precios y clasificación.
          </p>
        </header>

        <section className="admin-product-create__hero surface-card surface-card--strong">
          <div className="admin-product-create__hero-copy">
            <p className="admin-product-create__eyebrow">Alta de producto</p>
            <h2 className="admin-product-create__hero-title">
              Organiza la ficha del producto antes de publicarla.
            </h2>
            <p className="admin-product-create__hero-description">
              Completa los datos clave y revisa al costado un resumen visual con precio final, stock y categorías.
            </p>
          </div>

          <div className="admin-product-create__stats">
            {productHighlights.map((item) => (
              <article key={item.label} className="admin-product-create__stat">
                <p className="admin-product-create__stat-label">{item.label}</p>
                <p className="admin-product-create__stat-value">{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="admin-product-create__layout">
          <form onSubmit={handleSubmit} className="admin-form surface-card admin-product-create__form">
            <div className="admin-form__section">
              <div className="admin-form__section-header">
                <p className="admin-form__section-eyebrow">Información básica</p>
                <h3 className="admin-form__section-title">Datos principales del producto</h3>
              </div>

              <div className="admin-form__grid">
                <Input label="Nombre" name="title" value={formData.title} onChange={handleChange} required />
                <Input label="Marca" name="brand" value={formData.brand || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="admin-form__section">
              <div className="admin-form__section-header">
                <p className="admin-form__section-eyebrow">Descripción</p>
                <h3 className="admin-form__section-title">Texto comercial y presentación</h3>
              </div>

              <div className="admin-form__field">
                <label className="admin-form__label">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows={5}
                  className="admin-form__textarea admin-form__textarea--large"
                  placeholder="Describe el producto, materiales, uso o detalles clave."
                />
              </div>
            </div>

            <div className="admin-form__section">
              <div className="admin-form__section-header">
                <p className="admin-form__section-eyebrow">Precio y stock</p>
                <h3 className="admin-form__section-title">Valores que ve el cliente</h3>
              </div>

              <div className="admin-form__grid admin-form__grid--three">
                <Input label="Precio" name="price" type="number" value={String(formData.price)} onChange={handleChange} required />
                <Input label="Descuento %" name="discountPersent" type="number" value={String(formData.discountPersent)} onChange={handleChange} />
                <Input label="Precio Final" value={String(discountedPrice)} disabled />
              </div>

              <div className="admin-form__grid">
                <Input label="Cantidad" name="quantity" type="number" value={String(formData.quantity)} onChange={handleChange} required />
                <Input label="Color" name="color" value={formData.color || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="admin-form__section">
              <div className="admin-form__section-header">
                <p className="admin-form__section-eyebrow">Clasificación</p>
                <h3 className="admin-form__section-title">Ubicación dentro del catálogo</h3>
              </div>

              <div className="admin-form__grid admin-form__grid--three">
                <Input label="Categoría Principal" name="topLevelCategory" value={formData.topLevelCategory} onChange={handleChange} />
                <Input label="Categoría Secundaria" name="secondLevelCategory" value={formData.secondLevelCategory} onChange={handleChange} />
                <Input label="Categoría Terciaria" name="thirdLevelCategory" value={formData.thirdLevelCategory} onChange={handleChange} />
              </div>

              <Input label="URL Imagen" name="imageUrl" value={formData.imageUrl || ""} onChange={handleChange} />
            </div>

            {error && <p className="admin-form__error admin-product-create__error">{error}</p>}

            <div className="admin-form__actions admin-product-create__actions">
              <Button type="submit" isLoading={loading || formState === "submitting"}>
                Crear Producto
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
                Cancelar
              </Button>
            </div>
          </form>

          <aside className="admin-product-create__preview surface-card">
            <div className="admin-product-create__preview-header">
              <p className="admin-form__section-eyebrow">Vista previa</p>
              <h3 className="admin-form__section-title">Resumen rápido antes de guardar</h3>
            </div>

            <div className="admin-product-create__preview-card">
              <div className="admin-product-create__preview-image">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt={formData.title || "Vista previa del producto"} />
                ) : (
                  <span>Sin imagen</span>
                )}
              </div>

              <div className="admin-product-create__preview-copy">
                <p className="admin-product-create__preview-name">{formData.title || "Nombre del producto"}</p>
                <p className="admin-product-create__preview-brand">{formData.brand || "Marca"}</p>
                <p className="admin-product-create__preview-description">
                  {formData.description || "La descripción aparecerá aquí para revisar el tono comercial."}
                </p>
              </div>
            </div>

            <div className="admin-product-create__preview-list">
              <div className="admin-product-create__preview-item">
                <span>Categoría</span>
                <strong>{formData.topLevelCategory || "Principal / Secundaria / Terciaria"}</strong>
              </div>
              <div className="admin-product-create__preview-item">
                <span>Color</span>
                <strong>{formData.color || "No definido"}</strong>
              </div>
              <div className="admin-product-create__preview-item">
                <span>Stock</span>
                <strong>{formData.quantity || 0} unidades</strong>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </AdminGuard>
  );
}