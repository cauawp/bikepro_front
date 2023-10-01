import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ProductsCarrousel.css";
import Products from "./Products";

const ProductsCarrousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const ProductRef = useRef();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3333/products");
        const productsData = response.data;
        setProducts(
          productsData.filter(
            (product) => product.productCategory === props.productCategory
          )
        );
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const a = ProductRef.current?.getBoundingClientRect().width;
    setPosition(-(a * activeIndex - -32 * activeIndex));
  }, [activeIndex]);

  const prevSlide = (e) => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(products.length - 1);
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
      <div className="productsContainer">
        <div className="carrousel">
          <div className="carrouselTop">
            <h1 className="title2">As bicicletas mais vendidas</h1>
            <div className="carrouselControll">
              <button onClick={prevSlide}>PREV</button>
              <button onClick={nextSlide}>NEXT</button>
            </div>
          </div>
          <div className="carrouselProducts">
            <div
              className="carrouselContainer"
              style={{ transform: `translate(${position}px)` }}
            >
              <Products
                ProductProps={ProductRef}
                Category={props.productCategory}
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
