import React, { useEffect, useState } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./productItem";
//import { Link, useParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

//   const [pages, setPages] = useState(1);
//   const page = parseInt(useParams().page);
//   const limit = 5;

  useEffect(() => {
    apiProduct.getAll().then((res) => {
      try {
        console.log("res: ", res.data);
        const productData = res.data.map((product) => {
          return {
            id: product.id,
            name: product.attributes.product_name,
            price: product.attributes.price,
            slug: product.attributes.slug,
            image: product.attributes.image.data.attributes.url,
          };
        });
        console.log("productData: ", productData);
        setProducts(productData);
      } catch (err) {
        console.log("Error: ", err.message);
      }
    });
  }, []);

//   useEffect(() => {
//     apiProduct.getProductPagination(page, limit).then((res) => {
//       try {
//         const numberOfPages = Math.ceil(
//           res.meta.pagination.total / res.meta.pagination.pageSize
//         );
//         setPages(numberOfPages);
//         const productsData = res.data.map((item) => {
//           return {
//             id: item.id,
//             product_name: item.attributes.product_name,
//             price: item.attributes.price,
//             sale_price: item.attributes.sale_price,
//             image: item.attributes.image.data.attributes.url,
//           };
//         });
//         setProducts(productsData);
//         console.log("Product list: ", productsData);
//       } catch (error) {
//         console.log("Failed to fetch product list: ", error);
//       }
//     });
//   }, [page]);
  return (
    <div className="row px-5 products">
      <h1>tất cả sản phẩm</h1>
      {products.map((product, index) => {
        return (
          <ProductItem
            key={index}
            product={product}
          />
        );
      })}

      {/* <ul className="pagination">
        <li class="page-item">
          <Link
            class="page-link"
            to={`/products/${page - 1}`}>
            Previous
          </Link>
        </li>
        {Array.from(Array(pages).keys()).map((index) => (
          <li
            key={index}
            className={`page-item ${index + 1 === page ? "active" : ""}`}>
            <Link
              className="page-link"
              to={`/products/${index + 1}`}>
              {index + 1}
            </Link>
          </li>
        ))}
        <li class="page-item">
          <Link
            class="page-link"
            to={`/products/${page + 1}`}>
            Next
          </Link>
        </li>
      </ul> */}
    </div>
  );
}

export default Products;
