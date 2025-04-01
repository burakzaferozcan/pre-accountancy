const { getConnection } = require("../config/dbConfig");
const { sanityFunction } = require("../utils/sanityFunction");

const addUpdateConstantSP = async (req, res) => {
  try {
    let {
      compantName,
      companyOwner,
      phone,
      address,
      taxOffice,
      taxNumber,
      companyLogo,
    } = req.body;
    const sCompantName = sanityFunction(compantName);
    const sCompanyOwner = sanityFunction(companyOwner);
    const sPhone = sanityFunction(phone);
    const sAddress = sanityFunction(address);
    const sTaxOffice = sanityFunction(taxOffice);
    const sTaxNumber = sanityFunction(taxNumber);
    const sCompanyLogo = sanityFunction(companyLogo);

    if (
      !sCompantName ||
      !sCompanyOwner ||
      !sPhone ||
      !sAddress ||
      !sTaxOffice ||
      !sTaxNumber ||
      !sCompanyLogo
    ) {
      res.send({
        success: false,
        message: "Lütfen geçerli veriler ile tekrar deneyin.",
      });
    }
    const connection = await getConnection();
    const sqlQuery = "CALL addSalesSP (?,?,?,?,?,?,?)";
    const response = await connection.query(sqlQuery, [
      sCompantName,
      sCompanyOwner,
      sPhone,
      sAddress,
      sTaxOffice,
      sTaxNumber,
      sCompanyLogo,
    ]);
    res.send(response[0][0].result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addUpdateConstantSP,
};
