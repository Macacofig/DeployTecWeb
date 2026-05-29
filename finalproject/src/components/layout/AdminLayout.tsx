"use client";

import { useCallback, useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <button
          type="button"
          className="admin-topbar__toggle"
          onClick={() => setSidebarOpen((value) => !value)}
          aria-expanded={sidebarOpen}
          aria-label="Abrir menú administrativo"
        >
          <span />
          <span />
          <span />
        </button>
        <div className="admin-topbar__copy">
          <p className="admin-topbar__eyebrow">Panel Admin</p>
          <p className="admin-topbar__title">Gestión móvil y escritorio</p>
        </div>
      </div>

      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}