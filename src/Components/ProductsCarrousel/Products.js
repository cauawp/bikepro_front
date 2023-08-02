import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Products.css";

import ProductsArray from "./ProductsArray";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [colorProduct, setColorProduct] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3333/products");
        const productsData = response.data;
        setProducts(productsData);

        // Initialize colorProduct state for each product with 0 (default index)
        setColorProduct(new Array(productsData.length).fill(0));
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
        setProducts([]); // Limpar a lista em caso de erro
      }
    }

    fetchProducts();
  }, []);

  const handleColorClick = (productIndex, colorIndex) => {
    setColorProduct((prevColorProduct) => {
      const newColorProduct = [...prevColorProduct];
      newColorProduct[productIndex] = colorIndex;
      return newColorProduct;
    });
  };

  return (
    <>
      {ProductsArray.map((product, productIndex, array) => {
        return (
          <div className="product" key={product._id}>
            <div className="productContainer">
              <div className="productImgContent">
                <div className="imgContainer">
                  {Object.entries(product.productColors).map(
                    ([color, images], indexObject) => (
                      <div key={color}>
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image.img}
                            alt={`${color} - Image ${index + 1}`}
                            className={`thumbnailImg ${color} thumb-${
                              index + 1
                            } ${
                              indexObject === colorProduct[productIndex]
                                ? "active"
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                    )
                  )}
                  {Object.entries(product.productColors).map(
                    ([color, images], indexObject) => {
                      console.log(indexObject);
                      return (
                        <div
                          className={`color color-${color}`}
                          onClick={() =>
                            handleColorClick(productIndex, indexObject)
                          }
                        >
                          {color}
                        </div>
                      );
                    }
                  )}
                </div>
                <button>Favorite</button>
                <button>Compare</button>
                <div className="productChangeColor"></div>
              </div>
              <div className="productInfo">
                <div className="productInfoContainer">
                  <div className="infoLeft">
                    <div className="productName"></div>
                    <div className="productAssesments"></div>
                  </div>
                  <div className="infoRight">
                    <div className="productLastPrice">
                      {product.productLastPrice}
                    </div>
                    <div className="productPrice">{product.productPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Products;
