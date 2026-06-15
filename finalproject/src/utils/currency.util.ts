export function formatPrice(amount: number, currency = "BOB"): string {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
