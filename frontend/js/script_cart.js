
// FETCH DEBUG
fetch("http://localhost:5000/api/cart/all")
    .then(res => res.json())
    .then(data => {
        console.log("Cart Data from DB:", data);
    });


// DISPLAY CART
async function displayCart() {
    const container = document.getElementById("cartContainer");
    const totalDiv = document.getElementById("totalPrice");

    let res = await fetch("http://localhost:5000/api/cart/all");
    let cart = await res.json();

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        container.innerHTML += `
        <div class="card">
            <img src="${item.img}">
            <div class="card-body">
                <h3>${item.name}</h3>
                <p>${item.category || ""}</p>
                <span class="price">$${item.price}</span>

                <strong>${item.quantity}</strong> = $${item.price * item.quantity}
                <br><br>

                <button onclick="changeQuantity('${item.productId}', -1)">-</button>
                <button onclick="changeQuantity('${item.productId}', 1)">+</button>
                <button onclick="removeItem('${item.productId}')">Remove</button>
            </div>
        </div>`;
    });

    totalDiv.innerHTML = `
        Total: $${total}
        <br><br>
        <button onclick="checkoutAll()">Checkout All</button>
    `;
}
// CHANGE QUANTITY (FIXED)
async function changeQuantity(productId, delta) {

    let res = await fetch("http://localhost:5000/api/cart/all");
    let cart = await res.json();
    let item = cart.find(i => i.productId === productId);

    if (!item) return;
    let newQty = item.quantity + delta;

    // 🚫 prevent going below 1
    if (newQty < 1) {
        item.quantity = 1
    }
    await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId: productId,
            quantity: item.quantity + delta
        })
    });

    displayCart();
}


// REMOVE ITEM (FIXED)
async function removeItem(productId) {
    await fetch("http://localhost:5000/api/cart/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId })
    });

    displayCart();
}


// CHECKOUT SINGLE
function checkoutSingle(index) {
    fetch("http://localhost:5000/api/cart/all")
        .then(res => res.json())
        .then(cart => {
            let checkoutList = [];
            checkoutList.push(cart[index]);

            localStorage.setItem("checkout", JSON.stringify(checkoutList));
            window.location.href = "/checkout";
        });
}


// CHECKOUT ALL
function checkoutAll() {
    fetch("http://localhost:5000/api/cart/all")
        .then(res => res.json())
        .then(cart => {

            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            localStorage.setItem("checkout", JSON.stringify(cart));
            window.location.href = "/checkout";
        });
}


// INIT
displayCart();