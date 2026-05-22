import { AdminGuard } from "../../../guards/AdminGuard";

export default function AdminOrdersPage() {
  return (
    <AdminGuard>
      <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 lg:px-10">
        <header>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Admin / Pedidos</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Gestión de pedidos</h1>
          <p className="mt-2 text-slate-300">Espacio para revisar estados, despacho y trazabilidad de órdenes.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
          Vista administrativa preparada para control operacional.
        </section>
      </main>
    </AdminGuard>
  );
}