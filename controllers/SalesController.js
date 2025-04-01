const { getConnection } = require("../config/dbConfig");
const { sanityFunction } = require("../utils/sanityFunction");

const addSalesSP = async (req, res) => {
  try {
    let { customerID, stockID, amount, price } = req.body;
    const sCustomerID = sanityFunction(customerID);
    const sStockID = sanityFunction(stockID);
    const sAmount = sanityFunction(amount);
    const sPrice = sanityFunction(price);

    if (!sCustomerID || !sStockID || !sAmount || !sPrice) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL addSalesSP (?,?,?,?)";
    const response = await connection.query(sqlQuery, [
      sCustomerID,
      sStockID,
      sAmount,
      sPrice,
    ]);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteSalesByIdSP = async (req, res) => {
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
    const sqlQuery = "CALL deleteSalesByIdSP (?)";
    const response = await connection.query(sqlQuery);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addSalesSP,
  deleteSalesByIdSP,
};
