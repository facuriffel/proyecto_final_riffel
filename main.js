$(document).ready(function () {
    const productListElement = $('#product-list .products-container');
    const cartItemsElement = $('#cart-items');
    const totalElement = $('#total');
    const checkoutBtn = $('#checkout-btn');
    let products = [];
    let cartItems = [];

    // Cargar productos desde un archivo JSON local
    fetchProducts()
        .then(data => {
            products = data;
            displayProducts();
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
        });

    // Mostrar productos en el DOM
    function displayProducts() {
        productListElement.empty();
        products.forEach(product => {
            const productElement = $(`
                <div class="product" data-id="${product.id}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Precio: $${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn">Agregar al Carrito</button>
                </div>
            `);
            productElement.find('.add-to-cart-btn').click(function () {
                addToCart(product.id);
            });
            productListElement.append(productElement);
        });
    }

    // Cargar productos desde un archivo JSON local
    function fetchProducts() {
        return fetch('products.json')
            .then(response => response.json());
    }

    // Agregar producto al carrito
    function addToCart(productId) {
        const selectedProduct = products.find(product => product.id === productId);
        if (selectedProduct) {
            cartItems.push(selectedProduct);
            displayCartItems();
        }
    }

    // Mostrar elementos del carrito en el DOM
    function displayCartItems() {
        cartItemsElement.empty();
        let totalPrice = 0;
        cartItems.forEach(item => {
            const cartItemElement = $(`
                <li class="cart-item" data-id="${item.id}">
                    <span>${item.name}</span>
                    <span>Precio: $${item.price.toFixed(2)}</span>
                    <button class="remove-from-cart-btn">Quitar</button>
                </li>
            `);
            cartItemElement.find('.remove-from-cart-btn').click(function () {
                removeFromCart(item.id);
            });
            cartItemsElement.append(cartItemElement);
            totalPrice += item.price;
        });
        totalElement.text(totalPrice.toFixed(2));
    }

    // Quitar producto del carrito
    function removeFromCart(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        displayCartItems();
    }

    // Proceso de checkout
    checkoutBtn.click(function () {
        if (cartItems.length > 0) {
            alert('¡Compra realizada con éxito!');
            cartItems = [];
            displayCartItems();
        } else {
            alert('El carrito está vacío. Agrega productos antes de realizar el checkout.');
        }
    });
});
