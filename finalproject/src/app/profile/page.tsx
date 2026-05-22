import { AuthGuard } from "../../guards/AuthGuard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 lg:px-10">
        <header>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Perfil</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Mi perfil</h1>
          <p className="mt-2 text-slate-300">Base para ver y editar datos personales del usuario autenticado.</p>
        </header>
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
          Formulario de perfil y resumen de cuenta listo para conectar.
        </section>
      </main>
    </AuthGuard>
  );
}