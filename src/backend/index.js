import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../frontend/partial/footer";
function IndexAdmin() {
  return (
    <div>
      <div className="p-5 bg-primary text-white text-center">
        <h1>Adimin</h1>
      </div>

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/admin">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown">
                Danh sách quản lý
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin/category">
                    Danh mục
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin/products/1">
                    Sản Phẩm
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="#">
                    Người dùng
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="#">
                    Đơn hàng
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="#">
                    Nhận hàng
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <Outlet />
        </div>
      </div>

      <div className="mt-5 p-4 bg-dark text-white text-center">
        <Footer />
      </div>
    </div>
  );
}

export default IndexAdmin;
