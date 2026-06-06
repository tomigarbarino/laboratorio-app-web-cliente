const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
});

export function renderProductDetail(product, productDetailTitle, productDetailBody) {
  productDetailTitle.textContent = product.title;
  productDetailBody.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "product-detail";

  const image = document.createElement("img");
  image.className = "product-detail-image";
  image.src = product.image;
  image.alt = `Imagen de ${product.title}`;

  const content = document.createElement("div");

  const category = document.createElement("p");
  category.className = "product-category mb-2";
  category.textContent = product.category;

  const price = document.createElement("p");
  price.className = "product-detail-price mb-3";
  price.textContent = priceFormatter.format(product.price);

  const description = document.createElement("p");
  description.className = "product-detail-description mb-0";
  description.textContent = product.description;

  content.append(category, price, description);
  wrapper.append(image, content);
  productDetailBody.append(wrapper);
}
