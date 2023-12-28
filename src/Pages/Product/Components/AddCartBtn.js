import React from "react";
import { ReactComponent as Cart } from "../imgs/shopping_cart.svg";

const AddCartBtn = ({ onClick }) => {
  return (
    <>
      <button
        className="btn"
        style={{ cursor: "pointer", width: "100%" }}
        onClick={onClick}
      >
        <Cart></Cart>
        Adicionar ao carrinho
      </button>
    </>
  );
};

export default AddCartBtn;
