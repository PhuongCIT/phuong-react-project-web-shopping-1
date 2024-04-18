import React, { useState, useEffect } from "react";
import apiUser from "../../../api/apiUser";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function UserDetail() {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiUser.getUserById(id).then((res) => {
      try {
        console.log(res);
        const userData = res.data;
        setUserName(userData.username);
        setEmail(userData.email);
        console.log(">>>> data: ", res);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  useEffect(() => {
    apiUser.getAll().then((res) => {
      try {
        const userData = res.map((item) => {
          return {
            id: item.id,
            username: item.username,
            email: item.email,
          };
        });
        setUsers(userData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h1>Chi tiết người dùng</h1>
      <div>
        <button >
          <Link
            className="nav-link btn btn-success"
            to="/admin/users"><IoArrowBack/>
            quay về
          </Link>
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="username">username</label>
        <input
          type="text"
          className="form-control"
          disabled
          name="username"
          value={userName}
          //   onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          disabled
          name="email"
          value={email}
          //   onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}
