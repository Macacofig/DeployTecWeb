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
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 border-r border-slate-800 p-4 pt-24 overflow-y-auto">
      <h2 className="text-lg font-semibold text-white mb-4">Panel Admin</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded hover:bg-slate-800 transition-colors ${
              pathname === link.href ? "bg-slate-800 text-white" : "text-slate-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}