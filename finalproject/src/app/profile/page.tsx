import { AuthGuard } from "../../guards/AuthGuard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <main className="page-shell page-shell--narrow profile-page">
        <header className="profile-page__header">
          <p className="page-header__eyebrow">Perfil</p>
          <h1 className="page-header__title">Mi perfil</h1>
          <p className="page-header__description">Base para ver y editar datos personales del usuario autenticado.</p>
        </header>
        <section className="surface-card admin-card">
          Formulario de perfil y resumen de cuenta listo para conectar.
        </section>
      </main>
    </AuthGuard>
  );
}