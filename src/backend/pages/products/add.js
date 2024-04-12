import React, { useState, useEffect } from "react";
import apiCategory from "../../../api/apiCategory";
import apiBrand from "../../../api/apiBrand";
import apiProduct from "../../../api/apiProduct";
import axiosInstance from "../../../api/axios";

export default function ProductAdd() {
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [catId, setCatId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  //lấy tất cả danh mục
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
        console.log("Danh mục", categoryData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);
  //lấy tất cả thương hiệu
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
        console.log("Thương hiệu", brandData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      product_name: productName,
      slug: slug,
      cat_id: catId,
      category: catId,
      price: price,
      description: description,
      is_on_sale: isOnSale,
      sale_price: salePrice,
      image: image,
      brand_id: brandId,
    };
    console.log("Product Data ", productData);
    //up hình
    let file = new FormData();
    file.append("files", image);

    axiosInstance.enableUploadFile();
    axiosInstance
      .post("/upload", file)
      .then(async (res) => {
        const fileId = res.data[0].id;
        productData.image.push(fileId);
        console.log("Product Data", productData);
        axiosInstance.enableJson();
        const responseProduct = await apiProduct.createProduct({
          data: productData
        });
        console.log("Successful", responseProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{ width: "80%", margin: "auto" }}
      className="form-dvp">
      <h1>Thêm sản phẩm</h1>
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
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
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
          Them
        </button>
      </form>
    </div>
  );
}
