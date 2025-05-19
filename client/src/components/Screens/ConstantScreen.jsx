import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUpdateConstant,
  getAllConstant,
} from "../../slices/constant/ConstantSlice";
import { FaBackspace, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

function ConstantScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constantTable, isLoading, isSuccess, isUpdate } = useSelector(
    (state) => state.constantTable
  );

  const [constantData, setConstantData] = React.useState({
    companyName: "",
    companyOwner: "",
    phone: "",
    address: "",
    taxOffice: "",
    taxNumber: "",
    companyLogo: "",
  });

  const {
    companyName,
    companyOwner,
    phone,
    address,
    taxOffice,
    taxNumber,
    companyLogo,
  } = constantData;

  React.useEffect(() => {
    if (isLoading || isUpdate || !isSuccess) {
      dispatch(getAllConstant());
    }
  }, [isUpdate, isSuccess, isLoading]);

  React.useEffect(() => {
    if (constantTable) {
      setConstantData(constantTable);
    }
  }, [constantTable]);

  const onChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${
            img.width
          }" height="${img.height}"><foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
          <img src="${canvas.toDataURL("image/png")}"/>
          </div>
          </foreignObject></svg>`;
          setConstantData({ ...constantData, companyLogo: svgString });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setConstantData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    dispatch(addUpdateConstant(constantData));
    toast.success(constantTable.length > 0 ? "Güncellendi" : "Eklendi");
  };

  return (
    <div className="container">
      <div className="d-flex flex-row gap-3 mt-2">
        <button
          className="btn btn-outline-danger mt-1"
          onClick={() => navigate(-1)}
        >
          <FaBackspace /> Geri Dön
        </button>
      </div>
      <section className="mt-2">
        <div className="mb-3 d-flex flex-row gap-1">
          <div className="col-2">
            <label htmlFor="companyName" className="form-label mt-1">
              İşyeri Adı :{" "}
            </label>
          </div>
          <div className="col-8">
            <input
              type="text"
              name="companyName"
              className="form-control"
              value={companyName}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="mb-3 d-flex flex-row gap-1">
          <div className="col-2">
            <label htmlFor="companyOwner" className="form-label mt-1">
              Sahibi :{" "}
            </label>
          </div>
          <div className="col-8">
            <input
              type="text"
              name="companyOwner"
              className="form-control"
              value={companyOwner}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="mb-3 d-flex flex-row gap-1">
          <div className="col-2">
            <label htmlFor="phone" className="form-label mt-1">
              Telefon :{" "}
            </label>
          </div>
          <div className="col-8">
            <input
              type="text"
              name="phone"
              className="form-control"
              value={phone}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="mb-3 d-flex flex-row gap-1">
          <div className="col-2">
            <label htmlFor="address" className="form-label mt-1">
              Adres :{" "}
            </label>
          </div>
          <div className="col-8">
            <input
              type="text"
              name="address"
              className="form-control"
              value={address}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="mb-3 d-flex flex-row gap-1">
          <div className="col-2">
            <label htmlFor="taxOffice" className="form-label mt-1">
              Vergi Dairesi :{" "}
            </label>
          </div>
          <div className="col-8">
            <input
              type="text"
              name="taxOffice"
              className="form-control"
              value={taxOffice}
              onChange={onChange}
            />
          </div>
        </div>{" "}
        <div className="mb-3 d-flex flex-row gap-1">
          <div className="col-2">
            <label htmlFor="taxNumber" className="form-label mt-1">
              Vergi Numarası :{" "}
            </label>
          </div>
          <div className="col-8">
            <input
              type="text"
              name="taxNumber"
              className="form-control"
              value={taxNumber}
              onChange={onChange}
            />
          </div>
        </div>{" "}
        <div className="mb-3 d-flex flex-row gap-1">
          <div className="col-2">
            <label htmlFor="companyLogo" className="form-label mt-1">
              Şirket Logosu :{" "}
            </label>
          </div>
          <div className="col-8">
            <input
              type="file"
              name="companyLogo"
              className="form-control"
              value={companyLogo}
              onChange={onChange}
              accept="image/*"
            />
          </div>
        </div>
        {constantData?.companyLogo && (
          <div className="mb-3 d-flex flex-row gap-1">
            <label htmlFor="selectenLogo">SeÇilen Logo : </label>
            <div
              dangerouslySetInnerHTML={{ __html: constantData.companyLogo }}
            ></div>
          </div>
        )}
        <button
          className="btn btn-primary mt-2 btn-block w-100"
          onClick={handleSubmit}
        >
          <FaSave /> Kaydet
        </button>
      </section>
    </div>
  );
}

export default ConstantScreen;
