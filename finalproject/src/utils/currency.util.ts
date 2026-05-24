export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}