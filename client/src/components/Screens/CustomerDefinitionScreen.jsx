import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import CustomerTable from "../CustomerTable";

function CustomerDefinitionScreen() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState("");

  return (
    <div className="customer-definition">
      <h2 className="text-center">Müsteri Kartları</h2>
      <hr className="my-2" />
      <div className="container d-flex flex-row justify-content-between gap-2">
        <div className="col-7">
          <div className="d-flex col-12">
            <label htmlFor="search" className="col-4 mt-1">
              Müşteri Adı Soyadı
            </label>
            <div className="col-10">
              <input
                type="text"
                name="searchText"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="form-control col-8"
              />
            </div>
          </div>
        </div>
        <div className="col-3">
          <button className="btn btn-primary" onClick={() => navigate("add")}>
            <FaPlus />
            Müşteri Kartı Ekle
          </button>
        </div>
      </div>
      <div className="container">
        <hr className="my-2" />
        <CustomerTable searchText={searchText} />
      </div>
    </div>
  );
}

export default CustomerDefinitionScreen;
