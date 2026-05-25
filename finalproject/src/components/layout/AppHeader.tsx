"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function AppHeader() {
  const router = useRouter();
  const { user, isAuthenticated, loading, signOut } = useAuth();

  if (loading || !isAuthenticated) {
    return null;
  }

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/20 text-lg font-bold text-brand-100 ring-1 ring-brand-400/30">
            SW
          </span>
          <div>
            <p className="text-sm font-semibold text-white">ShopWave Fusion</p>
            <p className="text-xs text-slate-400">E-commerce inteligente</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/products" className="text-sm text-slate-300 transition hover:text-white">
            Catálogo
          </Link>
          <Link href="/cart" className="text-sm text-slate-300 transition hover:text-white">
            Carrito
          </Link>
          <Link href="/orders" className="text-sm text-slate-300 transition hover:text-white">
            Pedidos
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sesión activa</p>
            <p className="text-sm font-medium text-slate-100">{user?.firstName ?? "Usuario"}</p>
          </div>
          <Link href="/profile" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
            Perfil
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}