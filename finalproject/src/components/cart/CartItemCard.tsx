import type { CartItem } from "../../models/cart.model";

interface Props {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {

  const price =
    item.discountedPrice ??
    item.price ??
    item.product.discountedPrice ??
    item.product.price ??
    0;

  return (

    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6">

      <div>

        <h2 className="text-lg font-semibold text-white">
          {item.product.title}
        </h2>

        <p className="mt-2 text-slate-300">
          Cantidad: {item.quantity}
        </p>

        <p className="mt-1 text-slate-300">
          Precio: ${price}
        </p>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={onDecrease}
          className="rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/20"
        >
          -
        </button>

        <button
          onClick={onIncrease}
          className="rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/20"
        >
          +
        </button>

        <button
          onClick={onRemove}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}