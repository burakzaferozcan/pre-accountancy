import React from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCompany } from "../../slices/company/CompanySlice";
import { useNavigate } from "react-router-dom";

function AddCompanyScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.company);
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

  const companySave = async () => {
    if (fullName === "" || tckn === "") {
      toast.error("Lütfen Boş alanları doldurunuz");
    }
    dispatch(addCompany(data));
  };

  React.useEffect(() => {
    if (message.isAdded && message.message !== "") {
      toast(message.message);
      if (message.isAdded) {
        navigate(-1);
      }
    }
  }, [message, navigate]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-2">Firma Ekleme</h3>
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
      <button onClick={companySave} className="btn btn-primary mt-2 w-100">
        <FaSave />
        Kaydet
      </button>
    </div>
  );
}

export default AddCompanyScreen;
