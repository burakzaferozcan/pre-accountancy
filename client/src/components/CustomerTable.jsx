import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../slices/customer/CustomerSlice";

function CustomerTable({ searchText }) {
  const dispatch = useDispatch();
  const { customerTable, isLoading, isSuccess } = useSelector(
    (state) => state.customer
  );

  React.useEffect(() => {
    if (!isSuccess || isLoading) {
      dispatch(getAllCustomer);
    }
  });

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>İşlem</th>
              <th>Müşteri Adı Soyadı</th>
              <th>Müşteri Telefonu</th>
              <th>Borcu</th>
              <th>Tahsilat</th>
              <th>Kalan</th>
            </tr>
          </thead>
          {customerTable &&
          customerTable.length > 0 &&
          !customerTable.isFound ? (
            <tbody>
              {customerTable.map((customer, index) => (
                <tr>
                  <td>{customer.id}</td>
                  <td className="d-flex flex-row justify-content-center gap-1">
                    <button className="btn btn-sm btn-primary">Seç</button>
                    <button className="btn btn-sm btn-secondary">
                      Düzenle
                    </button>
                    <button className="btn btn-sm btn-danger">Sil</button>
                  </td>
                  <td>{customer.fullName}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.totalDebts}</td>
                  <td>{customer.totalCollection}</td>
                  <td>{customer.balance}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td>{customerTable.message}</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default CustomerTable;
