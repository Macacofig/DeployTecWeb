import Link from "next/link";
import { AdminGuard } from "../../guards/AdminGuard";

const adminAreas = [
  { href: "/admin/products", title: "Gestionar productos" },
  { href: "/admin/orders", title: "Gestionar pedidos" },
];

export default function AdminPage() {
  return (
    <AdminGuard>
      <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 lg:px-10">
        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Administración</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Panel admin</h1>
          <p className="mt-2 text-slate-300">Base modular para operaciones de catálogo y pedidos con permisos restringidos.</p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {adminAreas.map((area) => (
            <Link key={area.href} href={area.href} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white transition hover:bg-white/10">
              {area.title}
            </Link>
          ))}
        </section>
      </main>
    </AdminGuard>
  );
}