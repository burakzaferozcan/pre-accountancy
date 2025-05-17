import React from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCustomer } from "../../slices/customer/CustomerSlice";

function AddCustomerScreen() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    fullName: "",
    tckn: "",
    phone: "",
    address: "",
    reference: "",
  });

  const { fullName, tckn, phone, address, reference } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const customerSave = async () => {
    if (fullName === "" || tckn === "") {
      toast.error("Lütfen Boş alanları doldurunuz");
    }
    dispatch(addCustomer(data));
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-2">Müşteri Ekleme</h3>
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
        <div className="d-flex flex-row gap-1">
          <label htmlFor="reference" className="form-label col-4">
            Referans
          </label>
          <input
            type="text"
            name="reference"
            placeholder="Adres"
            onChange={onChange}
            className="form-control"
            value={reference}
          />
        </div>
      </div>
      <button onClick={customerSave} className="btn btn-primary mt-2 w-100">
        <FaSave />
        Kaydet
      </button>
    </div>
  );
}

export default AddCustomerScreen;
