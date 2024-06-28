import { useParams, Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

import "../ProductPage.css";

import ProductFeedbacks from "../../../Components/ProductsCarrousel/ProductFeedbacks";
import ProductFavorited from "../../../Components/ProductsCarrousel/ProductFavorited";

import ProductPreview from "../Components/ProductPreview";
import AddCartBtn from "../Components/AddCartBtn";

const ProductHero = () => {
  const findProductById = (product) => {
    return product?._id === productId;
  };

  const { productId } = useParams();
  const [productIds, setProductIds] = useState([]);

  const productFinded = productIds.find(findProductById) || {};
  const productIdFinded = productFinded._id;

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const colorClick = (color) => {
    setSelectedColor(color);
  };

  const sizeClick = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    axios
      .get("https://bikepro-api.onrender.com/products")
      .then((response) => {
        setProductIds(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const productObject = {
    id: productIdFinded,
    color: selectedColor,
    size: selectedSize,
  };

  const sendSelecteds = async (e) => {
    console.log("clicou");
    console.log("enviado os dados: ", productObject);

    /*let storedProducts = JSON.parse(localStorage.getItem("productCart")) || [];

    if (!Array.isArray(storedProducts)) {
      storedProducts = [];
    }

    storedProducts.push(productObject);

    localStorage.setItem("productCart", JSON.stringify(storedProducts));
    */
    console.log(productObject);
    console.log(JSON.stringify(productObject));

    const storedUserId =
      sessionStorage.getItem("userId") || localStorage.getItem("userId");

    try {
      const response = await axios.post(
        `https://bikepro-api.onrender.com/carts/${storedUserId}`,
        {
          products: [
            {
              product: productObject.id,
              productColor: productObject.color,
              productSize: productObject.size,
            },
          ],
        },
        { headers: { authentication: storedUserId } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section id="productHero">
        {productId !== productIdFinded ? (
          <h1>
            Produto não encontrado{" "}
            <Link to="/">Voltar para página inicial</Link>
          </h1>
        ) : (
          <>
            <div className="productPageHero container">
              <div className="productHeroLeft">
                <div className="heroSticky">
                  <ProductPreview
                    colorClick={colorClick}
                    product={productFinded}
                    selectedColor={selectedColor}
                  />
                </div>
              </div>
              <div className="productHeroRight">
                <div className="productHeroInfo">
                  <ul className="heroRightColumn">
                    <span className="heroTop">
                      <h1 className="title2">{productFinded.productTitle}</h1>
                      <ProductFavorited
                        favoriteClass="likeBtn"
                        productId={productIdFinded}
                      ></ProductFavorited>
                    </span>
                    <li>
                      <span className="heroPriceContent">
                        <h3>R${productFinded.productPriceDemo}</h3>
                        <span className="produtHeroStars">
                          <ProductFeedbacks productId={productId} />
                        </span>
                      </span>
                    </li>
                    <li>
                      <p className="sub-title1">{productFinded.productTitle}</p>
                      <p
                        className={`productDescription paragraph1 ${
                          !showFullDescription ? "gradient" : ""
                        }`}
                      >
                        {showFullDescription
                          ? productFinded.productDescription
                          : `${productFinded.productDescription.slice(
                              0,
                              200
                            )}...`}
                      </p>
                      {!showFullDescription && (
                        <button
                          className="readMoreBtn"
                          onClick={toggleDescription}
                        >
                          Ler Mais
                        </button>
                      )}
                    </li>
                    <li>
                      <p className="sub-title1">Cores</p>
                      <span className="productHeroColors">
                        {Object.keys(productFinded.productColors).map(
                          (color) => (
                            <div
                              key={color}
                              className={`color color-${color} ${
                                color === selectedColor ? "active" : ""
                              }`}
                              style={{
                                backgroundColor: `#${productFinded.productColors[color][0].colorHex}`,
                              }}
                              onClick={() => colorClick(color)}
                            ></div>
                          )
                        )}
                      </span>
                    </li>
                    <li>
                      <p className="sub-title1">Tamanho</p>
                      <span className="productHeroSizes">
                        {Object.entries(productFinded.productColors).map(
                          ([color, objects], indexObject) => (
                            <React.Fragment key={color}>
                              {color === selectedColor &&
                                objects.map((obj, index) => (
                                  <React.Fragment key={index}>
                                    {obj.size.map((item, index) => (
                                      <React.Fragment key={index}>
                                        <span
                                          className={`paragraph2 ${
                                            item.sizeAllow === selectedSize
                                              ? "active"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            sizeClick(item.sizeAllow)
                                          }
                                        >
                                          {item.sizeAllow}
                                        </span>
                                      </React.Fragment>
                                    ))}
                                  </React.Fragment>
                                ))}
                            </React.Fragment>
                          )
                        )}
                      </span>
                      <Link to="" className="paragraph2">
                        Qual o meu tamanho?
                      </Link>
                    </li>
                    <div className="heroButtons">
                      <AddCartBtn onClick={sendSelecteds}></AddCartBtn>
                      <Link className="btn2" to="">
                        Agendar um test drive
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProductHero;
