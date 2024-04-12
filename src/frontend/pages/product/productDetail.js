import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";
import { useDispatch } from "react-redux";
import { ADD } from "../../../redux/action/cartAction";
function ProductDetail() {
    const {slug} = useParams();
    const [ProductDetail, setProductDetail] = useState([]);
    const [amoubtItem, setAmountItem] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        apiProduct.getDetailProductBySlug(slug).then((res) => {
            try{
                const productAttributes = res.data[0].attributes;
                    const product = {
                        id: res.data[0].id,
                        name: productAttributes.product_name,
                        price: productAttributes.price,
                        slug: productAttributes.slug,
                        image: productAttributes.image.data.attributes.url,
                        description: productAttributes.description,
                    }
                setProductDetail(product);
                //console.log("product: ", product)

            }catch(err){
                console.log("Erron: ", err.message);
            }
        });
    },[]);

    const handleAddToCart = (amoubtItem) =>{
        const product ={
            ...ProductDetail,
            amount: amoubtItem
        };
        dispatch(ADD(product));
    }   
    const increaseItemCart = () =>{
        setAmountItem(amoubtItem + 1);
    }
    const decreaseItemCart = () =>{
        if (amoubtItem > 1){
            setAmountItem(amoubtItem - 1);
        }
    }


    return(
        <div>
           <h1>Chi tiết sản phẩm</h1>
           <div className="row px-5 my-5">
                <div className="col-md-5 img-detail broder">
                    <img src={imageURL+ProductDetail.image} alt={ProductDetail.name} />
                </div>
                <div className="col-md-7 detail">
                    <h2>{ProductDetail.name}</h2>
                    <h5 className="md-4">đ {ProductDetail.price}</h5>
                    <p className="md-4">{ProductDetail.description}</p>

                    <div className="d-flex align items-center md-4 pt-2 quantity">
                        <div className="input-group mr-3">
                            <span>Số Lượng</span>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-minus" onClick={() => decreaseItemCart()}>
                                    <i className="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" className="text-center" value={amoubtItem} onChange={(e) => setAmountItem(e.target.value)}/>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-plus" onClick={() => increaseItemCart()}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-primary px-3 ms-2" onClick={()=> handleAddToCart(amoubtItem)}><i className="fa fa-shopping-cart mr-1"></i>Thêm vào giỏ</button>
                    </div>
                </div>
           </div>
        </div>
    );
}

export default ProductDetail;