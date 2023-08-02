import React, { useState, useEffect, useRef } from "react";
import "./ProductsCarrousel.css";
import Products from "./Products";

const ProductsCarrousel = () => {
  return (
    <>
      <div className="productsContainer">
        <div className="carrousel">
          <div className="carrouselTop">
            <h1 className="title2">As bicicletas mais vendidas</h1>
            <div className="carrouselControll">
              <button>PREV</button>
              <button>NEXT</button>
            </div>
          </div>
          <div className="carrouselProducts">
            <div className="carrouselContainer">
              <Products></Products>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCarrousel;
