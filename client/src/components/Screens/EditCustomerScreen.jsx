import React from "react";
import { FaSync } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCustomerById,
  updateCustomerById,
} from "../../slices/customer/CustomerSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomerScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const customerID = params.id;
  const { editCustomer, isEdit, message } = useSelector(
    (state) => state.customer
  );
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

  const customerUpdate = async () => {
    if (fullName === "" || tckn === "") {
      toast.error("Lütfen Boş alanları doldurunuz");
    }
    dispatch(updateCustomerById({ ...data, id: customerID }));
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
      dispatch(getCustomerById(customerID));
    }
  }, [isEdit, customerID]);

  React.useEffect(() => {
    if (editCustomer) {
      setData({
        fullName: editCustomer.fullName,
        tckn: editCustomer.tckn,
        phone: editCustomer.phone,
        address: editCustomer.address,
        reference: editCustomer.reference,
      });
    }
  }, [editCustomer]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-2">Müşteri Güncelleme</h3>
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
      <button onClick={customerUpdate} className="btn btn-primary mt-2 w-100">
        <FaSync />
        Güncelle
      </button>
    </div>
  );
}

export default EditCustomerScreen;
