import Link from "next/link";

const sampleProducts = [
  { id: 1, name: "Sudadera premium", price: "$89.900" },
  { id: 2, name: "Zapato casual", price: "$149.900" },
  { id: 3, name: "Bolso urbano", price: "$119.900" },
];

export default function ProductsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 lg:px-10">
      <header className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Catálogo</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Productos</h1>
        <p className="mt-2 text-slate-300">Vista base para listar productos desde el backend con filtros, paginación y detalle por ID.</p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {sampleProducts.map((product) => (
          <article key={product.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Producto {product.id}</p>
            <h2 className="mt-3 text-xl font-semibold text-white">{product.name}</h2>
            <p className="mt-2 text-sm text-slate-300">Interfaz preparada para conectar listados, búsqueda y filtros avanzados.</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-lg font-semibold text-brand-200">{product.price}</span>
              <Link href={`/products/${product.id}`} className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                Ver detalle
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}