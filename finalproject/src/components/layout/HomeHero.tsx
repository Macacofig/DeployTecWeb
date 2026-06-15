"use client";

import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

interface HomeHeroProps {
  featuredCount: number;
}

export default function HomeHero({ featuredCount }: HomeHeroProps) {
  const { user, isAuthenticated, loading } = useAuth();

  const title = `Bienvenido, ${user?.firstName ?? "usuario"}`;
  const description = "Ya tienes tu sesión activa. Explora el catálogo, revisa tus pedidos o entra a tu perfil desde el panel superior.";

  return (
    <section className="hero-card">
      <div className="hero-card__content">
        <span className="hero-card__badge">
          ShopWave Fusion
        </span>
        <div>
          <h1 className="hero-card__title">{title}</h1>
          <p className="hero-card__description">{description}</p>
        </div>

        <div className="hero-card__stats">
          <div className="hero-stat">
            <p className="hero-stat__label">Productos</p>
            <p className="hero-stat__value">{featuredCount}</p>
          </div>

          <div className="hero-stat">
            <p className="hero-stat__label">Estado</p>
            <p className="hero-stat__value">{loading ? "..." : isAuthenticated ? "Activo" : "..."}</p>
          </div>
        </div>

        <div className="hero-card__actions">
          <Link href="/products" className="hero-card__action hero-card__action--primary">
            Ver catálogo
          </Link>
          <Link href="/profile" className="hero-card__action hero-card__action--secondary">
            Ir a mi perfil
          </Link>
        </div>
      </div>
    </section>
  );
}