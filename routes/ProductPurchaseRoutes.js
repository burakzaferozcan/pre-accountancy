const express = require("express");
const router = express.Router();
const {
  addProductPurchaseSP,
  deleteProductPurchaseSP,
  addPaymentSP,
  deletePaymentSP,
  getAllProductPurchaseByIdSP,
  getAllPaymentByIdSP,
} = require("../controllers/ProductPurchaseController");

router.post("/purchase", addProductPurchaseSP);
router.get("/purchase/:id", getAllProductPurchaseByIdSP);
router.post("/payment", addPaymentSP);
router.get("/payment/:id", getAllPaymentByIdSP);
router.delete("/purchase/:id", deleteProductPurchaseSP);
router.delete("/payment/:id", deletePaymentSP);

module.exports = { productPurchaseRoutes: router };
