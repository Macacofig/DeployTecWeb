"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (loading || !isAuthenticated) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link href="/" className="app-header__brand">
          <span className="app-header__brand-mark">
            SW
          </span>
          <div className="app-header__brand-copy">
            <p className="app-header__brand-title">ShopWave Fusion</p>
            <p className="app-header__brand-subtitle">E-commerce inteligente</p>
          </div>
        </Link>

        <button
          type="button"
          className="app-header__mobile-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú de navegación"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="app-header__nav">
          <Link href="/products" className="app-header__nav-link">
            Catálogo
          </Link>
          <Link href="/cart" className="app-header__nav-link">
            Carrito
          </Link>
          <Link href="/orders" className="app-header__nav-link">
            Pedidos
          </Link>
        </nav>

        <div className="app-header__actions">
          <div className="app-header__user">
            <p className="app-header__user-label">Sesión activa</p>
            <p className="app-header__user-name">{user?.firstName ?? "Usuario"}</p>
          </div>
          <Link href="/profile" className="app-header__button app-header__button--ghost">
            Perfil
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="app-header__button app-header__button--solid"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className={`app-header__mobile-menu ${menuOpen ? "app-header__mobile-menu--open" : ""}`}>
        <div className="app-header__mobile-user">
          <p className="app-header__user-label">Sesión activa</p>
          <p className="app-header__user-name">{user?.firstName ?? "Usuario"}</p>
        </div>

        <nav className="app-header__mobile-nav">
          <Link href="/products" className="app-header__mobile-link">
            Catálogo
          </Link>
          <Link href="/cart" className="app-header__mobile-link">
            Carrito
          </Link>
          <Link href="/orders" className="app-header__mobile-link">
            Pedidos
          </Link>
        </nav>

        <div className="app-header__mobile-actions">
          <Link href="/profile" className="app-header__button app-header__button--ghost">
            Perfil
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="app-header__button app-header__button--solid"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}