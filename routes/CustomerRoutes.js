const express = require("express");
const router = express.Router();
const {
  getAllSP,
  addDataSP,
  getByIdSP,
  updateByIdSP,
  deleteByIdSP,
} = require("../controllers/CustomerController");

router.get("/", getAllSP).post("/", addDataSP);
router
  .get("/:id", getByIdSP)
  .put("/:id", updateByIdSP)
  .delete("/:id", deleteByIdSP);

module.exports = { customerRoutes: router };
