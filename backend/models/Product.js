const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    rating: Number,
    img: String
});

module.exports = mongoose.model("Product", productSchema);