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
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/sales/:id", authMiddleware, getAllSalesByIdSP);
router.get("/collections/:id", authMiddleware, getAllCollectionsByIdSP);
router.post("/sales", authMiddleware, addSalesSP);
router.post("/collections", authMiddleware, addCollectionsSP);
router.delete("/sales/:id", authMiddleware, deleteSalesByIdSP);
router.delete("/collections/:id", authMiddleware, deleteCollectionsByIdSP);

module.exports = { salesRoutes: router };
