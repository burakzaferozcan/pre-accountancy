import React from "react";
import { FaSync } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getStockById, updateStockById } from "../../slices/stock/StockSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditStockScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const stockID = params.id;
  const { editStock, isEdit, message } = useSelector((state) => state.stock);
  const [data, setData] = React.useState({
    description: "",
    price: "",
  });

  const { description, price } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const stockUpdate = async () => {
    if (description === "" || price === "") {
      toast.error("Lütfen Boş alanları doldurunuz");
    }
    dispatch(updateStockById({ ...data, id: stockID }));
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
      dispatch(getStockById(stockID));
    }
  }, [isEdit, stockID]);

  React.useEffect(() => {
    if (editStock) {
      setData({
        description: editStock.description,
        price: editStock.price,
      });
    }
  }, [editStock]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-2">Stok GÜncelleme</h3>
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
            name="tckn"
            placeholder="Fiyat"
            onChange={onChange}
            className="form-control"
            value={price}
          />
        </div>
      </div>
      <button onClick={stockUpdate} className="btn btn-primary mt-2 w-100">
        <FaSync />
        Güncelle
      </button>
    </div>
  );
}

export default EditStockScreen;
