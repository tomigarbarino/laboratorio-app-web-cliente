import { getCartTotalPrice } from "../services/cart.js";
import { formatPrice } from "../utils/formatters.js";

export function renderCart(cart, cartItems, cartTotal, checkoutButton, clearCartButton) {
  cartItems.innerHTML = "";

  const hasItems = cart.length > 0;
  checkoutButton.disabled = !hasItems;
  clearCartButton.disabled = !hasItems;
  cartTotal.textContent = formatPrice(getCartTotalPrice(cart));

  if (!hasItems) {
    renderEmptyCart(cartItems);
    return;
  }

  const fragment = document.createDocumentFragment();

  cart.forEach((item) => {
    fragment.append(createCartItem(item));
  });

  cartItems.append(fragment);
}

function createCartItem(item) {
  const wrapper = document.createElement("article");
  wrapper.className = "cart-item";

  const image = document.createElement("img");
  image.className = "cart-item-image";
  image.src = item.image;
  image.alt = `Imagen de ${item.title}`;

  const content = document.createElement("div");
  content.className = "cart-item-content";

  const title = document.createElement("h3");
  title.className = "cart-item-title";
  title.textContent = item.title;

  const price = document.createElement("p");
  price.className = "cart-item-price";
  price.textContent = `${formatPrice(item.price)} c/u`;

  const footer = document.createElement("div");
  footer.className = "cart-item-footer";

  const controls = document.createElement("div");
  controls.className = "cart-quantity";

  const decreaseButton = document.createElement("button");
  decreaseButton.className = "btn btn-outline-dark btn-sm";
  decreaseButton.type = "button";
  decreaseButton.dataset.cartAction = "decrease";
  decreaseButton.dataset.productId = item.id;
  decreaseButton.disabled = item.quantity === 1;
  decreaseButton.setAttribute("aria-label", `Restar unidad de ${item.title}`);
  decreaseButton.textContent = "-";

  const quantity = document.createElement("span");
  quantity.className = "cart-quantity-value";
  quantity.textContent = item.quantity;

  const increaseButton = document.createElement("button");
  increaseButton.className = "btn btn-outline-dark btn-sm";
  increaseButton.type = "button";
  increaseButton.dataset.cartAction = "increase";
  increaseButton.dataset.productId = item.id;
  increaseButton.setAttribute("aria-label", `Sumar unidad de ${item.title}`);
  increaseButton.textContent = "+";

  controls.append(decreaseButton, quantity, increaseButton);

  const subtotal = document.createElement("strong");
  subtotal.className = "cart-item-subtotal";
  subtotal.textContent = formatPrice(item.price * item.quantity);

  const removeButton = document.createElement("button");
  removeButton.className = "btn btn-outline-danger btn-sm cart-remove-button";
  removeButton.type = "button";
  removeButton.dataset.cartAction = "remove";
  removeButton.dataset.productId = item.id;
  removeButton.setAttribute("aria-label", `Eliminar ${item.title} del carrito`);
  removeButton.innerHTML = '<i class="bi bi-trash" aria-hidden="true"></i>';

  footer.append(controls, subtotal, removeButton);
  content.append(title, price, footer);
  wrapper.append(image, content);

  return wrapper;
}

function renderEmptyCart(cartItems) {
  const state = document.createElement("div");
  state.className = "empty-cart text-center";

  const icon = document.createElement("i");
  icon.className = "bi bi-cart";
  icon.setAttribute("aria-hidden", "true");

  const title = document.createElement("h3");
  title.className = "h6 mt-3";
  title.textContent = "Tu carrito esta vacio";

  const text = document.createElement("p");
  text.className = "text-secondary mb-0";
  text.textContent = "Agrega productos para verlos aca.";

  state.append(icon, title, text);
  cartItems.append(state);
}
