const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
});

export function renderLoadingState(productsGrid, productsCount) {
  productsCount.textContent = "Cargando...";
  productsGrid.innerHTML = "";

  const column = document.createElement("div");
  column.className = "col-12";

  const state = document.createElement("div");
  state.className = "loading-state text-center";
  state.setAttribute("role", "status");

  const spinner = document.createElement("div");
  spinner.className = "spinner-border text-success";
  spinner.setAttribute("aria-hidden", "true");

  const text = document.createElement("p");
  text.className = "text-secondary mt-3 mb-0";
  text.textContent = "Cargando productos...";

  state.append(spinner, text);
  column.append(state);
  productsGrid.append(column);
}

export function renderProducts(products, productsGrid, productsCount) {
  productsGrid.innerHTML = "";
  productsCount.textContent = `${products.length} productos`;

  if (products.length === 0) {
    renderEmptyState(productsGrid);
    return;
  }

  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    fragment.append(createProductCard(product));
  });

  productsGrid.append(fragment);
}

export function renderProductsError(productsGrid, productsCount) {
  productsCount.textContent = "0 productos";
  productsGrid.innerHTML = "";

  const column = document.createElement("div");
  column.className = "col-12";

  const state = document.createElement("div");
  state.className = "empty-state text-center";
  state.setAttribute("role", "alert");

  const icon = document.createElement("i");
  icon.className = "bi bi-exclamation-triangle";
  icon.setAttribute("aria-hidden", "true");

  const title = document.createElement("h3");
  title.className = "h5 mt-3";
  title.textContent = "No pudimos cargar el catalogo";

  const text = document.createElement("p");
  text.className = "text-secondary mb-0";
  text.textContent = "Revisa tu conexion e intenta nuevamente.";

  state.append(icon, title, text);
  column.append(state);
  productsGrid.append(column);
}

function createProductCard(product) {
  const column = document.createElement("div");
  column.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

  const card = document.createElement("article");
  card.className = "card product-card h-100";

  const image = document.createElement("img");
  image.className = "card-img-top";
  image.src = product.image;
  image.alt = `Imagen de ${product.title}`;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body d-flex flex-column";

  const category = document.createElement("p");
  category.className = "product-category mb-2";
  category.textContent = product.category;

  const title = document.createElement("h3");
  title.className = "card-title h6";
  title.textContent = product.title;

  const price = document.createElement("p");
  price.className = "product-price mt-auto mb-3";
  price.textContent = priceFormatter.format(product.price);

  const button = document.createElement("button");
  button.className = "btn btn-outline-dark w-100";
  button.type = "button";
  button.dataset.productId = product.id;
  button.textContent = "Ver detalle";

  body.append(category, title, price, button);
  card.append(image, body);
  column.append(card);

  return column;
}

function renderEmptyState(productsGrid) {
  const column = document.createElement("div");
  column.className = "col-12";

  const state = document.createElement("div");
  state.className = "empty-state text-center";

  const icon = document.createElement("i");
  icon.className = "bi bi-bag";
  icon.setAttribute("aria-hidden", "true");

  const title = document.createElement("h3");
  title.className = "h5 mt-3";
  title.textContent = "No hay productos para mostrar";

  const text = document.createElement("p");
  text.className = "text-secondary mb-0";
  text.textContent = "Actualiza el catalogo o intenta nuevamente mas tarde.";

  state.append(icon, title, text);
  column.append(state);
  productsGrid.append(column);
}
