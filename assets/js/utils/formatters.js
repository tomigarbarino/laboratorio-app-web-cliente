const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value) {
  return priceFormatter.format(value);
}
