import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductPageModel from "./ProductPageModel";

const ProductRoutes = () => {
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
