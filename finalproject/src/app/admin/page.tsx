import Link from "next/link";
import { AdminGuard } from "../../guards/AdminGuard";

const adminAreas = [
  { href: "/admin/products", title: "Gestionar productos" },
  { href: "/admin/products/create", title: "Crear producto" },
  { href: "/admin/orders", title: "Gestionar pedidos" },
];

export default function AdminPage() {
  return (
    <AdminGuard>
      <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 lg:px-10">
        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Administración</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Panel de administración</h1>
          <p className="mt-2 text-slate-300">Accede a las herramientas clave para administrar productos y pedidos.</p>
        </header>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {adminAreas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white transition hover:bg-white/10"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-brand-200">{area.title}</p>
              <p className="mt-4 text-lg font-semibold">Ir al módulo</p>
            </Link>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-slate-300">
          <h2 className="text-2xl font-semibold text-white">Resumen rápido</h2>
          <p className="mt-3 leading-7">
            Usa el menú lateral para navegar entre las distintas áreas administrativas.
            Aquí encontrarás acceso directo a la gestión de productos, la creación de nuevos artículos
            y el seguimiento de pedidos.
          </p>
        </section>
      </main>
    </AdminGuard>
  );
}