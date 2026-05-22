import { AuthGuard } from "../../guards/AuthGuard";

export default function CartPage() {
  return (
    <AuthGuard>
      <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 lg:px-10">
        <header>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Carrito</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Tu carrito</h1>
          <p className="mt-2 text-slate-300">Base para sincronizar el carrito autenticado con el backend Spring Boot.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
          Aquí irá el listado de productos del carrito, totales y acciones de actualización.
        </section>
      </main>
    </AuthGuard>
  );
}