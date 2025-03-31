const { getConnection } = require("../config/dbConfig");

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

module.exports = {
  getAllSP,
};
