import apiCategory from "../../../api/apiCategory";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CategoryAdd() {
  const [catName, setCatName] = useState("");
  const [parentId, setParentId] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    apiCategory.getAll().then((res) => {
      try {
        const categoryData = res.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.category_name,
            parent_id: item.attributes.parent_id,
            slug: item.attributes.slug,
          };
        });
        setCategories(categoryData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = {
      category_name: catName,
      parent_id: parseInt(parentId),
      slug: slug,
    };
    console.log(category);
    try {
      const response = await apiCategory.createCategory({ data: category });
      console.log(response);
      alert("Them thanh cong");
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ width: "50%", margin: "auto" }}
      className="form-dvp">
      <h1>Thêm danh mục</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category_name">Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            name="category_name"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="parent_id">Danh mục cha</label>
          <select
            className="form-control"
            name="parent_id"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}>
            <option value="0">không có danh mục cha</option>
            {categories.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            className="form-control"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary">
          Them
        </button>
      </form>
    </div>
  );
}

export default CategoryAdd;
