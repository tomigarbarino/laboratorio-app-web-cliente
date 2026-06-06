import { getProducts } from "./api.js";
import { renderLoadingState, renderProducts, renderProductsError } from "./products.js";

const productsGrid = document.querySelector("#productsGrid");
const productsCount = document.querySelector("#productsCount");
const cartBadge = document.querySelector("#cartBadge");
const checkoutButton = document.querySelector("#checkoutButton");
const clearCartButton = document.querySelector("#clearCartButton");

function initializeLayoutState() {
  if (cartBadge) {
    cartBadge.classList.add("visually-hidden");
  }

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
    const products = await getProducts();
    renderProducts(products, productsGrid, productsCount);
  } catch (error) {
    renderProductsError(productsGrid, productsCount);
  }
}

initializeProducts();
