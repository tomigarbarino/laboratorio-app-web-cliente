import { renderCart } from "./components/cart.js";
import { renderProductDetail } from "./components/product-detail.js";
import { renderLoadingState, renderProducts, renderProductsError } from "./components/products.js";
import {
  addProductToCart,
  clearCart,
  decreaseCartItem,
  getCart,
  getCartTotalQuantity,
  increaseCartItem,
  removeCartItem,
} from "./services/cart.js";
import { getProducts } from "./services/products-api.js";

const productsGrid = document.querySelector("#productsGrid");
const productsCount = document.querySelector("#productsCount");
const searchForm = document.querySelector("#searchForm");
const productSearch = document.querySelector("#productSearch");
const clearSearchButton = document.querySelector("#clearSearchButton");
const cartBadge = document.querySelector("#cartBadge");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartOffcanvasElement = document.querySelector("#cartOffcanvas");
const checkoutButton = document.querySelector("#checkoutButton");
const clearCartButton = document.querySelector("#clearCartButton");
const productDetailModalElement = document.querySelector("#productDetailModal");
const productDetailTitle = document.querySelector("#productDetailTitle");
const productDetailBody = document.querySelector("#productDetailBody");
const addToCartButton = document.querySelector("#addToCartButton");
const appToastElement = document.querySelector("#appToast");
const appToastBody = document.querySelector("#appToastBody");

let products = [];
let selectedProduct = null;
let activeSearchTerm = "";
const bootstrapApi = window.bootstrap;
const productDetailModal = bootstrapApi?.Modal ? new bootstrapApi.Modal(productDetailModalElement) : null;
const appToast = bootstrapApi?.Toast ? new bootstrapApi.Toast(appToastElement, { delay: 2200 }) : null;

function initializeLayoutState() {
  updateCartState(getCart());
}

initializeLayoutState();

async function initializeProducts() {
  try {
    renderLoadingState(productsGrid, productsCount);
    products = await getProducts();
    renderVisibleProducts();
  } catch (error) {
    renderProductsError(productsGrid, productsCount);
  }
}

initializeProducts();

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  activeSearchTerm = productSearch.value.trim();
  renderVisibleProducts();
});

productSearch.addEventListener("input", () => {
  activeSearchTerm = productSearch.value.trim();
  toggleClearSearchButton();
  renderVisibleProducts();
});

clearSearchButton.addEventListener("click", () => {
  productSearch.value = "";
  activeSearchTerm = "";
  toggleClearSearchButton();
  renderVisibleProducts();
  requestAnimationFrame(() => {
    productSearch.focus({ preventScroll: true });
  });
});

cartOffcanvasElement.addEventListener("show.bs.offcanvas", () => {
  updateCartState(getCart());
});

productsGrid.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-product-id]");

  if (!detailButton) {
    return;
  }

  const productId = Number(detailButton.dataset.productId);
  selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return;
  }

  renderProductDetail(selectedProduct, productDetailTitle, productDetailBody);
  addToCartButton.disabled = false;
  productDetailModal?.show();
});

addToCartButton.addEventListener("click", () => {
  if (!selectedProduct) {
    return;
  }

  const cart = addProductToCart(selectedProduct);
  updateCartState(cart);
  productDetailModal?.hide();
  showToast(`${selectedProduct.title} se agrego al carrito`);
});

cartItems.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-cart-action]");

  if (!actionButton) {
    return;
  }

  const productId = Number(actionButton.dataset.productId);
  const action = actionButton.dataset.cartAction;
  let cart = getCart();

  if (action === "increase") {
    cart = increaseCartItem(productId);
  }

  if (action === "decrease") {
    cart = decreaseCartItem(productId);
  }

  if (action === "remove") {
    cart = removeCartItem(productId);
  }

  updateCartState(cart);
});

clearCartButton.addEventListener("click", () => {
  updateCartState(clearCart());
  showToast("Se vacio el carrito");
});

checkoutButton.addEventListener("click", () => {
  updateCartState(clearCart());
  showToast("Compra finalizada correctamente");
});

function updateCartState(cart) {
  updateCartBadge(cart);
  renderCart(cart, cartItems, cartTotal, checkoutButton, clearCartButton);
}

function renderVisibleProducts() {
  renderProducts(getFilteredProducts(), productsGrid, productsCount);
}

function getFilteredProducts() {
  if (!activeSearchTerm) {
    return products;
  }

  const normalizedTerm = normalizeText(activeSearchTerm);

  return products.filter((product) => {
    const searchableText = normalizeText(`${product.title} ${product.description} ${product.category}`);
    return searchableText.includes(normalizedTerm);
  });
}

function toggleClearSearchButton() {
  const shouldHide = productSearch.value.length === 0;
  clearSearchButton.classList.toggle("is-hidden", shouldHide);
  clearSearchButton.disabled = shouldHide;
  clearSearchButton.setAttribute("aria-hidden", String(shouldHide));
}

function normalizeText(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function updateCartBadge(cart) {
  const totalQuantity = getCartTotalQuantity(cart);
  cartBadge.textContent = totalQuantity;
  cartBadge.classList.toggle("visually-hidden", totalQuantity === 0);
}

function showToast(message) {
  appToastBody.textContent = message;
  appToast?.show();
}
