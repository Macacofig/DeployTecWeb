"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "ROLE_ADMIN")) {
      router.replace("/");
    }
  }, [isAuthenticated, loading, router, user?.role]);

  if (loading || !isAuthenticated || user?.role !== "ROLE_ADMIN") {
    return <div className="route-status">Validando permisos...</div>;
  }

  return <>{children}</>;
}