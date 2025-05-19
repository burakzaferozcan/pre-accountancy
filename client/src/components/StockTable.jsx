import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteStockById,
  getAllStock,
  setMessageRemove,
} from "../slices/stock/StockSlice";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";

function StockTable({ searchText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [first, setFirst] = React.useState(0);
  const [rows, setRows] = React.useState(12);
  const [visible, setVisible] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  const { stockTable, isLoading, isSuccess, isUpdate, message } = useSelector(
    (state) => state.stock
  );

  React.useEffect(() => {
    if (!isSuccess || isLoading || isUpdate) {
      dispatch(getAllStock);
      if (visible) {
        setVisible(false);
      }
    }
  }, [isUpdate, isSuccess, isLoading]);

  React.useEffect(() => {
    if (message.isDeleted && message.message !== "") {
      toast(message.message);
      dispatch(setMessageRemove());
    }
  }, [message]);

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
              <th>Açıklama</th>
              <th>Fiyat</th>
              <th>Miktar</th>
            </tr>
          </thead>
          {stockTable && stockTable.length > 0 && !stockTable.isFound ? (
            <tbody>
              {stockTable
                .filter((stock) =>
                  stock.description
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                .map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.id}</td>
                    <td className="d-flex flex-row justify-content-center gap-1">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() =>
                          navigate(`/stock-definition/${stock.id}`)
                        }
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteModal(stock.id)}
                      >
                        Sil
                      </button>
                    </td>
                    <td>{stock.description}</td>
                    <td>{stock.price}</td>
                    <td>{stock.amount}</td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <tbody key={1}>
              <tr>
                <td>{stockTable.message}</td>
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
                onClick={() => dispatch(deleteStockById(deleteId))}
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

export default StockTable;
