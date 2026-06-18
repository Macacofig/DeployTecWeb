"use client";

import type { Order } from "../../models/order.model";
import { formatPrice } from "../../utils/currency.util";
import { formatOrderStatus, formatPaymentStatus } from "../../utils/order-format.util";

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
            {formatOrderStatus(order.orderStatus)}
          </p>

          <p className="order-card__meta">
            Pago:
            {" "}
            {formatPaymentStatus(order.paymentDetails?.status ?? order.paymentStatus)}
          </p>

        </div>

        <div>

          <p className="order-card__amount">
            {formatPrice(order.totalPrice ?? 0)}
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
              {formatPrice(
                item.discountedPrice ??
                  item.price ??
                  ((item.product.discountedPrice ?? item.product.price ?? 0) * item.quantity)
              )}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}
