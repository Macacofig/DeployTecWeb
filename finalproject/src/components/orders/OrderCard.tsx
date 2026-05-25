"use client";

import type { Order } from "../../models/order.model";

interface Props {
  order: Order;
}

export function OrderCard({
  order,
}: Props) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-semibold text-white">
            Orden #{order.id}
          </h2>

          <p className="mt-2 text-slate-300">
            Estado:
            {" "}
            {order.orderStatus ?? "Pendiente"}
          </p>

          <p className="mt-1 text-slate-300">
            Pago:
            {" "}
            {order.paymentStatus ?? "Pendiente"}
          </p>

        </div>

        <div>

          <p className="text-3xl font-bold text-white">
            ${order.totalPrice}
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4 border-t border-white/10 pt-6">

        {order.orderItems?.map((item) => (

          <div
            key={item.id}
            className="flex items-center justify-between"
          >

            <div>

              <p className="text-white">
                {item.product.title}
              </p>

              <p className="text-sm text-slate-400">
                Cantidad:
                {" "}
                {item.quantity}
              </p>

            </div>

            <p className="text-white">
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