let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Show cart
function displayCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <a href="index.html">Go to Home</a>
            </div>
        `;

        updateBill();

        return;
    }


    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>
                    <h3>${item.name}</h3>
                    <p>₹${item.price} each</p>
                </div>


                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <strong>
                    ₹${itemTotal}
                </strong>


                <button
                    class="remove"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        `;

    });


    updateBill();
}


// Increase quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

}


// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}


// Remove product
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// Save cart
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// Calculate bill
function updateBill() {

    let subtotal = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );


    let delivery = cart.length > 0 ? 40 : 0;

    let tax = Math.round(subtotal * 0.05);

    let total = subtotal + delivery + tax;


    document.getElementById("subtotal").textContent =
        "₹" + subtotal;

    document.getElementById("delivery").textContent =
        "₹" + delivery;

    document.getElementById("tax").textContent =
        "₹" + tax;

    document.getElementById("total").textContent =
        "₹" + total;


    let cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").textContent =
        cartCount;
}


// Checkout
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("cart");

    cart = [];

    displayCart();

}


displayCart();