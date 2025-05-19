import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import StockTable from "../StockTable";
import { useDispatch, useSelector } from "react-redux";
import { setEditRemove } from "../../slices/stock/StockSlice";

function StockDefinitionScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = React.useState("");
  const { editStock, isEdit } = useSelector((state) => state.stock);

  React.useEffect(() => {
    if (isEdit || editStock.id) {
      dispatch(setEditRemove());
    }
  }, [isEdit, editStock]);

  return (
    <div className="customer-definition">
      <h2 className="text-center">Stok Kartları</h2>
      <hr className="my-2" />
      <div className="container d-flex flex-row justify-content-between gap-2">
        <div className="col-7">
          <div className="d-flex col-12">
            <label htmlFor="search" className="col-4 mt-1">
              Tanımlama
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
            Stok Ekle
          </button>
        </div>
      </div>
      <div className="container">
        <hr className="my-2" />
        <StockTable searchText={searchText} />
      </div>
    </div>
  );
}

export default StockDefinitionScreen;
