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

    <div className="cart-item">
      <div>
        <h2 className="cart-item__title">
          {item.product.title}
        </h2>

        <p className="cart-item__meta">
          Cantidad: {item.quantity}
        </p>

        <p className="cart-item__meta">
          Precio: ${price}
        </p>

      </div>

      <div className="cart-item__actions">

        <button
          onClick={onDecrease}
          className="cart-item__button"
        >
          -
        </button>

        <button
          onClick={onIncrease}
          className="cart-item__button"
        >
          +
        </button>

        <button
          onClick={onRemove}
          className="cart-item__button cart-item__button--danger"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}