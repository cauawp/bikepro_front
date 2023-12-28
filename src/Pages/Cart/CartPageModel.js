import "./CartPage.css";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Cart from "./Cart";
import ProductsCarrousel from "../../Components/ProductsCarrousel/ProductsCarrousel";

const ProductPageModel = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Header headerClass="sticky" />
      <Cart />
      <section id="youLike">
        <ProductsCarrousel
          //productCategory="Acessorio"
          productCarrouselTitle={"Você também pode gostar"}
        />
      </section>
      <Footer />
    </>
  );
};

export default ProductPageModel;
