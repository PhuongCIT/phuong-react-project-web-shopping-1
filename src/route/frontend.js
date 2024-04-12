import Home from "../frontend/pages/home/home";
import About from "../frontend/pages/about/about";
import Contact from "../frontend/pages/contact/contact";
import Products from "../frontend/pages/product/products";
import ProductDetail from "../frontend/pages/product/productDetail";
import ProductByCat from "../frontend/pages/product/productByCat";
import NotFound from "../frontend/pages/notFound";
import Register from "../frontend/pages/user/register";
import LoginUser from "../frontend/pages/user/login";
import LogoutUser from "../frontend/pages/user/logout";
import Cart from "../frontend/pages/cart/cart";
import Checkout from "../frontend/pages/cart/checkout";
const FrontendRoute = [
    {'path': '/', 'component':Home},
    {'path': '/about', 'component':About},
    {'path': '/contact', 'component':Contact},
    {'path': '/products', 'component':Products},
    {'path': '/product-detail/:slug', 'component':ProductDetail },
    {'path': '/products-by-cat/:slug', 'component':ProductByCat },
    {'path': '/register', 'component':Register },
    {'path': '/login', 'component':LoginUser },
    {'path': '/logout', 'component':LogoutUser },
    {'path': '/cart', 'component':Cart },
    {'path': '/checkout', 'component':Checkout},
    {'path': '*', 'component':NotFound}
];

export default FrontendRoute;