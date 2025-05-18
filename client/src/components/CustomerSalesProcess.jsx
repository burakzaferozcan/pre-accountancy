import React, { act } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../slices/stock/StockSlice";
import { useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { addSales } from "../slices/sales/SalesSlice";
import { setBalanceRefresh } from "../slices/customer/CustomerSlice";
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
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [activeItem, setActiveItem] = React.useState({});

  const { stockID, description, amount, price } = data;
  const priceRef = React.useRef();
  const amountRef = React.useRef();
  const saveRef = React.useRef();

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
    const matchIndex = stockTable.findIndex((item) =>
      item.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setActiveIndex(matchIndex);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const filterStockData = description
    ? stockTable.filter((item) =>
        item.description.toLowerCase().includes(description.toLowerCase())
      )
    : stockTable;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "description") {
        setData((prev) => ({
          ...prev,
          description: activeItem.description,
          price: activeItem.price,
          stockID: activeItem.id,
        }));
        priceRef.current.focus();
      } else if (e.target.value === "price") {
        amountRef.current.focus();
      } else if (e.target.value === "amount") {
        saveRef.current.focus();
      }
    }
    if (e.target.name === "description") {
      if (e.key === "ArrowDown" && activeIndex < stockTable.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (e.key === "ArrowUp" && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  React.useEffect(() => {
    if (activeIndex !== -1 && stockTable[activeIndex]) {
      setActiveItem(stockTable[activeIndex]);
      setData((prev) => ({
        ...prev,
        stockID: activeItem.stockID,
        price: activeItem.price,
        description: activeItem.description,
      }));
    }
  }, [activeIndex, stockTable]);

  const salesSave = async () => {
    let data = { customerID, description, stockID, amount, price };
    dispatch(addSales(data));
    dispatch(setBalanceRefresh());
    setData((prev) => ({
      ...prev,
      description: "",
      stockID: "",
      amount: 0,
      price: 0,
    }));
  };

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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount" className="col-4">
            Miktar :
          </label>
          <div className="d-flex flex-row gap-2">
            <input
              ref={amountRef}
              type="text"
              name="amount"
              onChange={onChange}
              value={amount}
              className="form-conrol"
              onKeyDown={handleKeyDown}
            />
            <strong>Toplam : {amount && price && amount * price}</strong>
          </div>
        </div>
        <button
          ref={saveRef}
          disabled={!description || !price || !amount}
          className="btn btn-primary"
          onClick={salesSave}
        >
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
                  <tr
                    key={item.id}
                    style={{
                      fontWeight:
                        item.id === activeIndex + 1 ? "bold" : "normal",
                    }}
                  >
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
