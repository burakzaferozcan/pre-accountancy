const express = require("express");
const router = express.Router();
const {
  addUpdateConstantSP,
  getConstantSP,
} = require("../controllers/ConstantController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, addUpdateConstantSP);
router.get("/", authMiddleware, getConstantSP);

module.exports = { constantRoutes: router };
