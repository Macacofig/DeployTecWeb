"use client";

interface Props {
  totalPrice: number;
}

export function CartSummary({
  totalPrice,
}: Props) {

  return (

    <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-white">
          Total
        </h2>

        <p className="text-3xl font-bold text-white">
          ${totalPrice}
        </p>

      </div>

      <button
        className="mt-6 rounded-xl bg-brand-200 px-6 py-3 font-semibold text-black transition hover:opacity-90"
      >
        Ir al checkout
      </button>

    </section>
  );
}