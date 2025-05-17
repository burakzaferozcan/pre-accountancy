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

router.post("/", authMiddleware, addSalesSP);
router.get("/:id", authMiddleware, getAllSalesByIdSP);
router.delete("/:id", authMiddleware, deleteSalesByIdSP);
router.post("/collections", authMiddleware, addCollectionsSP);
router.get("/collections/:id", authMiddleware, getAllCollectionsByIdSP);
router.delete("/collections/:id", authMiddleware, deleteCollectionsByIdSP);

module.exports = { salesRoutes: router };
