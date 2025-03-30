const { getConnection } = require("../config/dbConfig");
const getAllSP = async (req, res) => {
  try {
    const connection = await getConnection();
    const sqlQuery = "CALL getAllCustomerSP ()";
    const response = await connection.query(sqlQuery);
    res.send(response[0][0].result);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const addDataSP = async (req, res) => {};
const getByIdSP = async (req, res) => {};
const updateByIdSP = async (req, res) => {};
const deleteByIdSP = async (req, res) => {};

module.exports = {
  getAllSP,
  addDataSP,
  getByIdSP,
  updateByIdSP,
  deleteByIdSP,
};
