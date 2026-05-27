import type { ReactNode } from "react";
import AdminLayout from "@/components/layout/AdminLayout";

export default function AdminPageLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
