import { AuthGuard } from "../../guards/AuthGuard";

export default function OrdersPage() {
  return (
    <AuthGuard>
      <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 lg:px-10">
        <header>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Pedidos</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Mis órdenes</h1>
          <p className="mt-2 text-slate-300">Vista preparada para historial, seguimiento y estado de compra.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
          Aquí se listarán las órdenes del usuario autenticado.
        </section>
      </main>
    </AuthGuard>
  );
}