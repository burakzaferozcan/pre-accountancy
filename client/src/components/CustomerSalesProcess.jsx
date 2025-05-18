import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock } from "../slices/stock/stockSlice";

function CustomerSalesProcess() {
  const dispatch = useDispatch();
  const { stockTable, isLoading, isSuccess, message } = useSelector(
    (state) => state.stock
  );

  React.useEffect(() => {
    if (!isSuccess || isLoading) {
      dispatch(getAllStock());
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="d-flex flex-row gap-1 mt-2">
      <div className="col-7"></div>
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
            {stockTable && stockTable.length > 0 && (
              <tbody>
                {stockTable.map((item) => (
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
