const express = require("express");
const router = express.Router();
const {
  addProductPurchaseSP,
  deleteProductPurchaseSP,
  addPaymentSP,
  deletePaymentSP,
  getAllProductPurchaseSP,
  getAllPaymentSP,
} = require("../controllers/ProductPurchaseController");

router.post("/purchase", addProductPurchaseSP);
router.get("/purchase", getAllProductPurchaseSP);
router.post("/payment", addPaymentSP);
router.get("/payment", getAllPaymentSP);
router.delete("/purchase/:id", deleteProductPurchaseSP);
router.delete("/payment/:id", deletePaymentSP);

module.exports = { productPurchaseRoutes: router };
