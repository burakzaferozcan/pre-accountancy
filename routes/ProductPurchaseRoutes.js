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

router.post("/purchase", addProductPurchaseSP);
router.get("/purchase/:id", getAllProductPurchaseByIdSP);
router.post("/payment", addPaymentSP);
router.get("/payment/:id", getAllPaymentByIdSP);
router.delete("/purchase/:id", deleteProductPurchaseByIdSP);
router.delete("/payment/:id", deletePaymentByIdSP);

module.exports = { productPurchaseRoutes: router };
