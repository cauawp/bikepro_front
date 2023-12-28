import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "./Products.css";

import ProductFeedbacks from "./ProductFeedbacks";
import ProductFavorited from "./ProductFavorited";

import ProductsArray from "./ProductsArray";

import LoadingModal from "../LoadingModal";

const Products = ({ Category, ProductProps }) => {
  const [products, setProducts] = useState([]);
  const [colorProduct, setColorProduct] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  //USERID
  const storedUserId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");

  function shuffleProducts(products) {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3333/products");
        const productsData = response.data;

        const filteredProducts =
          Category === null || Category === undefined || Category === ""
            ? productsData
            : productsData.filter(
                (product) => product.productCategory === Category
              );

        // Embaralhar a array de produtos
        const shuffledProducts = shuffleProducts([...filteredProducts]);

        setProducts(shuffledProducts);
        setColorProduct(new Array(productsData.length).fill(0));
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
        setLoading(false);
        setProducts([]);
      }
    }

    fetchProducts();

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [Category]);

  const colorClick = (productIndex, colorIndex) => {
    setColorProduct((prevColorProduct) => {
      const newColorProduct = [...prevColorProduct];
      newColorProduct[productIndex] = colorIndex;
      return newColorProduct;
    });
  };

  return (
    <>
      {loading && <LoadingModal />}
      {products.map((product, productIndex, array) => {
        const porcentagem =
          (parseFloat(product.productLastPrice) /
            parseFloat(product.productPrice)) *
          100;

        const desconto = -(100 - porcentagem);
        return (
          <div className="product" key={product._id} ref={ProductProps}>
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
                {isNaN(desconto) || product.productLastPrice === 0 ? (
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
                <Link
                  to={`/products/${product._id}`}
                  className="productInfoContainer"
                >
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
                    product.productLastPrice !== 0 &&
                    product.productLastPrice !== "" ? (
                      <div className="productLastPrice">
                        R${product.productLastPrice}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="productPrice">
                      R${product.productPriceDemo}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Products;
