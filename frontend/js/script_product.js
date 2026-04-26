// Sample product objects
// const products = [
// { productId: "1aa33jd8922", name: "Laptop", category: "Electronic", price: 46.8, rating: 4.3, quantity: 400, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
// { productId: "23djjyf4JLO", name: "Phone", category: "Electronic", price: 32, rating: 4.6, quantity: 800, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
// { productId: "234iuodsfkl", name: "Headphones", category: "Electronic", price: 54, rating: 4.5, quantity: 500, img: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
// { productId: "12lksadf334", name: "Watch", category: "Electronic", price: 28, rating: 4.7, quantity: 1000, img: "https://plus.unsplash.com/premium_photo-1728759436968-db4b52249ffa?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
// { productId: "19dk4utkdfg", name: "Camera", category: "Electronic", price: 65, rating: 4.4, quantity: 300, img: "https://plus.unsplash.com/premium_photo-1711136677946-27ffc2a8cf7b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
// ];



const container = document.getElementById('product-container');
async function renderProducts() {
  let res = await fetch("http://localhost:5000/api/products");
  products = await res.json(); // IMPORTANT GLOBAL STORE
  products.forEach((product, item) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <div class="product-info">
            <div class="product-title">${product.name}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-price">$ ${product.price.toLocaleString()}</div>
            <div class="product-rating">${product.rating} ⭐ (${product.quantity}+ bought)</div>
            <button class="product-button" data-productId="${product.productId}">Add to Cart</button>
          </div>
        `;
    container.appendChild(card);
  });

  // Add to Cart event
  document.querySelectorAll('.product-button').forEach(btn => {
    btn.addEventListener('click', async () => {

      const productId = btn.getAttribute('data-productId');

      const product = products.find(p => p.productId === productId);

      if (!product) {
        console.error("Product not found:", productId);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productId: product.productId,
            name: product.name,
            category: product.category,
            price: product.price,
            rating: product.rating,
            img: product.img,
            quantity: 1
          })
        });

        const data = await res.json();
        console.log(data);

        alert(`${product.name} added to cart!`);

      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
}
renderProducts();

const containerss = document.getElementById('product-container');

// Display products function
async function displayProducts(list) {
  containerss.innerHTML = '';

  list.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-category">${product.category}</div>
        <div class="product-price">$ ${product.price.toLocaleString()}</div>
        <div class="product-rating">${product.rating} ⭐ (${product.quantity}+ bought)</div>
        <button class="product-button" data-productid="${product.productId}">
          Add to Cart
        </button>
      </div>
    `;

    containerss.appendChild(card);
  });

  // Add to Cart event (DB VERSION)
  document.querySelectorAll('.product-button').forEach(btn => {
    btn.addEventListener('click', async () => {

      const productId = btn.getAttribute('data-productid');

      const product = list.find(p => p.productId === productId);

      if (!product) {
        console.error("Product not found:", productId);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productId: product.productId,
            name: product.name,
            category: product.category,
            price: product.price,
            rating: product.rating,
            img: product.img,
            quantity: 1
          })
        });

        const data = await res.json();
        console.log("Saved to DB:", data);

        alert(`${product.name} added to database cart!`);

      } catch (error) {
        console.error("DB Error:", error);
      }
    });
  });
}
// Filter function
function filterProducts() {
  const searchValue = document.getElementById('search').value.toLowerCase();
  const categoryValue = document.getElementById('categoryFilter').value;
  const priceValue = document.getElementById('priceFilter').value;
  const ratingValue = document.getElementById('ratingFilter').value;
  const quantityValue = document.getElementById('quantityFilter').value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchValue) &&
    (categoryValue === 'all' || p.category === categoryValue) &&
    (priceValue === 'all' || (priceValue === 'low' ? p.price < 50 : p.price >= 50)) &&
    (ratingValue === 'all' || p.rating >= parseFloat(ratingValue)) &&
    (quantityValue === 'all' || (quantityValue === 'low' ? p.quantity < 500 : p.quantity >= 500))
  );

  displayProducts(filtered);
}

// Event listeners
document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('categoryFilter').addEventListener('change', filterProducts);
document.getElementById('priceFilter').addEventListener('change', filterProducts);
document.getElementById('ratingFilter').addEventListener('change', filterProducts);
document.getElementById('quantityFilter').addEventListener('change', filterProducts);

// Initial render