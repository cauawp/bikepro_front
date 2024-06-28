import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductPageModel from "./ProductPageModel";

const ProductRoutes = () => {

  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Routes>
        <Route path="/" Component={ProductPageModel} />
        <Route path="/:productId" Component={ProductPageModel} />
      </Routes>
    </>
  );
};

export default ProductRoutes;
