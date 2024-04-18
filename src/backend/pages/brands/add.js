import apiBrand from "../../../api/apiBrand";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BrandAdd() {
  const [brandName, setBrandName] = useState("");
  const [address, setAddress] = useState("");
  const [slug, setSlug] = useState("");
  // const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // apiBrand.getAll().then((res) => {
    //   try {
    //     const brandData = res.data.map((item) => {
    //       return {
    //         id: item.id,
    //         name: item.attributes.brand_name,
    //         address: item.attributes.address,
    //         slug: item.attributes.slug,
    //       };
    //     });
    //     setBrands(brandData);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const brand = {
      brand_name: brandName,
      address: address,
      slug: slug,
    };
    console.log(brand);
    try {
      const response = await apiBrand.createBrand({ data: brand });
      console.log(response);
      alert("Them thanh cong");
      navigate("/admin/brand");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ width: "50%", margin: "auto" }}
      className="form-dvp">
      <h1>Thêm Thương hiệu</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <input
            type="text"
            required
            placeholder="Nhập tên thương hiệu"
            className="form-control"
            name="brand_name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <input
            type="text"
            placeholder="Nhập Slug"
            className="form-control"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="text"
            required
            placeholder="Nhập Địa chỉ"
            className="form-control"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3">
          Them
        </button>
      </form>
    </div>
  );
}

export default BrandAdd;
