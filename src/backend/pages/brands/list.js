import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import apiBrand from "../../../api/apiBrand";

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [delBrandItem, setDelBrandItem] = useState(false);
  useEffect(() => {
    apiBrand.getAll().then((res) => {
      try {
        const brandData = res.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.brand_name,
            slug: item.attributes.slug,
            address: item.attributes.address,
          };
        });
        setBrands(brandData);
      } catch (e) {
        console.log(e);
      }
    });
  }, [delBrandItem]);
  const delBrand = async (id) => {
    apiBrand.delBrandById(id).then((res) => {
      try {
        alert("Xóa thành công");
        setDelBrandItem(id);
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <h1>Danh sách Thương hiệu</h1>
      <div className="from-group mb-4">
        <Link
          to="/admin/addBrand"
          className="btn btn-primary">
          Thêm Thương hiệu
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <tr>
          <th>ID</th>
          <th>Tên Thương hiệu</th>
          <th>Slug</th>
          <th>Address</th>
          <th>Hành động</th>
        </tr>
        {brands.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>{item.address}</td>
              <td>
                
                <button>
                  <Link
                    className="btn btn-success"
                    to={`/admin/editBrand/${item.id}`}>
                    Sửa <FaEdit />
                  </Link>
                </button>
                <button>
                  <Link
                    className="btn btn-danger"
                    onClick={() => delBrand(item.id)}>
                    Xóa <MdDelete />
                  </Link>
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default BrandList;
