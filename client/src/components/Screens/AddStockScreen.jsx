import React from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addStock } from "../../slices/stock/StockSlice";
import { useNavigate } from "react-router-dom";

function AddStockScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.stock);
  const [data, setData] = React.useState({
    description: "",
    price: "",
  });

  const { description, price } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const stockSave = async () => {
    if (description === "" || price === "") {
      toast.error("Lütfen Boş alanları doldurunuz");
    }
    dispatch(addStock(data));
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
      <h3 className="text-center mb-2">Stok Ekleme</h3>
      <hr className="my-2" />
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row gap-1">
          <label htmlFor="description" className="form-label col-4">
            Açıklama
          </label>
          <input
            type="text"
            name="description"
            placeholder="Açıklama"
            onChange={onChange}
            className="form-control"
            value={description}
          />
        </div>

        <div className="d-flex flex-row gap-1">
          <label htmlFor="price" className="form-label col-4">
            Fiyat
          </label>
          <input
            type="text"
            name="price"
            placeholder="Fiyat"
            onChange={onChange}
            className="form-control"
            value={price}
          />
        </div>
      </div>
      <button onClick={stockSave} className="btn btn-primary mt-2 w-100">
        <FaSave />
        Kaydet
      </button>
    </div>
  );
}

export default AddStockScreen;
