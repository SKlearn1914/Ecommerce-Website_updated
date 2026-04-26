const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/userController");

router.get("/", ctrl.getUsers);
router.delete("/:id", ctrl.deleteUser);
router.put("/role/:id", ctrl.toggleRole);
router.put("/:id", ctrl.updateUser);

module.exports = router;