// Hero Slider
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;
function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}
setInterval(nextSlide, 4000);

// Sample products
const products = [
    { productId: "1aa33jd8922", name: "Laptop", category: "High performance laptop", price: 80, old: 100, img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { productId: "23djjyf4JLO", name: "Phone", category: "Latest smartphone", price: 40, old: 60, img: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { productId: "234iuodsfkl", name: "Headphones", category: "Noise cancelling", price: 30, old: 50, img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { productId: "19dk4utkdfg", name: "Watch", category: "Smart watch", price: 70, old: 90, img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=404&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];
function displayProducts(list) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";
    list.forEach((p, i) => {
        container.innerHTML += `
<div class="card">
  <img src="${p.img}">
  <div class="card-body">
    <h3>${p.name}</h3>
    <p>${p.category}</p>
    <span class="price">$${p.price.toLocaleString()}</span>
    <span class="old-price">$${p.old}</span><br><br>
    <button class="add-cart" onclick="addToCart(${i})">Add to Cart</button>
    <button class="buy-now" onclick="buyNow(${i})">Buy Now</button>
  </div>
</div>`;
    });
}
displayProducts(products);
function getCart() { return JSON.parse(localStorage.getItem("cart")) || []; }
function saveCart(cart) { localStorage.setItem("cart", JSON.stringify(cart)); }

// ADD TO CART (API VERSION)
async function addToCart(index) {
    const product = products[index];

    try {
        const res = await fetch("http://localhost:5000/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: product.productId, // unique id
                name: product.name,
                category: product.category,
                rating: product.rating,
                price: product.price,
                img: product.img,
                quantity: 1
            })
        });

        const data = await res.json();
        console.log("Added:", data);

        alert("Added to cart!");
    } catch (err) {
        console.error("Error:", err);
    }
}
async function buyNow(index) {
    const product = products[index];

    try {
        await fetch("http://localhost:5000/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: product.productId, // unique id
                name: product.name,
                category: product.category,
                rating: product.rating,
                price: product.price,
                img: product.img,
                quantity: 1
            })
        });

        // redirect after adding
        window.location.href = "src/cart.html";

    } catch (err) {
        console.error(err);
    }
}

// Sample reviews
const reviews = [
    { name: "Alice", rating: 5, comment: "Excellent service!", img: "https://randomuser.me/api/portraits/women/1.jpg" },
    { name: "Bob", rating: 4, comment: "Good quality products.", img: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Clara", rating: 5, comment: "Fast delivery and support!", img: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "David", rating: 4, comment: "Very satisfied.", img: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Eva", rating: 5, comment: "Highly recommend!", img: "https://randomuser.me/api/portraits/women/5.jpg" },
    { name: "Frank", rating: 4, comment: "Great products.", img: "https://randomuser.me/api/portraits/men/6.jpg" },
    { name: "Grace", rating: 5, comment: "Amazing experience!", img: "https://randomuser.me/api/portraits/women/7.jpg" },
    { name: "Harry", rating: 4, comment: "Will buy again.", img: "https://randomuser.me/api/portraits/men/8.jpg" },
    { name: "Ivy", rating: 5, comment: "Loved it!", img: "https://randomuser.me/api/portraits/women/9.jpg" },
    { name: "Jack", rating: 4, comment: "Good support team.", img: "https://randomuser.me/api/portraits/men/10.jpg" }
];
const reviewsContainer = document.getElementById("reviewsContainer");
reviews.forEach(r => {
    let stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
    reviewsContainer.innerHTML += `
<div class="review-card">
<img src="${r.img}">
<h4>${r.name}</h4>
<div class="rating">${stars}</div>
<p>${r.comment}</p>
</div>`;
});

// FAQ Section
const faqs = [
    { q: "What is MyShop?", a: "MyShop is an online store for electronics, fashion, home products, and more." },
    { q: "How can I track my order?", a: "You can track your order in your account dashboard." },
    { q: "What payment methods are accepted?", a: "We accept credit cards, debit cards, and PayPal." },
    { q: "Do you ship internationally?", a: "Yes, we provide worldwide shipping." },
    { q: "Can I return a product?", a: "Yes, you can return products within 14 days." }
];
const faqContainer = document.getElementById("faqContainer");
faqs.forEach(f => {
    faqContainer.innerHTML += `
<div class="faq-item">
<h4>${f.q}</h4>
<p>${f.a}</p>
</div>`;
});
document.querySelectorAll(".faq-item h4").forEach(el => {
    el.addEventListener("click", () => {
        const p = el.nextElementSibling;
        p.style.display = (p.style.display === "block") ? "none" : "block";
    });
});

// Newsletter
function subscribeNewsletter() {
    const email = document.getElementById("newsletterEmail").value;
    if (email) { alert("Subscribed with " + email); document.getElementById("newsletterEmail").value = ""; }
}

// Contact Popup
setTimeout(() => { document.getElementById("contactPopup").style.display = "flex"; }, 10000);
function closePopup() { document.getElementById("contactPopup").style.display = "none"; }
function sendPopup() {
    const name = document.getElementById("popupName").value;
    const email = document.getElementById("popupEmail").value;
    const question = document.getElementById("popupQuestion").value;
    if (name && email && question) { alert("Thank you " + name + "! We will contact you shortly."); closePopup(); }
    else { alert("Please fill all fields."); }
}
