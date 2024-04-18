import React, { useState, useEffect } from "react";
import apiCategory from "../../../api/apiCategory";
import apiBrand from "../../../api/apiBrand";
import { imageURL } from "../../../api/config";
import apiProduct from "../../../api/apiProduct";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axios";

export default function ProductEdit() {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [slugProduct, setSlugProduct] = useState("");
  const [catId, setCatId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [image, setImage] = useState(null);
  const [brandId, setBrandId] = useState("");
  const [imageId, setImageId] = useState(0);
  const [productId, setProductId] = useState(0);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    apiProduct.getProductById(id).then((res) => {
      try {
        // console.log("Product Detail: ", res);

        const productAttributes = res.data[0].attributes;
        setProductId(res.data[0].id);
        setProductName(productAttributes.product_name);
        setPrice(productAttributes.price);
        setSlugProduct(productAttributes.slug);
        setCatId(productAttributes.cat_Id);
        setImage(productAttributes.image.data[0].attributes.url);
        setIsOnSale(productAttributes.is_on_sale);
        setSalePrice(productAttributes.sale_price);
        setDescription(productAttributes.description);
        setBrandId(productAttributes.brand_id);
        setImageId(productAttributes.image.data[0].id);
      } catch (err) {
        console.log("Error: ", err.message);
      }
    });
  }, []);

  useEffect(() => {
    apiCategory.getAll().then((res) => {
      try {
        const categoryData = res.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.category_name,
          };
        });
        setCategories(categoryData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  useEffect(() => {
    apiBrand.getAll().then((res) => {
      try {
        const brandData = res.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.brand_name,
          };
        });
        setBrands(brandData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      id: productId,
      product_name: productName,
      slug: slugProduct,
      cat_id: catId,
      price: price,
      description: description,
      is_on_sale: isOnSale,
      brand_id: brandId,
      category: catId,
      image: [imageId],
    };
    console.log("Product Data: ", productData);
    let file = new FormData();
    file.append("files", image);
    const fileObject = file.get("files");
    if (fileObject instanceof file) {
      if (fileObject !== "") {
        axiosInstance.enableUploadFile();
        const res = await axiosInstance.post("/upload", file);
        const fileId = res.data[0].id;
        productData.image[0] = fileId;
        console.log("File ID: ", productData.image[0]);
      } else {
        console.log("No file selected !");
      }
    } else {
      console.log("File object is not a file");
    }
    axiosInstance.enableJson();
    const responseProduct = await apiProduct.updateProduct(productData.id, {
      data: productData,
    });
    console.log("Response Peoduct: ", responseProduct);
    navigate("/admin/products/1");
  };

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <h1>Sửa sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3 ">
              <label htmlFor="product_name">Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                name="product_name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                value={slugProduct}
                onChange={(e) => setSlugProduct(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="parent_id">Danh mục cha</label>
              <select
                className="form-control"
                name="parent_id"
                value={catId}
                onChange={(e) => setCatId(e.target.value)}>
                {categories.map((category, index) => {
                  return (
                    <option
                      key={index}
                      value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3  mt-3">
              <label
                htmlFor="parent_id"
                className="form-label">
                Đơn giá
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập đơn giá"
                name="cat_id"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="parent_id"
                className="form-label">
                Mô tả sản phẩm
              </label>
              <textarea
                className="form-control"
                placeholde="Nhập mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label
                htmlFor="sale"
                className="form-label">
                Giảm giá
              </label>
              <input
                type="checkbox"
                className="form-check-input"
                name="is_on_sale"
                id="is_on_sale"
                value={isOnSale}
                onChange={(e) => setIsOnSale(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="sale_price"
                className="form-label">
                Giá khuyến mãi
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập Giá khuyến mãi"
                name="sale_price"
                id="sale_price"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="image"
                className="form-label">
                Hình ảnh
              </label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e) => setImage(e.target.files)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parent_id">Thương hiệu</label>
              <select
                className="form-control"
                name="parent_id"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}>
                {brands.map((brand, index) => {
                  return (
                    <option
                      key={index}
                      value={brand.id}>
                      {brand.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  );
}
