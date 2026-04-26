const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// ADD product
exports.addProduct = async (req, res) => {
    try {
        const count = await Product.countDocuments();

        const product = new Product({
            productId: "SKP-" + (1001 + count),
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
            rating: req.body.rating,
            img: req.body.img
        });

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Product creation failed" });
    }
};
// UPDATE product
exports.updateProduct = async (req, res) => {
    const updated = await Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    );

    res.json(updated);
};
// DELETE product
exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};