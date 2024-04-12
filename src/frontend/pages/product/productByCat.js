import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./productItem";

const ProductByCat = () => {
  const { slug } = useParams();
  const [productsByCat, setproductsByCat] = useState([]);

  useEffect(() => {
    apiProduct.getDetailProductBySlug(slug).then((res) => {
      try {
        const data = res.data;
        const products = data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.product_name,
            price: item.attributes.price,
            image: item.attributes.image.data.attributes.url,
          };
        });
        setproductsByCat(products);

      } catch (e) {
        console.log("Erron: ", e);
      }
    });
  }, [ProductByCat]);
  return (
    <div className="row px-5 products">
      <h1>Sản phẩm của chúng tôi</h1>
      {productsByCat.map((product, index) => {
        return (
          <ProductItem
            key={index}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default ProductByCat;
