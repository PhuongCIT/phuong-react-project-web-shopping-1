import axiosInstance from "./axios";

const apiUser = {
  createUser: (data) => {
    return axiosInstance.post("/auth/local/register", data);
  },
  //đăng nhập bên người dùng
  loginUser: (data) => {
    return axiosInstance.post("/auth/local", data);
  },
  // lấy tất cả người dùng
  getAll: () => {
    return axiosInstance.get("/users").then((res) => res.data);
  },

  //api lấy 1 user
  getUserById: (id) => {
    return axiosInstance.get(`/users/${id}`);
  },
};

export default apiUser;
