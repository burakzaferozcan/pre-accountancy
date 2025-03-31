const { getConnection } = require("../config/dbConfig");
const { sanityFunction } = require("../utils/sanityFunction");
const getAllSP = async (req, res) => {
  try {
    const connection = await getConnection();
    const sqlQuery = "CALL getAllCustomerSP ()";
    const response = await connection.query(sqlQuery);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const addDataSP = async (req, res) => {
  try {
    let { fullName, tckn, phone, address, reference } = req.body;
    const sFullName = sanityFunction(fullName);
    const sTckn = sanityFunction(tckn);
    const sPhone = sanityFunction(phone);
    const sAddress = sanityFunction(address);
    const sReference = sanityFunction(reference);
    if (!sFullName || !sPhone || !sAddress || !sTckn || !sReference) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL addCustomerSP (?,?,?,?,?)";
    const response = await connection.query(sqlQuery, [
      sFullName,
      sPhone,
      sAddress,
      sTckn,
      sReference,
    ]);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getByIdSP = async (req, res) => {
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
    const sqlQuery = "CALL getCustomerByIdSP (?)";
    const response = await connection.query(sqlQuery);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateByIdSP = async (req, res) => {};
const deleteByIdSP = async (req, res) => {};

module.exports = {
  getAllSP,
  addDataSP,
  getByIdSP,
  updateByIdSP,
  deleteByIdSP,
};
