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
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur lg:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.16),transparent_30%)]" />
      <div className="relative max-w-3xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
          ShopWave Fusion
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">{title}</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300">{description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Productos</p>
            <p className="mt-2 text-2xl font-semibold text-white">{featuredCount}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Estado</p>
            <p className="mt-2 text-2xl font-semibold text-white">{loading ? "..." : isAuthenticated ? "Activo" : "..."}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/products" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Ver catálogo
          </Link>
          <Link href="/profile" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Ir a mi perfil
          </Link>
        </div>
      </div>
    </section>
  );
}