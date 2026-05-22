import Link from "next/link";

const featureCards = [
  {
    title: "Arquitectura modular",
    description: "Rutas, servicios, contextos y guards separados para crecer en equipo sin acoplamiento innecesario.",
  },
  {
    title: "JWT listo para backend",
    description: "Axios centralizado con soporte para el token emitido por Spring Boot en el header Authorization.",
  },
  {
    title: "Tailwind configurado",
    description: "Base visual limpia, reusable y rápida para construir vistas de productos, carrito y administración.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 lg:px-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
            ShopWave Fusion Frontend
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Arquitectura profesional para escalar en equipo.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Base organizada con Next.js App Router, TypeScript, Tailwind, Axios y una capa preparada para integrar autenticación JWT, catálogo, carrito, checkout y administración.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
              Ver productos
            </Link>
            <Link href="/login" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 py-8 md:grid-cols-3">
        {featureCards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-lg font-semibold text-white">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 pb-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["/login", "Login"],
          ["/register", "Registro"],
          ["/cart", "Carrito"],
          ["/admin", "Admin"],
        ].map(([href, label]) => (
          <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm font-medium text-white transition hover:border-brand-400/40 hover:bg-white/10">
            {label}
          </Link>
        ))}
      </section>
    </main>
  );
}
