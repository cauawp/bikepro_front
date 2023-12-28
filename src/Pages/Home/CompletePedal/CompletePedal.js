import React from "react";
import ProductsCarrousel from "../../../Components/ProductsCarrousel/ProductsCarrousel";

import "./CompletePedal.css";

const CompletePedal = () => {
  return (
    <section id="completePedal">
      <ProductsCarrousel
        productCategory="Acessorio"
        productCarrouselTitle={"Para seu pedal fica mais completo"}
      />
    </section>
  );
};

export default CompletePedal;
