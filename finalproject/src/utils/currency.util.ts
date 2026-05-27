export function formatPrice(amount: number, currency = "USD"): string {
  // "es-BO" usa formato Bolivia/español
  return new Intl.NumberFormat("es-BO", {
    // style currency -> moneda
    style: "currency",
     // moneda por defecto USD
    currency,
    // siempre mostrar 2 decimales
    minimumFractionDigits: 2,
  }).format(amount);
}