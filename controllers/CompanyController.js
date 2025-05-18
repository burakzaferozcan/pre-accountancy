const { getConnection } = require("../config/dbConfig");
const { sanityFunction } = require("../utils/sanityFunction");
const getAllSP = async (req, res) => {
  try {
    const connection = await getConnection();
    const sqlQuery = "CALL getAllServiceSP ()";
    const response = await connection.query(sqlQuery);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const addDataSP = async (req, res) => {
  try {
    let { fullName, tckn, phone, address } = req.body;
    const sFullName = sanityFunction(fullName);
    const sTckn = sanityFunction(tckn);
    const sPhone = sanityFunction(phone);
    const sAddress = sanityFunction(address);
    if (!sFullName || !sTckn || !sPhone || !sAddress) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL addServiceSP (?,?,?,?)";
    const response = await connection.query(sqlQuery, [
      sFullName,
      sTckn,
      sPhone,
      sAddress,
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
    const sqlQuery = "CALL getServiceByIdSP (?)";
    const response = await connection.query(sqlQuery, [sId]);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateByIdSP = async (req, res) => {
  try {
    let id = req.params.id;
    let { fullName, tckn, phone, address } = req.body;
    const sId = sanityFunction(id);

    const sFullName = sanityFunction(fullName);
    const sTckn = sanityFunction(tckn);
    const sPhone = sanityFunction(phone);
    const sAddress = sanityFunction(address);
    if ((!sId, !sFullName || !sTckn || !sPhone || !sAddress)) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL updateServiceByIdSP (?,?,?,?,?)";
    const response = await connection.query(sqlQuery, [
      sId,
      sFullName,
      sTckn,
      sPhone,
      sAddress,
    ]);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteByIdSP = async (req, res) => {
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
    const sqlQuery = "CALL deleteServiceByIdSP (?)";
    const response = await connection.query(sqlQuer, [sId]);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllSP,
  addDataSP,
  getByIdSP,
  updateByIdSP,
  deleteByIdSP,
};
