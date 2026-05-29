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
      <main className="page-shell page-shell--wide admin-page">
        <header className="admin-page__header">
          <p className="page-header__eyebrow">Administración</p>
          <h1 className="page-header__title">Panel de administración</h1>
          <p className="page-header__description">Accede a las herramientas clave para administrar productos y pedidos.</p>
        </header>

        <section className="surface-card surface-card--strong admin-card">
          <h2 className="section-title section-title--medium">Resumen rápido</h2>
          <p className="section-description">
            Usa el menú lateral para navegar entre las distintas áreas administrativas.
            Aquí encontrarás acceso directo a la gestión de productos, la creación de nuevos artículos
            y el seguimiento de pedidos.
          </p>
        </section>
      </main>
    </AdminGuard>
  );
}