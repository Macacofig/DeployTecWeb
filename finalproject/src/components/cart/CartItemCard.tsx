import type { CartItem } from "../../models/cart.model";
import { formatPrice } from "../../utils/currency.util";

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

  const subtotal = price * item.quantity;

  return (

    <div className="cart-item">
      <div>
        <h2 className="cart-item__title">
          {item.product.title}
        </h2>

        <p className="cart-item__meta">
          Precio unitario: {formatPrice(price)}
        </p>

        <p className="cart-item__meta">
          Subtotal: {formatPrice(subtotal)}
        </p>

      </div>

      <div className="cart-item__actions">

        <button
          onClick={onDecrease}
          disabled={item.quantity <= 1}
          className="cart-item__button"
          aria-label="Disminuir cantidad"
        >
          -
        </button>

        <span className="cart-item__meta">
          {item.quantity}
        </span>

        <button
          onClick={onIncrease}
          className="cart-item__button"
          aria-label="Aumentar cantidad"
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