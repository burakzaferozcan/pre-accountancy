import axios from "axiıs";
import { BASE_URL } from "../constants";

const register = async (data) => {
  const response = await axios.post(BASE_URL + "/register", data);
  if (response.data) {
    localStorage.setItem("auth", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
};

export default authService;
