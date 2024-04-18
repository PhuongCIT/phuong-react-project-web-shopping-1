import { useContext, useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import apiCategory from "../../api/apiCategory";
import UserContext from "../context/userContext";

function Menu() {
  const { user } = useContext(UserContext);
  const [subMenu, setSubMenu] = useState([]);
  useEffect(() => {
    apiCategory.getAll().then((res) => {
      try {
        const menuData = res.data.map((item) => {
          return {
            id: item.id,
            name: item.attributes.category_name,
            slug: item.attributes.slug,
            parent: item.attributes.parent_id,
          };
        });
        setSubMenu(menuData);
        console.log(menuData);
      } catch (e) {
        console.log(e);
      }
    });
  }, []);
  return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark  ">
        <div className="container-fluid justify-content-center ">
          <ul className="navbar-nav header">
            <li className="nav-item ">
              <a
                href="/"
                className="nav-link ">
                Trang chủ
              </a>
            </li>
            <li className="nav-item nav-link  dropdown ">
              <a
                href="/products"
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown">
                SHOP
              </a>
              <ul className="dropdown-menu">
                {subMenu.map((submenu, index) => {
                  return submenu.parent === 0 ? (
                    <li
                      key={index}
                      className="dropdown-item">
                      <a href={`/products-by-cat/${submenu.slug}`}>
                        {submenu.name}
                      </a>
                      <ul className="dropdown-menu">
                        {subMenu.map((sub, index) => {
                          return sub.parent === submenu.id ? (
                            <li
                              className="dropdown-item"
                              key={index}>
                              <a href={`/products-by-cat/${sub.slug}`}>
                                {sub.name}
                              </a>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </li>
                  ) : null;
                })}
              </ul>
            </li>

            <li>
              <a
                href="/blog"
                className="nav-item nav-link ">
                Blog
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="nav-item nav-link ">
                Liên hệ
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="nav-item nav-link ">
                Đăng ký
              </a>
            </li>

            {user ? (
              <li>
                <a
                  href="/logout"
                  className="nav-item nav-link ">
                  Đăng Xuất
                </a>
              </li>
            ) : (
              <li>
                <a
                  href="/login"
                  className="nav-item nav-link ">
                  Đăng nhập
                </a>
              </li>
            )}

            <li>
              <a
                href="/account"
                className="nav-item nav-link ">
                Tài khoản
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
}
export default Menu;
