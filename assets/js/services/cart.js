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

  return saveCart(cart);
}

export function increaseCartItem(productId) {
  const cart = getCart();
  const product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity += 1;
  }

  return saveCart(cart);
}

export function decreaseCartItem(productId) {
  const cart = getCart();
  const product = cart.find((item) => item.id === productId);

  if (product && product.quantity > 1) {
    product.quantity -= 1;
  }

  return saveCart(cart);
}

export function removeCartItem(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  return saveCart(cart);
}

export function clearCart() {
  return saveCart([]);
}

export function getCartTotalQuantity(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotalPrice(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  return cart;
}
