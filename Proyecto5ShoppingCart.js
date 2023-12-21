const cartCount = document.getElementById('cart');
let cartItems = 0;
let cartProducts = [];





function searchMakeupProducts(productIds) {
  var endpoint = 'http://makeup-api.herokuapp.com/api/v1/products.json';

  fetch(endpoint + '?product_ids=' + productIds)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      var productDetails = document.getElementById('productDetails');
      productDetails.innerHTML = '';



      if (data.length > 0) {
        var product = data[501];
        var productTable = document.createElement('table');
        productTable.innerHTML = '<tr><td class="imagenApi"><img src="' + product.image_link + '" alt="' + product.name + '"></td>' +
          '<td><table>' +
          '<tr><th class="productoNombre">Name</th><td >' + product.name + '</td></tr>' +
          '<tr><th class="productoBrand">Brand</th><td >' + product.brand + '</td></tr>' +
          '<tr><th class="descripcionApi">Description</th><td >' + product.description + '</td></tr>' +
          '</table></td></tr>';

        productDetails.appendChild(productTable);
      } else {
        productDetails.textContent = 'No products found.';
      }

      //hasta la linea 42 esto son funciones y variables que introducen el botonn de corazon y carrito

      const cartButtonContainer = document.getElementById('cartButtonContainer');


      const cartButton = document.createElement('button');
      cartButton.textContent = '🛒';
      cartButton.classList.add('cart-button');
      cartButtonContainer.appendChild(cartButton);
      cartButton.addEventListener('click', () => {
        addToCart(product);
      });


    })
    .catch(function (error) {
      console.log('Error:', error);
    });
}

function addToCart(product) {
  cartItems++;
  cartProducts.push(product);
  cartCount.textContent = `🛒: ${cartItems}`;
cartCount.addEventListener('click', () => {
  openCartPage();
});
}

function openCartPage() {
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  window.location.href = '../html/carrito.html';
}

// Llamar a searchMakeupProducts() después de cargar la página
searchMakeupProducts('productIds');



