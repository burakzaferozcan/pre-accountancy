import React from "react";
import { FaKey } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/auth/AuthSlice";
import { toast } from "react-toastify";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = React.useState({
    userName: "",
    userPassword: "",
  });
  const { userName, userPassword } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = (e) => {
    if (userName === "" || userPassword === "") {
      toast.error("Gütfen alanları doldurunuz!");
    } else {
      dispatch(login(data));
    }
  };

  React.useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="d-flex align-items-center mt-5">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 col-lg-8 mt-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="text-center mb-4">
                  <h2>Muhasebe v.1.0.0</h2>
                </div>
                <hr className="my-2" />
                <div className="mb-3 d-flex flex-row gap-1">
                  <label className="form-label col-3 mt-1" htmlFor="userName">
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={userName}
                    placeholder="Kullanıcı Adı"
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3 d-flex flex-row gap-1">
                  <label
                    className="form-label col-3 mt-1"
                    htmlFor="userPassword"
                  >
                    Şifre
                  </label>
                  <input
                    type="password"
                    name="userPassword"
                    value={userPassword}
                    placeholder="Şifre"
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                {user && user.isLogin && (
                  <div className="text-danger">{user.message}</div>
                )}
                <button
                  className="btn btn-primary mb-3 w-100"
                  onClick={onLogin}
                >
                  <FaKey className="me-2" /> Giriş
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
