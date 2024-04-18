import axiosInstance from "./axios";

const apiProduct = {
  //lấy tất cả sản phẩm
  getAll: () => {
    return axiosInstance.get("/products?populate=*").then((res) => res.data);
  },
  //lấy sản phẩm mới
  getNewest: () => {
    return axiosInstance
      .get("/products?sort[0]=createdAt:desc&pagination[limit]=6&populate=*")
      .then((res) => res.data);
  },

  getPromotion: () => {
    return axiosInstance
      .get(
        "/products?filter[is_one_sale][$eq]=true&pagination[limit]=6&populate=*"
      )
      .then((res) => res.data);
  },
  //chi tiết sản phẩm
  getDetailProductBySlug: (slug) => {
    return axiosInstance
      .get(`/products?filters[slug][$eq]=${slug}&populate=*`)
      .then((res) => res.data);
  },
// lấy sản phẩm theo  brand
  getProductByBrandSlug: (slug)=>{
    return axiosInstance.get(`/products?filters[brand][slug][$eq]=${slug}&populate=*`).then((res)=> res.data);

  },
  //lấy sản phẩm theo danh mục
  getProductByCatSlug: (slug) => {
    return axiosInstance
      .get(`/products?filters[category][slug][$eq]=${slug}&populate=*`)
      .then((res) => res.data);
  },
  //lấy sản phẩm theo id
  getProductById: (id) => {
    return axiosInstance.get(`/products/${id}`).then((res) => res.data);
  },

  //lấy sản phẩm phân trang
  getProductPagination: (page, limit) => {
    return axiosInstance
      .get(
        `/products?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`
      )
      .then((res) => res.data);
  },
  //thêm sản phẩm
  createProduct: (data) => {
    return axiosInstance.post("/products", data);
  },

  //sửa 1 sản phẩm
  updateProduct: (id, data) => {
    return axiosInstance.put(`/products/${id}`, data);
  },

  //xóa 1 sản phẩm
  delProductById: (id) => {
    return axiosInstance.delete(`/products/${id}`);
  },
};

export default apiProduct;
