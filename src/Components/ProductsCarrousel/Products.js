import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Products.css";

import ProductFeedbacks from "./ProductFeedbacks";
import ProductFavorited from "./ProductFavorited";

import ProductsArray from "./ProductsArray";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [colorProduct, setColorProduct] = useState([]);
  const [userId, setUserId] = useState(null);

  //USERID
  const storedUserId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3333/products");
        const productsData = response.data;
        setProducts(
          productsData.filter(
            (product) => product.productCategory === props.Category
          )
        );
        setColorProduct(new Array(productsData.length).fill(0));
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
        setProducts([]);
      }
    }

    fetchProducts();

    if (storedUserId) {
      setUserId(storedUserId);
    }
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
        const porcentagem =
          (parseFloat(product.productLastPrice) /
            parseFloat(product.productPrice)) *
          100;

        const desconto = -(100 - porcentagem);

        return (
          <div className="product" key={product._id} ref={props.ProductProps}>
            <div className="productContainer">
              <div className="productImgContent">
                <div className="imgContainer">
                  {Object.entries(product.productColors).map(
                    ([color, images], indexObject) => (
                      <React.Fragment key={color}>
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
                      </React.Fragment>
                    )
                  )}
                </div>
                {isNaN(desconto) ? (
                  ""
                ) : (
                  <p className="offerProduct">{`${desconto.toFixed(
                    0
                  )}% OFF`}</p>
                )}
                <ProductFavorited productId={product._id}></ProductFavorited>
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
                    <div className="productAssesments">
                      <ProductFeedbacks
                        productId={product._id}
                      ></ProductFeedbacks>
                    </div>
                  </div>
                  <div className="infoRight">
                    {product.productLastPrice !== null &&
                    product.productLastPrice !== "" ? (
                      <div className="productLastPrice">
                        R${product.productLastPrice}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="productPrice">R${product.productPrice}</div>
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
