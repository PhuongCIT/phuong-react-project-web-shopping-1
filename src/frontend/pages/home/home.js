import React, { useEffect, useState } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "../product/productItem";

function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [promotionProducts, setPromotionProducts] = useState([]);
  useEffect(() => {
    apiProduct.getNewest().then((res) => {
      try{
        const newProductData = res.data.map((product) => {
          return {
            id: product.id,
            name:product.attributes.product_name,
            price: product.attributes.price,
            slug: product.attributes.slug,
            image: product.attributes.image.data.attributes.url,
          }});
        setNewProducts(newProductData);
        
        //console.log(newProducts);
      }catch(err){
        console.log(err);
      }
       
    });
  },[]);
  //sale
  useEffect(() => {
    apiProduct.getPromotion().then((res) => {
      try{
        const promotionProductData = res.data.map((product) => {
          return {
            id: product.id,
            name:product.attributes.product_name,
            price: product.attributes.price,
            slug: product.attributes.slug,
            image: product.attributes.image.data.attributes.url,
          }});
        setPromotionProducts(promotionProductData);
        
        //console.log(newProducts);
      }catch(err){
        console.log(err);
      }
       
    });
  },[]);


    return (
      <div className="row px-5 d-flex justify-content-between">
        <h1>Sản phẩm mới nhất</h1>
        {
          newProducts.map((product, index) => {
            return (
              <ProductItem key={index} product={product}/>
            )
          })
        }

        <h1>Sản phẩm khuyển mãi</h1>
        {
          promotionProducts.map((product, index) => {
            return (
              <ProductItem key={index} product={product}/>
            )
          })
        }
      </div>
    );
  }
  
  export default Home;