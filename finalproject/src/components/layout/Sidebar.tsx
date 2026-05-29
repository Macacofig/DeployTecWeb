"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/products/create", label: "Crear Producto" },
  { href: "/admin/orders", label: "Órdenes" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouter();
  const {signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <button
        type="button"
        className={`admin-sidebar__overlay ${open ? "admin-sidebar__overlay--open" : ""}`}
        onClick={onClose}
        aria-label="Cerrar menú administrativo"
      />

      <aside className={`admin-sidebar ${open ? "admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar__header">
          <h2 className="admin-sidebar__title">Panel Admin</h2>
          <button type="button" className="admin-sidebar__close" onClick={onClose} aria-label="Cerrar menú administrativo">
            ×
          </button>
        </div>
        <nav className="admin-sidebar__nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-sidebar__link ${pathname === link.href ? "admin-sidebar__link--active" : ""}`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}

          <div className="admin-sidebar__actions">
            <Link href="/profile" className="app-header__button app-header__button--ghost">
              Perfil
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="app-header__button app-header__button--solid"
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}