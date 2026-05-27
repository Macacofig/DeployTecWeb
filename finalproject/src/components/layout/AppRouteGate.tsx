"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import AppHeader from "./AppHeader";

const PUBLIC_ROUTES = new Set(["/login", "/register"]);

export default function AppRouteGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, user } = useAuth();

  const isPublicRoute = pathname ? PUBLIC_ROUTES.has(pathname) : false;

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isPublicRoute && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (isPublicRoute && isAuthenticated) {
      const redirectPath = user?.role === "ROLE_ADMIN" ? "/admin" : "/";
      router.replace(redirectPath);
    }
  }, [isAuthenticated, isPublicRoute, loading, router, user?.role]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-300">Validando sesión...</div>;
  }

  if (!isPublicRoute && !isAuthenticated) {
    return <div className="flex min-h-screen items-center justify-center text-slate-300">Redirigiendo al inicio de sesión...</div>;
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
}