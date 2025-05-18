const express = require("express");
const router = express.Router();
const {
  getAllSP,
  addDataSP,
  getByIdSP,
  updateByIdSP,
  deleteByIdSP,
  getCustomerInfoById,
} = require("../controllers/CustomerController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getAllSP).post("/", authMiddleware, addDataSP);
router.get("/info/:id", authMiddleware, getCustomerInfoById);
router
  .get("/:id", authMiddleware, getByIdSP)
  .put("/:id", authMiddleware, updateByIdSP)
  .delete("/:id", authMiddleware, deleteByIdSP);

module.exports = { customerRoutes: router };
