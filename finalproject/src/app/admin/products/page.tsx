import { AdminGuard } from "../../../guards/AdminGuard";
import ProductTable from "@/components/admin/ProductTable";

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 lg:px-10">
        <header>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Admin / Productos</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Gestión de productos</h1>
          <p className="mt-2 text-slate-300">Estructura para crear, editar, eliminar y publicar catálogo.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
          <ProductTable />
        </section>
      </main>
    </AdminGuard>
  );
}