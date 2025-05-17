import React from "react";
import CustomerSalesProcess from "../CustomerSalesProcess";
import CustomerCollectionProcess from "../CustomerCollectionProcess";
import CustomerSalesTable from "../CustomerSalesTable";
import CustomerCollectionTable from "../CustomerCollectionTable";
import CustomerBalance from "../CustomerBalance";

function CustomerSalesScreen() {
  return (
    <div className="home-container d-flex flex-column gap-2">
      <div className="names  d-flex flex-row gap-2">
        <div className="col-8">
          <CustomerSalesProcess />
        </div>
        <div className="col-4">
          <CustomerCollectionProcess />
        </div>
      </div>
      <hr className="my-2" />
      <div className="tables d-flex flex-row gap-2">
        <div className="col-8">
          <CustomerSalesTable />
        </div>
        <div className="col-4 d-flex flex-column gap-2">
          <CustomerCollectionTable />
          <CustomerBalance />
        </div>
      </div>
    </div>
  );
}

export default CustomerSalesScreen;
