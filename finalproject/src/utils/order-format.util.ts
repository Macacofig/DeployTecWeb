const ORDER_STATUS_LABELS: Record<string, string> = {
  PLACED: "Realizado",
  CONFIRMED: "Confirmado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
  PENDING: "Pendiente",
};

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  COMPLETED: "Completado",
  PENDING: "Pendiente",
  FAILED: "Fallido",
  REFUNDED: "Reembolsado",
};

function formatEnumLabel(value: string | undefined, labels: Record<string, string>, fallback = "Pendiente") {
  if (!value) return fallback;

  const normalized = value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return labels[value] ?? normalized;
}

export function formatOrderStatus(value?: string) {
  return formatEnumLabel(value, ORDER_STATUS_LABELS);
}

export function formatPaymentStatus(value?: string) {
  return formatEnumLabel(value, PAYMENT_STATUS_LABELS);
}
