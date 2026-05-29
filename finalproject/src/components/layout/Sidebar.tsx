"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/products/create", label: "Crear Producto" },
  { href: "/admin/orders", label: "Órdenes" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-sidebar__title">Panel Admin</h2>
      <nav className="admin-sidebar__nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-sidebar__link ${pathname === link.href ? "admin-sidebar__link--active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}