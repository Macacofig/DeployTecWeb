"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

// todo lo que este dentro de este componente, requiere auth ( es un hijo )
export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  // hook auth global : si esta autenticado, si esta cargando
  const { isAuthenticated, loading } = useAuth();

  // cuando cambia auth
  useEffect(() => {
    // si terminó cargar
    // y NO está autenticado
    if (!loading && !isAuthenticated) {
      // redirige login
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  // mientras valida auth
  if (loading || !isAuthenticated) {
    return <div className="route-status">Validando sesión...</div>;
  }

  return <>{children}</>;
}