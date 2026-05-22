import { AuthGuard } from "../../guards/AuthGuard";

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 lg:px-10">
        <header>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Checkout</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Finalizar compra</h1>
          <p className="mt-2 text-slate-300">Estructura lista para dirección, pago y confirmación de orden.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
          Formulario de checkout preparado para integrarse con la creación de pedidos.
        </section>
      </main>
    </AuthGuard>
  );
}