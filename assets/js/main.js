import { addProductToCart, getCart, getCartTotalQuantity } from "./cart.js";
import { getProducts } from "./api.js";
import { renderProductDetail } from "./product-detail.js";
import { renderLoadingState, renderProducts, renderProductsError } from "./products.js";

const productsGrid = document.querySelector("#productsGrid");
const productsCount = document.querySelector("#productsCount");
const cartBadge = document.querySelector("#cartBadge");
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
const productDetailModal = new bootstrap.Modal(productDetailModalElement);
const appToast = new bootstrap.Toast(appToastElement, { delay: 2200 });

function initializeLayoutState() {
  updateCartBadge(getCart());

  if (checkoutButton) {
    checkoutButton.disabled = true;
  }

  if (clearCartButton) {
    clearCartButton.disabled = true;
  }
}

initializeLayoutState();

async function initializeProducts() {
  try {
    renderLoadingState(productsGrid, productsCount);
    products = await getProducts();
    renderProducts(products, productsGrid, productsCount);
  } catch (error) {
    renderProductsError(productsGrid, productsCount);
  }
}

initializeProducts();

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
  productDetailModal.show();
});

addToCartButton.addEventListener("click", () => {
  if (!selectedProduct) {
    return;
  }

  const cart = addProductToCart(selectedProduct);
  updateCartBadge(cart);
  productDetailModal.hide();
  showToast(`${selectedProduct.title} se agrego al carrito`);
});

function updateCartBadge(cart) {
  const totalQuantity = getCartTotalQuantity(cart);
  cartBadge.textContent = totalQuantity;
  cartBadge.classList.toggle("visually-hidden", totalQuantity === 0);
}

function showToast(message) {
  appToastBody.textContent = message;
  appToast.show();
}
