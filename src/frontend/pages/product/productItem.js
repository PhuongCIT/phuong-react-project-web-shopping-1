//import { Link } from "react-router-dom";
import React from "react";
import { imageURL } from "../../../api/config";

function ProductItem(props) {
  return (
    <div
      className=" col-md-3 productItem me-1 m-2"
      key={props.key}>
      <a
        href={`/product-detail/${props.product.slug}`}
        key={props.key}>
        <img
          className="card-image-top"
          src={imageURL + props.product.image}
          alt={props.product.name}
        />
        <div className="">
          <p className="">{props.product.name}</p>
          <h6 className="" key={props.key}>$ {props.product.price}</h6>
        </div>
      </a>
    </div>
  );
}

export default ProductItem;
