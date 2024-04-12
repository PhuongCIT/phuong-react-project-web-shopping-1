import { Link } from "react-router-dom";
import React from "react";
import { imageURL } from "../../../api/config";

function ProductItem(props){
    return(
        <div className="col-md-3 productItem me-1" key={props.key}>
            <Link to={`/product-detail/${props.product.slug}`} key={props.key}>
                <img src={imageURL + props.product.image} alt={props.product.name}/>
                {/* <img src ="logo192.png" /> */}
                <h5 className="card-title">{props.product.name}</h5>
                <h6 key={props.key}>{props.product.price}</h6>

            </Link>
        </div>
    );
}

export default ProductItem;