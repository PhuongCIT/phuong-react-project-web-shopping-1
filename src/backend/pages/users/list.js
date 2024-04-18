import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import apiUser from "../../../api/apiUser";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiUser.getAll().then((res) => {
      try {
        const userData = res.map((item) => {
          return {
            id: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            username: item.username,
            email: item.email,
          };
        });
        setUsers(userData);
        console.log("Danh sach user: ", userData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <h1>Danh sách người dùng</h1>
      <table className="table table-striped table-bordered">
        <tr>
          <th>ID</th>
          <th>firstname</th>
          <th>lastname</th>
          <th>username</th>
          <th>email</th>
          <th> Hành động</th>
        </tr>
        {users.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>
                <button>
                  <Link
                    className="btn btn-success"
                    to={`/admin/detailUser/${item.id}`}>
                    Chi tiết <IoEyeSharp />
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
