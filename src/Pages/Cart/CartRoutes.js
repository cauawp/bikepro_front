import React from "react";
import { Route, Routes } from "react-router-dom";
import CartPageModel from "./CartPageModel";
import CartFinally from "./CartFinally";

const CartRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={CartPageModel} />
        <Route path="/:cartId" Component={CartFinally} />
      </Routes>
    </>
  );
};

export default CartRoutes;
