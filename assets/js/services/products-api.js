const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const response = await fetch(PRODUCTS_API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  const products = await response.json();

  if (!Array.isArray(products)) {
    throw new Error("La API devolvio un formato inesperado");
  }

  return products;
}
