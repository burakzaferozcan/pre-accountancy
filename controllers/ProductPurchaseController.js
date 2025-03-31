const { getConnection } = require("../config/dbConfig");
const { sanityFunction } = require("../utils/sanityFunction");

const addProductPurchaseSP = async (req, res) => {
  try {
    let { serviceID, stockID, amount, price } = req.body;
    const sServiceID = sanityFunction(serviceID);
    const sStockID = sanityFunction(stockID);
    const sAmount = sanityFunction(amount);
    const sPrice = sanityFunction(price);

    if (!sServiceID || !sStockID || !sAmount || !sPrice) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL addProductPurchaseSP (?,?,?,?)";
    const response = await connection.query(sqlQuery, [
      sServiceID,
      sStockID,
      sAmount,
      sPrice,
    ]);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProductPurchaseSP = async (req, res) => {
  try {
    let id = req.params.id;
    const sId = sanityFunction(id);
    if (!sId) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL deleteProductPurchaseByIdSP (?)";
    const response = await connection.query(sqlQuery);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addPaymentSP = async (req, res) => {
  try {
    let { serviceID, description, total } = req.body;
    const sServiceID = sanityFunction(serviceID);
    const sDescription = sanityFunction(description);
    const sTotal = sanityFunction(total);
    if (!sServiceID || !sDescription || !sTotal) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL addPaymentSP (?,?,?)";
    const response = await connection.query(sqlQuery, [
      sServiceID,
      sDescription,
      sTotal,
    ]);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePaymentSP = async (req, res) => {
  try {
    let id = req.params.id;
    const sId = sanityFunction(id);
    if (!sId) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL deletePaymentByIdSP (?)";
    const response = await connection.query(sqlQuery);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllProductPurchaseByIdSP = async (req, res) => {
  try {
    let id = req.params.id;
    const sId = sanityFunction(id);
    if (!sId) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL getAllProductPurchaseByIdSP (?)";
    const response = await connection.query(sqlQuery);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addProductPurchaseSP,
  deleteProductPurchaseSP,
  addPaymentSP,
  deletePaymentSP,
};
