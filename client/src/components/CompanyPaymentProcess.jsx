import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSave } from "react-icons/fa";
import { addPayment } from "../slices/payment/PaymentSlice";
import { setBalanceRefresh } from "../slices/company/CompanySlice";

function CompanyPaymentProcess() {
  const params = useParams();
  const companyID = params.id;
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    companyID: companyID,
    description: "",
    price: 0,
  });

  const { description, price } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const paymentSave = async () => {
    dispatch(addPayment(data));
    dispatch(setBalanceRefresh());
    setData((prev) => ({
      ...prev,
      description: "",
      price: 0,
    }));
  };

  return (
    <div className="mt-2 d-flex flex-column gap-1" style={{ width: "97%" }}>
      <h4 className="text-center">Firma Ödeme</h4>
      <hr className="my-2" />
      <div className="d-flex flex-row gap-2">
        <label htmlFor="description" className="col-3">
          Açıklama
        </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={onChange}
          className="form-control mt-1"
        />
      </div>
      <div className="d-flex flex-row gap-2">
        <label htmlFor="price" className="col-3">
          Tutar
        </label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={onChange}
          className="form-control mt-1"
        />
      </div>
      <button
        className="btn btn-primary"
        disabled={description === "" || price === 0}
        onClick={paymentSave}
      >
        <FaSave /> Kaydet
      </button>
    </div>
  );
}

export default CompanyPaymentProcess;
