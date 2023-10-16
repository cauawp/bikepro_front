import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import "./ProductPage.css";

import ProductFeedbacks from "../../Components/ProductsCarrousel/ProductFeedbacks";

import ProductPreview from "./ProductPreview";

const ProductHero = () => {
  const findProductById = (product) => {
    return product?._id === productId;
  };

  const { productId } = useParams();
  const [productIds, setProductIds] = useState([]);

  const productFinded = productIds.find(findProductById) || {};
  const productIdFinded = productFinded._id;

  const [selectedColor, setSelectedColor] = useState("");

  const colorClick = (color) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3333/products")
      .then((response) => {
        setProductIds(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                <ProductPreview
                  colorClick={colorClick}
                  product={productFinded}
                  selectedColor={selectedColor}
                />
              </div>
              <div className="productHeroRight">
                <div className="productHeroInfo">
                  <h1>{productFinded.productTitle}</h1>
                  <span>
                    <h3>{productFinded.productPrice}</h3>
                    <span className="produtHeroStars">
                      <ProductFeedbacks productId={productId} />
                    </span>
                  </span>
                  <p>{productFinded.productTitle}</p>
                  <p>
                    A Strive CF 8 foi projetada para enfrentar trilhos técnicos
                    e corridas de enduro. Basta apertar um botão e ajustar a
                    geometria da bicicleta entre o modo de subida fácil e a
                    configuração de descida extremamente rápida para a
                    combinação definitiva de desempenho e diversão
                  </p>
                </div>
                <div>
                  <div className="productSelectColor">
                    {Object.keys(productFinded.productColors).map((color) => (
                      <div
                        key={color}
                        className={`color color-${color} ${
                          color === selectedColor ? "active" : ""
                        }`}
                        style={{
                          backgroundColor: `#${productFinded.productColors[color][0].colorHex}`,
                          width: "100px",
                          height: "100px",
                        }}
                        onClick={() => colorClick(color)}
                      ></div>
                    ))}
                  </div>
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
