const express = require("express");
const router = express.Router();
const {
  addProductPurchaseSP,
  deleteProductPurchaseByIdSP,
  addPaymentSP,
  deletePaymentByIdSP,
  getAllProductPurchaseByIdSP,
  getAllPaymentByIdSP,
} = require("../controllers/ProductPurchaseController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/purchase", authMiddleware, addProductPurchaseSP);
router.get("/purchase/:id", authMiddleware, getAllProductPurchaseByIdSP);
router.post("/payment", authMiddleware, addPaymentSP);
router.get("/payment/:id", authMiddleware, getAllPaymentByIdSP);
router.delete("/purchase/:id", authMiddleware, deleteProductPurchaseByIdSP);
router.delete("/payment/:id", authMiddleware, deletePaymentByIdSP);

module.exports = { productPurchaseRoutes: router };
