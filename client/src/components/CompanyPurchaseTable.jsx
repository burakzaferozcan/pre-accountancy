import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import {
  deletePurchaseById,
  getAllPurchase,
} from "../slices/purchase/PurchaseSlice";
import { toast } from "react-toastify";
import { Paginator } from "primereact/paginator";

function CompanyPurchaseTable() {
  const params = useParams();
  const dispatch = useDispatch();
  const companyID = params.id;
  const { purchaseTable, isUpdate, isSuccess, isLoading, message } =
    useSelector((state) => state.purchase);
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
      dispatch(getAllPurchase(companyID));
      if (visible) {
        setVisible(false);
      }
    }
  }, [visible, isLoading, isSuccess, isUpdate, companyID]);

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
        {purchaseTable && purchaseTable.length > 0 ? (
          <tbody>
            {purchaseTable.slice(first, first + rows).map((sale) => (
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
                Alım Bulunamadı
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <Paginator
        first={first}
        totalRecords={purchaseTable && purchaseTable.length}
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
                onClick={() => dispatch(deletePurchaseById(deleteID))}
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

export default CompanyPurchaseTable;
