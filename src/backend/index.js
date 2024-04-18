import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function IndexAdmin() {
  return (
    <div>
      <div className="p-5 bg-primary text-white text-center">
        <h1>ADMIN</h1>
        <p>TRANG QUẢN LÝ</p>
      </div>

      <nav className="navbar navbar-expand-md bg-dark navbar-dark justify-content-center ">
        <div className="container-fluid ">
          <Link
            className="navbar-brand"
            to="/">
            Home User
          </Link>
          <Link
            className="navbar-brand"
            to="/admin">
            Home admin
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/category">
                  Danh mục
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/brands">
                  Thương hiệu
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/products/1">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/users">
                  Người dùng
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/order">
                  Đơn hàng
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="#">
                  Nhận hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <Outlet />
        </div>
      </div>

      <div className="mt-5 p-4 bg-dark text-white text-center">
        <p>Footer</p>
      </div>
    </div>
  );
}
