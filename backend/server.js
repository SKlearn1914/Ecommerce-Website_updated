const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
// Middleware
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);



const frontendPath = path.join(__dirname, "../frontend");

// Serve static files
app.use(express.static(frontendPath));

//////////// ROOT
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

//////////// PRODUCT
app.get("/product", (req, res) => {
  res.sendFile(path.join(frontendPath, "src/product.html"));
});

//////////// CART
app.get("/cart", (req, res) => {
  res.sendFile(path.join(frontendPath, "src/cart.html"));
});

//////////// CHECKOUT
app.get("/checkout", (req, res) => {
  res.sendFile(path.join(frontendPath, "src/checkout.html"));
});

//////////// LOGIN
app.get("/login", (req, res) => {
  res.sendFile(path.join(frontendPath, "src/login.html"));
});

//////////// CONTACT
app.get("/contact", (req, res) => {
  res.sendFile(path.join(frontendPath, "src/contact.html"));
});

//////////// FAQ
app.get("/faq", (req, res) => {
  res.sendFile(path.join(frontendPath, "src/faq.html"));
});

//////////// ADMIN PANEL
app.get("/adminPanel", (req, res) => {
  res.sendFile(path.join(frontendPath, "src/adminpanel.html"));
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});