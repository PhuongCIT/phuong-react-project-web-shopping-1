import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategory";
import { useNavigate } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import apiBrand from "../../../api/apiBrand";
import axiosInstance from "../../../api/axios";
export default function ProductAdd() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [catId, setCatId] = useState("");
  const [description, setDescription] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState("");
  const [image, setImage] = useState(null);
  const [brandId, setBrandId] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

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

  ///

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      product_name: productName,
      cat_id: catId,
      price: price,
      slug: slug,
      description: description,
      is_on_sale: isOnSale,
      sale_price: salePrice,
      image: [],
      brand_id: brandId,
      category: catId,
    };
    // console.log("productData:", productData)

    let file = new FormData();
    file.append("files", image);

    axiosInstance.enableUploadFile();
    axiosInstance
      .post("/upload", file)
      .then(async (res) => {
        const fileId = res.data[0].id;
        productData.image.push(fileId);
        console.log("productData", productData);
        axiosInstance.enableJson();
        try {
          const responseProduct = await apiProduct.createProduct({
            data: productData,
          });
          console.log("successful", responseProduct);
          alert("Add Success");
          navigate("/admin/products/1");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1>THÊM SẢN PHẨM</h1>

      <form onSubmit={handleSubmit}>
        <div >
          <div className="form-dvp">
            <div className="row">
              <div className="col-md-7 ">
                <div className="mb-3">
                  <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="form-control"
                    placeholder="Nhập tên sản phẩm (*)"
                    required
                    type="product_name"
                    name="product_name"
                  />
                </div>
                <div className="cod-mb-3">
                  <input
                    className="form-control"
                    placeholder="Enter slug (*)"
                    required
                    type="slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
                <div className="row mt-3">
                  <div className="col-md">
                    <label
                      for="cat_id"
                      className="text-main">
                      Danh mục(*)
                    </label>
                    <select
                      className="form-control"
                      name="cat_id"
                      value={catId}
                      onChange={(e) => setCatId(e.target.value)}>
                      {categories.map((category, index) => {
                        return (
                          <option
                            placeholder="Chọn danh mục"
                            key={index}
                            value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md">
                    <label
                      for="brand_id"
                      className="text-main">
                      Thương hiệu(*)
                    </label>
                    <select
                      className="form-control"
                      name="brand_id"
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

                <div className="mb-3 ">
                  <textarea
                    className="form-control mt-3"
                    placeholder="nhập mô tả sản phẩm (*)"
                    required
                    type="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-5 mt-12 ">
                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Nhập giá (*)"
                    required
                    type="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="comb-3">
                  <input
                    className="form-control"
                    placeholder="Nhập giá khuyến mãi"
                    required
                    type="price"
                    name="price"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="is_on_sale"
                    >
                    is_on_sale(*)
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="is_on_sale"
                    value={isOnSale}
                    onChange={(e) => setIsOnSale(e.target.value)}
                  />
                </div>

                <div className="col-mb-3">
                  <label
                    for="image"
                    className="text-main">
                    Hình ảnh sản phẩm(*)
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  type="submit"
                  id="submit"
                  name="submit">
                  <p>Thêm</p>
                </button>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </form>
    </div>
  );
}
