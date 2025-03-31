const express = require("express");
const router = express.Router();
const {
  addProductPurchaseSP,
  deleteProductPurchaseSP,
  addPaymentSP,
  deletePaymentSP,
} = require("../controllers/ProductPurchaseController");

router.post("/purchase", addProductPurchaseSP);
router.post("/payment", addPaymentSP);
router.delete("/purchase/:id", deleteProductPurchaseSP);
router.delete("/payment/:id", deletePaymentSP);

module.exports = { productPurchaseRoutes: router };
