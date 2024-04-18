import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [delProductItem, setDelProductItem] = useState(false);

  const [pages, setPages] = useState(1);
  const page = parseInt(useParams().page);
  const limit = 5;

  useEffect(
    () => {
      apiProduct.getProductPagination(page, limit).then((res) => {
        try {
          const numberOfPages = Math.ceil(
            res.meta.pagination.total / res.meta.pagination.pageSize
          );
          setPages(numberOfPages);
          const productsData = res.data.map((item) => {
            return {
              id: item.id,
              product_name: item.attributes.product_name,
              slug: item.attributes.slug,
              cat_id: item.attributes.category_name,
              description: item.attributes.description,
              is_on_sale: item.attributes.is_on_sale,
              price: item.attributes.price,
              sale_price: item.attributes.sale_price,
              image: item.attributes.image.data.attributes.url,
            };
          });
          setProducts(productsData);
          console.log("Product list: ", productsData);
        } catch (error) {
          console.log("Failed to fetch product list: ", error);
        }
      });
    },
    [page],
    [delProductItem]
  );
  //chưa xong
  const delProduct = async (id) => {
    apiProduct.delProductById(id).then((res) => {
      try {
        alert("Xóa thành công");
        setDelProductItem(id);
      } catch (e) {
        console.log(e);
      }
    });
  };
  //end

  return (
    <div className="container">
      <h1>Product List</h1>

      <div className="from-group mb-4">
        <Link
          to="/admin/addProduct"
          className="btn btn-primary">
          Thêm sản phẩm
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <tr>
          <th>ID</th>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Danh mục</th>
          <th>Đơn giá</th>
          <th>Hành động</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <img
                src={imageURL + product.image}
                alt={product.product_name}
                width="100px"
              />
            </td>
            <td>{product.product_name}</td>
            <td>{product.cat_id}</td>
            <td>{product.price}</td>
            <td>
              <button>
                <Link
                  className="btn btn-success"
                  to={`/admin/editProduct/${product.id}`}>
                  {" "}
                  sửa <FaEdit />
                </Link>
              </button>
              <button>
                <Link
                  className="btn btn-danger"
                  onClick={() => delProduct(product.id)}>
                  Xóa
                  <MdDelete />
                </Link>
              </button>
            </td>
          </tr>
        ))}
      </table>
      <ul className="pagination">
        <li class="page-item">
          <Link
            class="page-link"
            to={`/admin/products/${page - 1}`}>
            Previous
          </Link>
        </li>
        {Array.from(Array(pages).keys()).map((index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === page ? "active" : ""}`}>
            <Link
              className="page-link"
              to={`/admin/products/${index + 1}`}>
              {index + 1}
            </Link>
          </li>
        ))}
        <li class="page-item">
          <Link
            class="page-link"
            to={`/admin/products/${page + 1}`}>
            Next
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ProductList;
