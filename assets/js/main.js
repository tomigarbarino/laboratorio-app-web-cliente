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
