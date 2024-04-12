import axiosInstance from "./axios";

const apiBrand = {
  //lấy tất cả thương hiệu
  getAll: () => {
    return axiosInstance.get("/brands").then((res) => res.data);
  },
  //thêm danh mục
  createBrand: (brand) => {
    return axiosInstance.post("/brands", brand).then((res) => res.data);
  },
  //api lấy 1 danh mục
  getBrandById: (id) => {
    return axiosInstance.put(`/brands/${id}`);
  },
  //sửa 1 danh mục
  editBrand: (id, brand) => {
    return axiosInstance.put(`/brands/${id}`, brand);
  },
  //xóa  1 danh mục
  delBrandById: (id) => {
    return axiosInstance.delete(`/brands/${id}`);
  },
};
export default apiBrand;
