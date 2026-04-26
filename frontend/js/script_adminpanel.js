// -------------------- DATA --------------------
let products = [];

// -------------------- NAV --------------------
function showTab(tab) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(tab).classList.add("active");

    if (tab === "products") renderProducts();
    if (tab === "users") renderUsers();
    if (tab === "dashboard") updateDashboard();
}

///////To check Role of user
const role = localStorage.getItem("role");

console.log("STORED ROLE:", role);

if (role != "admin") {
    // alert("Access Denied!");
    window.location.href = "../index.html";
}

// Render User
async function renderUsers() {
    try {
        let res = await fetch("http://localhost:5000/api/users");
        let users = await res.json();

        let table = document.getElementById("userTable");
        table.innerHTML = "";

        users.forEach(u => {
            table.innerHTML += `
            <tr>
              <td>${u.name}</td>
              <td>${u.email}</td>
              <td>${u.role}</td>
              <td>
                <button onclick="toggleRole('${u._id}')">
                  Toggle Role
                </button>

                <button onclick="deleteUser('${u._id}')">
                  Delete
                </button>
              </td>
            </tr>
            `;
        });

    } catch (err) {
        console.log("Error loading users:", err);
    }
}

// -------------------- PRODUCT CRUD --------------------
async function saveProduct() {
    let id = document.getElementById("productId").value;

    let product = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value,
        rating: document.getElementById("rating").value,
        img: document.getElementById("image").value
    };

    if (id) {
        await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    } else {
        await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    }

    clearForm();
    renderProducts(); // reload from DB
}
function editProduct(id) {
    let p = products.find(p => p._id === id);

    if (!p) {
        console.log("Product not found!", id, products);
        return;
    }

    document.getElementById("productId").value = p._id;
    document.getElementById("name").value = p.name;
    document.getElementById("category").value = p.category;
    document.getElementById("quantity").value = p.quantity;
    document.getElementById("price").value = p.price;
    document.getElementById("rating").value = p.rating;
    document.getElementById("image").value = p.img;

    showTab("products");
}

async function deleteProduct(id) {
    await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE"
    });

    renderProducts();
}
function clearForm() {
    document.getElementById("productId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("image").value = "";
}

// -------------------- RENDER PRODUCTS --------------------
async function renderProducts() {
    let res = await fetch("http://localhost:5000/api/products");
    products = await res.json(); // IMPORTANT GLOBAL STORE

    let table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach(p => {
        table.innerHTML += `
        <tr>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.quantity}</td>
          <td>${p.price}</td>
          <td>${p.rating}</td>
          <td>${p.img}</td>
          <td>
            <button id='edit_btn' onclick="editProduct('${p._id}')">Edit</button>
            <button id='del_btn' onclick="deleteProduct('${p._id}')">Delete</button>
          </td>
        </tr>
        `;
        // console.log(p.quantity)
    });
}
async function toggleRole(id) {
    await fetch(`http://localhost:5000/api/users/role/${id}`, {
        method: "PUT"
    });

    renderUsers();
}
async function deleteUser(id) {
    await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE"
    });

    renderUsers();
}

// -------------------- DASHBOARD --------------------
async function updateDashboard() {
    let res = await fetch("http://localhost:5000/api/users");
    let users = await res.json();

    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("totalAdmins").innerText =
        users.filter(u => u.role === "admin").length;
}
// init
updateDashboard();
window.onload = () => {
    renderUsers();
};