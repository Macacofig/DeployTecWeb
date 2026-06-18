import { AdminGuard } from "../../../guards/AdminGuard";
import ProductTable from "@/components/admin/ProductTable";

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <main className="page-shell page-shell--medium admin-page">
        <header className="admin-page__header">
          <p className="page-header__eyebrow">Admin / Productos</p>
          <h1 className="page-header__title">Gestión de productos</h1>
          <p className="page-header__description">Estructura para crear, editar, eliminar y publicar catálogo.</p>
        </header>
        <section>
          <ProductTable />
        </section>
      </main>
    </AdminGuard>
  );
}