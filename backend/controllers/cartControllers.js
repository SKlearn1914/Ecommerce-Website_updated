const Cart = require("../models/Cart");

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, name, category, price, rating, quantity, img } = req.body;


        // Check if item already exists
        let existing = await Cart.findOne({ name });

        if (existing) {
            existing.quantity += 1;
            await existing.save();
            return res.json({ message: "Quantity updated", item: existing });
        }

        const newItem = new Cart({
            productId,
            name,
            category,
            price,
            rating,
            quantity,
            img
        });
        await newItem.save();

        res.json({ message: "Item added", item: newItem });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get cart items
exports.getCart = async (req, res) => {
    const items = await Cart.find();
    res.json(items);
};

// UPDATE QUANTITY
exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;

    await Cart.findOneAndUpdate(
        { productId },
        { quantity }
    );

    res.json({ success: true });
};

// DELETE ITEM
exports.deleteCart = async (req, res) => {
    const { productId } = req.body;

    await Cart.findOneAndDelete({ productId });

    res.json({ success: true });
};