import React, { useState, useEffect } from "react";
import apiCategory from "../../../api/apiCategory";
import { useParams, useNavigate } from "react-router-dom";

function CategoryEdit() {
  const { id } = useParams();
  const [catName, setCatName] = useState("");
  const [parentId, setParentId] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("0");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    apiCategory.getCategoryById(id).then((res) => {
      try {
        // console.log(res);
        const categoryData = res.data.data.attributes;
        setCatName(categoryData.category_name);
        setParentId(categoryData.parent_id);
        setSlug(categoryData.slug);
        setStatus(categoryData.status);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

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
      status: status,
    };
    console.log(category);
    try {
      const response = await apiCategory.editCategory(id, { data: category });
      console.log(response);
      alert("Sửa thành công");
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h1>Sửa danh mục</h1>
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
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value="0">Không hiển thị</option>
            <option value="1">hiển thị</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3">
          Update
        </button>
      </form>
    </div>
  );
}

export default CategoryEdit;
