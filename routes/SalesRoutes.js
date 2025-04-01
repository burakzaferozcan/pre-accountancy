const express = require("express");
const router = express.Router();
const {
  addSalesSP,
  deleteSalesSP,
  addCollectionsSP,
  deleteCollectionsSP,
  getAllSalesByIdSP,
  getAllCollectionsByIdSP,
} = require("../controllers/SalesController");

router.get("/sales/:id", getAllSalesByIdSP);
router.get("/collections/:id", getAllCollectionsByIdSP);
router.post("/sales", addSalesSP);
router.post("/collections", addCollectionsSP);
router.delete("/sales/:id", deleteSalesSP);
router.delete("/collections/:id", deleteCollectionsSP);

module.exports = { salesRoutes: router };
