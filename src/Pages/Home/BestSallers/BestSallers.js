import React, { useState, useEffect, useRef } from "react";
import ProductsCarrousel from "../../../Components/ProductsCarrousel/ProductsCarrousel";
import "./BestSallers.css";

const BestSallers = () => {
  return (
    <>
      <section id="bestSallers">
        <ProductsCarrousel
          productCategory="Bicicleta"
          productCarrouselTitle={"As bicicletas mais vendidas"}
        />
      </section>
    </>
  );
};

export default BestSallers;
