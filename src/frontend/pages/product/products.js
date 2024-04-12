import React, { useEffect, useState } from "react";
import apiProduct from "../../../api/apiProduct";
import ProductItem from "./productItem";

 function Products(){
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        apiProduct.getAll().then((res)=>{
            try{
                //console.log("res: ",res.data);
                const productData = res.data.map((product)=>{
                    return {
                        id: product.id,
                        name: product.attributes.product_name,
                        price: product.attributes.price,
                        slug: product.attributes.slug,
                        image: product.attributes.image.data.attributes.url
                    };
                });
                console.log("productData: ", productData);
                setProducts(productData);
                
            }catch(err){
                console.log("Error: ", err.message);
            }
        });
    }, []);
    return(
        <div className="row px-5 products">
            <h1>tất cả sản phẩm</h1>
            {
                products.map((product,index)=>{
                    return(
                        <ProductItem key={index} product={product}/>
                    );
                })
            }
        </div>
    );
 }


 export default Products;