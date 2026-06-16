"use client";

import Link from "next/link";
import { formatPrice } from "../../utils/currency.util";

interface Props {
  totalPrice: number;
  itemCount?: number;
}

export function CartSummary({
  totalPrice,
  itemCount = 0,
}: Props) {

  return (

    <section className="cart-summary">
      <div className="cart-summary__row">
        <h2 className="cart-summary__title">
          Total
        </h2>

        <p className="cart-summary__total">
          {formatPrice(totalPrice)}
        </p>

      </div>

      <Link
        href="/checkout"
        className={`cart-summary__button${itemCount === 0 ? " cart-summary__button--disabled" : ""}`}
        aria-disabled={itemCount === 0}
        onClick={(e) => itemCount === 0 && e.preventDefault()}
      >
        Ir al checkout
      </Link>

    </section>
  );
}