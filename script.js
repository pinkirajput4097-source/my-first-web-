let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Add product to cart
function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

  
}


// Update cart number in navbar
function updateCartCount() {

    let cartCount = document.getElementById("cartCount");

    if (!cartCount) return;

    let totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
}


// Run when page loads
updateCartCount();