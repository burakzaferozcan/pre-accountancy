import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCompanyById,
  getAllCompany,
  setMessageRemove,
} from "../slices/company/CompanySlice";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";

function CompanyTable({ searchText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [first, setFirst] = React.useState(0);
  const [rows, setRows] = React.useState(12);
  const [visible, setVisible] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  const { companyTable, isLoading, isSuccess, isUpdate, message } = useSelector(
    (state) => state.company
  );

  React.useEffect(() => {
    if (!isSuccess || isLoading || isUpdate) {
      dispatch(getAllCompany);
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
              <th>Firma Adı</th>
              <th>Firma Telefonu</th>
              <th>Alacağı</th>
              <th>Ödeme</th>
              <th>Kalan</th>
            </tr>
          </thead>
          {companyTable && companyTable.length > 0 && !companyTable.isFound ? (
            <tbody>
              {companyTable
                .filter((company) =>
                  company.fullName
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                .map((company, index) => (
                  <tr key={index}>
                    <td>{company.id}</td>
                    <td className="d-flex flex-row justify-content-center gap-1">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          navigate(`/company-purchase/${company.id}`)
                        }
                      >
                        Seç
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() =>
                          navigate(`/company-definition/${company.id}`)
                        }
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteModal(company.id)}
                      >
                        Sil
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          navigate(`/company-purchase/print/${company.id}`)
                        }
                      >
                        Yazdır
                      </button>
                    </td>
                    <td>{company.fullName}</td>
                    <td>{company.phone}</td>
                    <td>{company.totalDebts}</td>
                    <td>{company.totalCollection}</td>
                    <td>{company.balance}</td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <tbody key={1}>
              <tr>
                <td>{companyTable.message}</td>
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
                onClick={() => dispatch(deleteCompanyById(deleteId))}
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

export default CompanyTable;
