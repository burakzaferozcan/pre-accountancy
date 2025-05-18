import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import { deleteSalesById, getAllSales } from "../slices/sales/SalesSlice";
import { toast } from "react-toastify";
import { Paginator } from "primereact/paginator";

function CustomerSalesTable() {
  const params = useParams();
  const dispatch = useDispatch();
  const customerID = params.id;
  const { salesTable, isUpdate, isSuccess, isLoading, message } = useSelector(
    (state) => state.sales
  );
  const [deleteID, setDeleteID] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [first, setFirst] = React.useState(0);
  const [rows, setRows] = React.useState(9);

  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  React.useEffect(() => {
    if (isLoading || !isSuccess || isUpdate) {
      dispatch(getAllSales(customerID));
      if (visible) {
        setVisible(false);
      }
    }
  }, [visible, isLoading, isSuccess, isUpdate, customerID]);

  const deleteModal = (sale) => {
    setDeleteID(sale.id);
    setVisible(true);
  };

  React.useEffect(() => {
    if (message.isDeleted && message.message !== "") {
      toast(message.message);
    }
  }, [message]);

  return (
    <div
      className="table-responsive"
      style={{ marginLeft: "10px", overflowX: "auto" }}
    >
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>İşlem</th>
            <th>Tarih</th>
            <th>Açıklama</th>
            <th>Fiyat</th>
            <th>Miktar</th>
            <th>Toplam</th>
          </tr>
        </thead>
        {salesTable && salesTable.length > 0 ? (
          <tbody>
            {salesTable.slice(first, first + rows).map((sale) => (
              <tr key={sale.id}>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteModal(sale)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
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
      <Paginator
        first={first}
        totalRecords={salesTable && salesTable.length}
        rows={rows}
        onPageChange={onPageChange}
      />

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
            <b>{deleteID} No'lu kaydı silmek istiyor musunuz?</b>
            <div className="d-flex flex-row justify-content-between mt-3 gap-2">
              <button
                className="btn btn-sm w-100 btn-danger"
                onClick={() => dispatch(deleteSalesById(deleteID))}
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

export default CustomerSalesTable;
