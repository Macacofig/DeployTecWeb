"use client";

import type { ReactNode } from "react";
import type { UserRole } from "@/types/role.type";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import AppHeader from "./AppHeader";

const PUBLIC_ROUTES = new Set(["/login", "/register"]);
const ADMIN_ROLE: UserRole = "ROLE_ADMIN";

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
      const redirectPath = user?.role === ADMIN_ROLE ? "/admin" : "/";
      router.replace(redirectPath);
    }
  }, [isAuthenticated, isPublicRoute, loading, router, user?.role]);

  if (loading) {
    return <div className="route-status">Validando sesión...</div>;
  }

  if (!isPublicRoute && !isAuthenticated) {
    return <div className="route-status">Redirigiendo al inicio de sesión...</div>;
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      <AppHeader />
      <div>{children}</div>
    </div>
  );
}