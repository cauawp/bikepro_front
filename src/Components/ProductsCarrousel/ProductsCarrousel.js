import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ProductsCarrousel.css";
import Products from "./Products";

//ICONS
import { ReactComponent as ArrowLeft } from "./imgs/arrow-left.svg";
import { ReactComponent as ArrowRight } from "./imgs/arrow-right.svg";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ProductsCarrousel = ({ productCategory, productCarrouselTitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const ProductRef = useRef();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3333/products");
        const productsData = response.data;
        const filteredProducts =
          productCategory === null ||
          productCategory === undefined ||
          productCategory === ""
            ? productsData
            : productsData.filter(
                (product) => product.productCategory === productCategory
              );

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, [productCategory]);

  useEffect(() => {
    const a = ProductRef.current?.getBoundingClientRect().width;
    setPosition(-(a * activeIndex - -32 * activeIndex));
  }, [activeIndex, ProductRef.current]); // Adicione ProductRef.current como dependência

  const prevSlide = (e) => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const nextSlide = (e) => {
    if (activeIndex < products.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  return (
    <>
      <div className="productsContainer container">
        <div className="carrousel">
          <div className="carrouselTop">
            <h1 className="title2">{productCarrouselTitle}</h1>
            <div className="carrouselControll">
              <button
                onClick={prevSlide}
                className={activeIndex === 0 ? "arrowDisabled" : ""}
              >
                <ArrowLeft />
              </button>
              <button onClick={nextSlide}>
                <ArrowRight />
              </button>
            </div>
          </div>
          <div className="carrouselProducts">
            <div
              className="carrouselContainer"
              style={{ transform: `translate(${position}px)` }}
            >
              <Products
                ProductProps={ProductRef}
                Category={productCategory}
                products={products}
              ></Products>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCarrousel;
