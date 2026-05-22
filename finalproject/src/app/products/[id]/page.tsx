interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 lg:px-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">Detalle</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Producto {id}</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Página dinámica lista para consumir el endpoint de detalle por ID del backend y mostrar variantes, stock, imágenes y acciones de compra.</p>
      </div>
    </main>
  );
}