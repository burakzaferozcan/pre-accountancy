import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../slices/stock/stockSlice";
import { useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
function CustomerSalesProcess() {
  const dispatch = useDispatch();
  const params = useParams();
  const customerID = params.id;
  const { stockTable, isLoading, isSuccess, message } = useSelector(
    (state) => state.stock
  );
  const [data, setData] = React.useState({
    customerID: customerID,
    stockID: "",
    description: "",
    amount: 0,
    price: 0,
  });
  const { stockID, description, amount, price } = data;
  const priceRef = React.createRef();
  const amountRef = React.createRef();
  const saveRef = React.createRef();

  React.useEffect(() => {
    if (!isSuccess || isLoading) {
      dispatch(getAllStock());
    }
  }, [isLoading, isSuccess]);

  const onStockChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const filterStockData = description
    ? stockTable.filter((item) =>
        item.description.toLowerCase().includes(description.toLowerCase())
      )
    : stockTable;

  return (
    <div
      className="d-flex flex-row gap-1 mt-2"
      style={{
        marginLeft: "10px",
      }}
    >
      <div className="col-7 d-flex flex-column gap-3">
        <div className="input-group">
          <label htmlFor="description" className="col-4">
            Stok Adı :
          </label>
          <input
            type="text"
            name="description"
            onChange={onStockChange}
            value={description}
            className="form-conrol"
          />
        </div>
        <div className="input-group">
          <label htmlFor="price" className="col-4">
            Fiyat :
          </label>
          <input
            ref={priceRef}
            type="text"
            name="price"
            onChange={onChange}
            value={price}
            className="form-conrol"
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount" className="col-4">
            Miktar :
          </label>
          <input
            ref={amountRef}
            type="text"
            name="amount"
            onChange={onChange}
            value={amount}
            className="form-conrol"
          />
        </div>
        <button ref={saveRef} className="btn btn-primary">
          <FaSave /> Satış Kaydet
        </button>
      </div>
      <div className="col-5" style={{ overflow: "auto", height: "200px" }}>
        <div className="table-responsive">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Stok Adı</th>
                <th>Fiyatı</th>
                <th>Miktar</th>
              </tr>
            </thead>
            {filterStockData && filterStockData.length > 0 && (
              <tbody>
                {filterStockData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerSalesProcess;
