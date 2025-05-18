import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import {
  deleteCollectionsById,
  getAllCollections,
} from "../slices/collections/CollectionsSlice";
import { toast } from "react-toastify";

function CustomerCollectionTable() {
  const params = useParams();
  const dispatch = useDispatch();
  const customerID = params.id;
  const { collectionsTable, isUpdate, isSuccess, isLoading, message } =
    useSelector((state) => state.collections);
  const [deleteID, setDeleteID] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (isLoading || !isSuccess || isUpdate) {
      dispatch(getAllCollections(customerID));
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
      style={{ overflowX: "auto", width: "97%" }}
    >
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>İşlem</th>
            <th>Açıklama</th>
            <th>Toplam</th>
          </tr>
        </thead>
        {collectionsTable && collectionsTable.length > 0 ? (
          <tbody>
            {collectionsTable.map((sale) => (
              <tr key={sale.id}>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteModal(sale)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
                <td>{sale.description}</td>
                <td>{sale.total}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={6} className="text-center">
                Tahsilat Bulunamadı
              </td>
            </tr>
          </tbody>
        )}
      </table>
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
                onClick={() => dispatch(deleteCollectionsById(deleteID))}
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

export default CustomerCollectionTable;
