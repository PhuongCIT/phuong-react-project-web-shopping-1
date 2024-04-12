import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategory";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

function CategoryList(){
    const [categories, setCategories] = useState([]);
    const [delCategoryItem, setDelCategoryItem] = useState(false);

    useEffect(() => {
        apiCategory.getAll().then(res => {
            try{
                const categoryData = res.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.attributes.category_name,
                        parent_id: item.attributes.parent_id,
                        slug: item.attributes.slug
                    }
                });
                setCategories(categoryData);
            }catch(e){
                console.log(e);
            }
        });
    }, [delCategoryItem]);
    const delCategory = async (id) => {
        apiCategory.delCategoryById(id).then(res => {
            try{
                alert("Xóa thành công");
                setDelCategoryItem(id);
            }catch(e){
                console.log(e);
            }
        });
    }

    return(
        <div style={{ width: "100%", margin: "auto" }}>
            <h1>Danh sách danh mục</h1>
            <div className="from-group mb-4">
                
                <Link to="/admin/addCategory" className="btn btn-primary">
                    Thêm danh mục
                </Link>
                
            </div>
            <table className="table table-striped table-bordered">
                <tr><th>ID</th><th>Danh mục</th><th>Danh mục cha</th><th>Slug</th><th>Hành động</th></tr>
                {
                    categories.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    {
                                        categories.map((catagory, index) =>{
                                            if(catagory.id === item.parent_id){
                                                return catagory.name;
                                            }
                                        })
                                    }
                                </td>
                                <td>{item.slug}</td>
                                <td>
                                    <button><Link className="btn btn-info" to={`/admin/detailCategory/${item.id}`}>Chi tiết <IoEyeSharp /></Link></button>
                                    <button><Link className="btn btn-success" to={`/admin/editCategory/${item.id}`}>Sửa <FaEdit /></Link></button>
                                    <button><Link className="btn btn-danger" onClick={() => delCategory(item.id)}>Xóa <MdDelete /></Link></button>
                                </td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    );
}


export default CategoryList;