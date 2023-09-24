var featuredProductsRequest = new XMLHttpRequest();
var featuredUrl = 'http://localhost/sas/assets/featured-products.json'+'?'+new Date();
var suggestedProductsRequest = new XMLHttpRequest();
var suggestedUrl = 'http://localhost/sas/assets/suggested-products.json'+'?'+new Date();

// Function to display products in a container
function displayProducts(products, containerId) {
  let productsString = '';
  var productContainer = document.getElementById(containerId);

  for (var product of products) {
    var productId = `product-${products.indexOf(product) + 1}`;
    var addToCartId = `add-to-cart-${products.indexOf(product) + 1}`;
    var quantityInputId = `quantity-input-${products.indexOf(product) + 1}`;

    productsString += `<div class="product" id="${productId}">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <div class="quantity">
        <button class="quantity-btn" onclick="decreaseQuantity('${quantityInputId}')">-</button>
        <input type="number" id="${quantityInputId}" value="1" min="1">
        <button class="quantity-btn" onclick="increaseQuantity('${quantityInputId}')">+</button>
      </div>
      <a href="#" id="${addToCartId}" class="btn">Add to Cart</a>
    </div>`;
  }

  productContainer.innerHTML = productsString;
}

function increaseQuantity(inputId) {
  var inputElement = document.getElementById(inputId);
  var currentQuantity = parseInt(inputElement.value, 10);
  inputElement.value = currentQuantity + 1;
}

function decreaseQuantity(inputId) {
  var inputElement = document.getElementById(inputId);
  var currentQuantity = parseInt(inputElement.value, 10);
  if (currentQuantity > 1) {
    inputElement.value = currentQuantity - 1;
  }
}




featuredProductsRequest.onload = function () {

  if (featuredProductsRequest.status === 200) {
    var featuredProducts = JSON.parse(this.responseText);
    displayProducts(featuredProducts.products, "featured-products-container");
  } else {
    console.error('Error fetching featured products data.');
  }
};

featuredProductsRequest.open('GET', featuredUrl, true);
featuredProductsRequest.send();

suggestedProductsRequest.onload = function () {

  if (suggestedProductsRequest.status === 200) {
    var suggestedProducts = JSON.parse(this.responseText);
    displayProducts(suggestedProducts.products, "suggested-products-container");
  } else {
    console.error('Error fetching suggested products data.');
  }
};
suggestedProductsRequest.open('GET', suggestedUrl, true);
suggestedProductsRequest.send();
