import "./ProductPage.css";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProductHero from "./ProductHero";

const ProductPageModel = () => {
  return (
    <>
      <Header headerClass="sticky" />
      <ProductHero />
      <Footer />
    </>
  );
};

export default ProductPageModel;
