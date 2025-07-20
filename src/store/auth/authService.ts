import api from "@/config/apiConfig";
import type { LoginData } from "@/config/interface";


// Login User
const login = async (loginData: LoginData) => {
  const response = await api.post("/admin/login", loginData);
  return response.data;
};

const logout = async () => {
  const response = await api.get("/admin/logout");
  return response.data;
};

const getLoginStatus = async () => {
  const response = await api.get("/admin/getstatus");
  return response.data;
};

const authService = {
  login,
  logout,
  getLoginStatus,
};

export default authService;
