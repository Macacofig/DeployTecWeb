"use client";

import type { Order } from "../../models/order.model";

interface Props {
  order: Order;
}

export function OrderCard({
  order,
}: Props) {

  return (
    <div className="order-card">
      <div className="order-card__header">
        <div>
          <h2 className="order-card__title">
            Orden #{order.id}
          </h2>

          <p className="order-card__meta">
            Estado:
            {" "}
            {order.orderStatus ?? "Pendiente"}
          </p>

          <p className="order-card__meta">
            Pago:
            {" "}
            {order.paymentStatus ?? "Pendiente"}
          </p>

        </div>

        <div>

          <p className="order-card__amount">
            ${order.totalPrice}
          </p>

        </div>

      </div>

      <div className="order-card__items">

        {order.orderItems?.map((item) => (
          <div
            key={item.id}
            className="order-card__item"
          >

            <div>

              <p className="order-card__item-name">
                {item.product.title}
              </p>

              <p className="order-card__meta">
                Cantidad:
                {" "}
                {item.quantity}
              </p>

            </div>

            <p className="order-card__item-price">
              $
              {
                (
                  item.discountedPrice ??
                  item.price ??
                  item.product.discountedPrice ??
                  item.product.price ??
                  0
                ) * item.quantity
              }
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}