import React, { useState } from "react";
import Footer from "../components/adminDashbord/Footer";
import Header from "../components/adminDashbord/Header";
import Category from "../components/adminDashbord/Category";
import Products from "../components/adminDashbord/Products";
import AddProdCatButton from "../components/adminDashbord/AddProdCatButton";

function Dashborad() {
  const [page, setPage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  return (
    <div>
      <Header />
      <div className="row">
        <Category page={page} setTotalProduct={setTotalProduct} setPage={setPage} />
        <div className="col-10">
          <AddProdCatButton />
          <Products totalProduct={totalProduct} setPage={setPage} page={page} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashborad;
