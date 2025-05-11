import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = BASE_URL + "/auth";

const register = async (data) => {
  const response = await axios.post(API_URL + "/register", data);
  if (response.data) {
    localStorage.setItem("auth", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(API_URL + "/login", data);
  if (response.data) {
    localStorage.setItem("auth", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async (data) => {
  localStorage.removeItem("auth");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
