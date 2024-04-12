import React, { useState, useEffect } from "react";
import apiCategory from "../../../api/apiCategory";
import { Link,useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export default function CategoryDetail() {
  const { id } = useParams();
  const [catName, setCatName] = useState("");
  const [parentID, setParentID] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("0");
  const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();
  useEffect(() => {
    apiCategory.getCategoryById(id).then((res) => {
      try {
        console.log(res);
        const categoryData = res.data.data.attributes;
        setCatName(categoryData.category_name);
        setParentID(categoryData.parent_id);
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
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const category = {
//       category_name: catName,
//       parent_id: parseInt(parentID),
//       slug: slug,
//       status: status,
//     };
//     console.log(category);
//     try {
//       const response = await apiCategory.editCategory(id, { data: category });
//       //console.log(response);
//       alert("Sửa thành công");
//     //   navigate("/admin/category");
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h1>Sửa danh mục</h1>
      <div className="">
        <div className="form-group">
          <label htmlFor="category_name">Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            name="category_name"
            value={catName}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parent_id">Danh mục cha</label>
          <select
            className="form-control"
            name="parent_id"
            value={parentID} 
            required>
            
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            className="form-control"
            name="slug"
            value={slug}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="slug">Status</label>
          <select
            className="form-control"
            name="status"
            value={status}
            required>
          </select>
        </div>
        <button         
          className="btn btn-primary">
          Quay lại<BiArrowBack />
        </button>
      </div>
    </div>
  );
}

