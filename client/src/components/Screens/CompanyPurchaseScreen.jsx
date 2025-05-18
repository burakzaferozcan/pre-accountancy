import React from "react";
import CompanyPurchaseProcess from "../CompanyPurchaseProcess";
import CompanyPaymentProcess from "../CompanyPaymentProcess";
import CompanyPurchaseTable from "../CompanyPurchaseTable";
import CompanyPaymentTable from "../CompanyPaymentTable";
import CompanyBalance from "../CompanyBalance";

function CompanyPuchaseScreen() {
  return (
    <div className="home-container d-flex flex-column gap-2">
      <div className="names  d-flex flex-row gap-2">
        <div className="col-8">
          <CompanyPurchaseProcess />
        </div>
        <div className="col-4">
          <CompanyPaymentProcess />
        </div>
      </div>
      <hr className="my-2" />
      <div className="tables d-flex flex-row gap-2">
        <div className="col-8">
          <CompanyPurchaseTable />
        </div>
        <div className="col-4 d-flex flex-column gap-2">
          <CompanyPaymentTable />
          <CompanyBalance />
        </div>
      </div>
    </div>
  );
}

export default CompanyPuchaseScreen;
