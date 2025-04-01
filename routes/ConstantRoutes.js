const express = require("express");
const router = express.Router();
const {
  addUpdateConstantSP,
  getConstantSP,
} = require("../controllers/ConstantController");

router.post("/", addUpdateConstantSP);
router.get("/", getConstantSP);

module.exports = { constantRoutes: router };
