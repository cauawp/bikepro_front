import React from "react";
import ProductsCarrousel from "../../../Components/ProductsCarrousel/ProductsCarrousel";

import "./BikeStarter.css";

const BikeStarter = () => {
  return (
    <section id="bikeStarter">
      <ProductsCarrousel
        productCategory="Bicicleta"
        productCarrouselTitle={"Bicicletas para iniciantes"}
      />
    </section>
  );
};

export default BikeStarter;
