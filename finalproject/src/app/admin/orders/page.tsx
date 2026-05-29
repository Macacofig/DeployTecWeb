import { AdminGuard } from "../../../guards/AdminGuard";

export default function AdminOrdersPage() {
  return (
    <AdminGuard>
      <main className="page-shell page-shell--medium admin-page">
        <header className="admin-page__header">
          <p className="page-header__eyebrow">Admin / Pedidos</p>
          <h1 className="page-header__title">Gestión de pedidos</h1>
          <p className="page-header__description">Espacio para revisar estados, despacho y trazabilidad de órdenes.</p>
        </header>
        <section className="surface-card admin-card">
          Vista administrativa preparada para control operacional.
        </section>
      </main>
    </AdminGuard>
  );
}