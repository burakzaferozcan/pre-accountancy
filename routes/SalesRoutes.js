const express = require("express");
const router = express.Router();
const {
  addSalesSP,
  deleteSalesByIdSP,
  addCollectionsSP,
  deleteCollectionsByIdSP,
  getAllSalesByIdSP,
  getAllCollectionsByIdSP,
} = require("../controllers/SalesController");

router.get("/sales/:id", getAllSalesByIdSP);
router.get("/collections/:id", getAllCollectionsByIdSP);
router.post("/sales", addSalesSP);
router.post("/collections", addCollectionsSP);
router.delete("/sales/:id", deleteSalesByIdSP);
router.delete("/collections/:id", deleteCollectionsByIdSP);

module.exports = { salesRoutes: router };
