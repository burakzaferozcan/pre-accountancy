import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesByIdSP } from "../../../controllers/SalesController";

function CustomerSalesTable() {
  const params = useParams();
  const dispatch = useDispatch();
  const customerID = params.id;
  const { salesTable, isUpdate, isSuccess, isLoading } = useSelector(
    (state) => state.sales
  );

  React.useEffect(() => {
    if (isLoading || !isSuccess || isUpdate) {
      dispatch(getAllSalesByIdSP(customerID));
    }
  }, [isLoading, isSuccess, isUpdate, customerID]);

  return (
    <div
      className="table-responsive"
      style={{ marginLeft: "10px", overflowX: "auto" }}
    >
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Tarih</th>
            <th>Acaklama</th>
            <th>Fiyat</th>
            <th>Miktar</th>
            <th>Toplam</th>
          </tr>
        </thead>
        {salesTable && salesTable.length > 0 ? (
          <tbody>
            {salesTable.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.date}</td>
                <td>{sale.stockName}</td>
                <td>{sale.price}</td>
                <td>{sale.amount}</td>
                <td>{sale.total}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={6} className="text-center">
                Satış Bulunamadı
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default CustomerSalesTable;
