import "./ProductPage.css";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProductHero from "./ProductHero/ProductHero";
import ProductFeedback from "./ProductFeedback/ProductFeedback";

const ProductPageModel = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Header headerClass="sticky" />
      <ProductHero />
      <ProductFeedback />
      <Footer />
    </>
  );
};

export default ProductPageModel;
