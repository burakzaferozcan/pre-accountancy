import React from "react";
import { useSelector } from "react-redux";
function CustomerSalesTable() {
  const { salesTable, isUpdate } = useSelector((state) => state.sales);
  return (
    <div
      className="table-responsive"
      style={{ marginLeft: "10px", overflowX: "auto" }}
    >
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Tarih</th>
            <th>Acaklama</th>
            <th>Fiyat</th>
            <th>Miktar</th>
            <th>Toplam</th>
          </tr>
        </thead>
        {salesTable && salesTable.length > 0 && (
          <tbody>
            {salesTable.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.date}</td>
                <td>{sale.description}</td>
                <td>{sale.price}</td>
                <td>{sale.amount}</td>
                <td>{sale.total}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default CustomerSalesTable;
