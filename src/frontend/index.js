import React from "react";
import "./assets/css/style.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import Header from "./partial/header";
import Menu from "./partial/menu";
import Slider from "./partial/slider";
import Footer from "./partial/footer";
import { Outlet } from "react-router-dom";
function Index() {
  return (
    <div className="container-fluid border-warning">
      <Header />
      <Menu />
      <Slider />
      <div className="row content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Index;
