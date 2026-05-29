"use client";

interface Props {
  totalPrice: number;
}

export function CartSummary({
  totalPrice,
}: Props) {

  return (

    <section className="cart-summary">
      <div className="cart-summary__row">
        <h2 className="cart-summary__title">
          Total
        </h2>

        <p className="cart-summary__total">
          ${totalPrice}
        </p>

      </div>

      <button
        className="cart-summary__button"
      >
        Ir al checkout
      </button>

    </section>
  );
}