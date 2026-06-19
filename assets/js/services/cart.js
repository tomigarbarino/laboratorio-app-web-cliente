const CART_STORAGE_KEY = "ecommerceLabCart";

export function getCart() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    const cart = JSON.parse(storedCart);
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    return [];
  }
}

export function addProductToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  return cart;
}

export function getCartTotalQuantity(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
