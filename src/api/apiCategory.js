import axiosInstance from "./axios";

const apiCategory = {
  //lấy tất cả danh mục
  getAll: () => {
    return axiosInstance.get("/categories").then((res) => res.data);
  },
  //thêm danh mục
  createCategory: (category) => {
    return axiosInstance.post("/categories", category).then((res) => res.data);
  },
  //api lấy 1 danh mục
  getCategoryById: (id) => {
    return axiosInstance.put(`/categories/${id}`);
  },
  //sửa 1 danh mục
  editCategory: (id, category) => {
    return axiosInstance.put(`/categories/${id}`, category);
  },
  //xóa  1 danh mục
  delCategoryById: (id) => {
    return axiosInstance.delete(`/categories/${id}`);
  },
};

export default apiCategory;
