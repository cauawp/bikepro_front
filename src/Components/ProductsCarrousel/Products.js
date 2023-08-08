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

  const colorClick = (productIndex, colorIndex) => {
    setColorProduct((prevColorProduct) => {
      const newColorProduct = [...prevColorProduct];
      newColorProduct[productIndex] = colorIndex;
      return newColorProduct;
    });
  };

  return (
    <>
      {products.map((product, productIndex, array) => {
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
                </div>
                <button className="favoriteBtn">Favorite</button>
                <div className="productChangeColor">
                  {Object.entries(product.productColors).map(
                    ([color, images], indexObject) => (
                      <React.Fragment key={color}>
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className={`color color-${color} ${
                              indexObject === colorProduct[productIndex]
                                ? "active"
                                : ""
                            }`}
                            style={{ backgroundColor: `#${image.colorHex}` }}
                            onClick={() =>
                              colorClick(productIndex, indexObject)
                            }
                          ></div>
                        ))}
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>
              <div className="productInfo">
                <div className="productInfoContainer">
                  <div className="infoLeft">
                    <div className="productName">{product.productTitle}</div>
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
