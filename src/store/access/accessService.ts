import api from "@/config/apiConfig";
import type { UserData } from "@/config/interface";

// Create User
const createUser = async (userData: UserData) => {
  const response = await api.post("/users/create", userData);
  return response.data;
};

// Get User
const getUsers = async (query : string) => {
  const response = await api.post("/users/get", query);
  return response.data;
};

// Update User
const updateUser = async (userData: UserData) => {
  const response = await api.put("/users/update", userData);
  return response.data;
};

// Update User
const deleteUser = async (id: number) => {
  const response = await api.delete("/users/detete/"+id);
  return response.data;
};

const accessService = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};

export default accessService;
