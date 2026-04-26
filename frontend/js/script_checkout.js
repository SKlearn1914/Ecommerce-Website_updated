// Format card number (1234 5678 9012 3456)
document.getElementById("cardNumber").addEventListener("input", function () {
    this.value = this.value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
});

// Expiry MM/YY
document.getElementById("expiry").addEventListener("input", function () {
    this.value = this.value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d+)/, '$1/$2');
});

// CVV only numbers
document.getElementById("cvv").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');
});

function placeOrder() {
    const name = document.getElementById("name").value.trim();
    const card = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const method = document.getElementById("paymentMethod").value;

    if (!name || !card || !expiry || !cvv) {
        alert("Please fill all fields!");
        return;
    }

    if (card.replace(/\s/g, '').length < 16) {
        alert("Invalid card number!");
        return;
    }

    if (cvv.length < 3) {
        alert("Invalid CVV!");
        return;
    }

    alert("✅ Order Placed Successfully!");
}