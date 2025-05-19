import React from "react";
import { FaSync } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCompanyById,
  updateCompanyById,
} from "../../slices/company/CompanySlice";
import { useNavigate, useParams } from "react-router-dom";

function EditCompanyScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const companyID = params.id;
  const { editCompany, isEdit, message } = useSelector(
    (state) => state.company
  );
  const [data, setData] = React.useState({
    fullName: "",
    tckn: "",
    phone: "",
    address: "",
  });

  const { fullName, tckn, phone, address } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const companyUpdate = async () => {
    if (fullName === "" || tckn === "") {
      toast.error("Lütfen Boş alanları doldurunuz");
    }
    dispatch(updateCompanyById({ ...data, id: companyID }));
  };

  React.useEffect(() => {
    if (message.isUpdated && message.message !== "") {
      toast(message.message);
      if (message.isUpdated) {
        navigate(-1);
      }
    }
  }, [message, navigate]);

  React.useEffect(() => {
    if (!isEdit) {
      dispatch(getCompanyById(companyID));
    }
  }, [isEdit, companyID]);

  React.useEffect(() => {
    if (editCompany) {
      setData({
        fullName: editCompany.fullName,
        tckn: editCompany.tckn,
        phone: editCompany.phone,
        address: editCompany.address,
      });
    }
  }, [editCompany]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-2">Firma GÜncelleme</h3>
      <hr className="my-2" />
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row gap-1">
          <label htmlFor="fullName" className="form-label col-4">
            Adı Soyadı
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Adı Soyadı"
            onChange={onChange}
            className="form-control"
            value={fullName}
          />
        </div>

        <div className="d-flex flex-row gap-1">
          <label htmlFor="tckn" className="form-label col-4">
            TC Kimlik No
          </label>
          <input
            type="text"
            name="tckn"
            placeholder="TC Kimlik NO"
            onChange={onChange}
            className="form-control"
            value={tckn}
          />
        </div>
        <div className="d-flex flex-row gap-1">
          <label htmlFor="phone" className="form-label col-4">
            Telefon
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            onChange={onChange}
            className="form-control"
            value={phone}
          />
        </div>
        <div className="d-flex flex-row gap-1">
          <label htmlFor="address" className="form-label col-4">
            Adres
          </label>
          <input
            type="text"
            name="address"
            placeholder="Adres"
            onChange={onChange}
            className="form-control"
            value={address}
          />
        </div>
      </div>
      <button onClick={companyUpdate} className="btn btn-primary mt-2 w-100">
        <FaSync />
        Güncelle
      </button>
    </div>
  );
}

export default EditCompanyScreen;
