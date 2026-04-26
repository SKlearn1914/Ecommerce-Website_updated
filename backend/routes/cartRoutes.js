const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

// CREATE
router.post("/add", cartController.addToCart);

// READ
router.get("/all", cartController.getCart);

// UPDATE QUANTITY
router.put("/update", cartController.updateCart);

// DELETE ITEM
router.delete("/delete", cartController.deleteCart);

module.exports = router;
module.exports = router;
