const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: String,
    name: String,
    category: String,
    price: Number,
    rating: Number,
    quantity: Number,
    img: String
});

module.exports = mongoose.model("Cart", cartSchema);