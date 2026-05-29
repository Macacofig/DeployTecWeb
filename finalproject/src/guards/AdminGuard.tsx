
"use client";

import type { ReactNode } from "react";
import type { UserRole } from "@/types/role.type";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

const ADMIN_ROLE: UserRole = "ROLE_ADMIN";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  const { isAuthenticated, loading, user } = useAuth();

  
  useEffect(() => {

    //verificar si es admin
    if (!loading && (!isAuthenticated || user?.role !== ADMIN_ROLE)) {
      
      router.replace("/");
    }
  }, [isAuthenticated, loading, router, user?.role]);

  
  if (loading || !isAuthenticated || user?.role !== ADMIN_ROLE) {
    return <div className="flex min-h-[50vh] items-center justify-center text-slate-300">Validando permisos...</div>;
  }

  return <>{children}</>;
}