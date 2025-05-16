import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCustomerById,
  getAllCustomer,
} from "../slices/customer/CustomerSlice";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";

function CustomerTable({ searchText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [first, setFirst] = React.useState(0);
  const [rows, setRows] = React.useState(12);
  const [visible, setVisible] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  const { customerTable, isLoading, isSuccess, isUpdate } = useSelector(
    (state) => state.customer
  );

  React.useEffect(() => {
    if (!isSuccess || isLoading || isUpdate) {
      dispatch(getAllCustomer);
      if (visible) {
        setVisible(false);
      }
    }
  }, [isUpdate, isSuccess, isLoading]);

  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  const deleteModal = (id) => {
    setDeleteId(id);
    setVisible(true);
  };

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
              {customerTable
                .filter((customer) =>
                  customer.fullName
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                .map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.id}</td>
                    <td className="d-flex flex-row justify-content-center gap-1">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          navigate(`/customer-sales/${customer.id}`)
                        }
                      >
                        Seç
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() =>
                          navigate(`/customer-definition/${customer.id}`)
                        }
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteModal(customer.id)}
                      >
                        Sil
                      </button>
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
            <tbody key={1}>
              <tr>
                <td>{customerTable.message}</td>
              </tr>
            </tbody>
          )}
        </table>
        <Paginator first={first} rows={rows} onPageChange={onPageChange} />
      </div>
      <Dialog
        header={"Kayıt Silme Onayı"}
        visible={visible}
        onHide={() => setVisible(false)}
        headerStyle={{ backgroundColor: "darkred", color: "white" }}
        contentStyle={{ backgroundColor: "lightgray" }}
        style={{ width: "50vw" }}
      >
        <div className="mt-5">
          <div>
            <b>{deleteId} No'lu kaydı silmek istiyor musunuz?</b>
            <div className="d-flex flex-row justify-content-between mt-3 gap-2">
              <button
                className="btn btn-sm w-100 btn-danger"
                onClick={() => dispatch(deleteCustomerById(deleteId))}
              >
                Sil
              </button>
              <button
                className="btn btn-sm w-100 btn-secondary"
                onClick={() => setVisible(false)}
              >
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CustomerTable;
