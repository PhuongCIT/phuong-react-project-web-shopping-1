// import IndexAdmin from "../backend";
import CategoryList from "../backend/pages/category/list";
import CategoryAdd from "../backend/pages/category/add";
import CategoryEdit from "../backend/pages/category/edit";

import ProductList from "../backend/pages/products/list";
import ProductAdd from "../backend/pages/products/add";
import ProductEdit from "../backend/pages/products/edit";

import BrandList from "../backend/pages/brands/list";
import BrandAdd from "../backend/pages/brands/add";
import BrandEdit from '../backend/pages/brands/edit';

import UserList from "../backend/pages/users/list";
import UserDetail from '../backend/pages/users/detail';

import NotFound from '../backend/pages/notFound';



const BackendRoute = [
  //category
  { path: "/admin/category", component: CategoryList },
  { path: "/admin/addCategory", component: CategoryAdd },
  { path: "/admin/editCategory/:id", component: CategoryEdit },

  //products
  { path: "/admin/products/:page", component: ProductList },
  { path: "/admin/addProduct", component: ProductAdd },
  { path: "/admin/editProduct/:slug", component: ProductEdit },

  //brand
  { path: "/admin/brands", component: BrandList },
  { path: "/admin/addBrand", component: BrandAdd },
  { path: "/admin/editBrand/:id", component: BrandEdit },


  //user
  { path: "/admin/users", component: UserList },
  { path: "/admin/detailUser", component: UserDetail },

  {'path': '/admin/*', 'component': NotFound}
];

export default BackendRoute;
