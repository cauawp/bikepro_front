import React, { useEffect, useState } from "react";
import ToggleQuantity from "./ToggleQuantity";
import DeleteProduct from "./DeleteProduct";
import CartInput from "../../Components/Form/CartInput";
import axios from "axios";
import { Link } from "react-router-dom";

import LoadingModal from "../../Components/LoadingModal"; // Importe o componente de loading
import ConfirmModal from "../../Components/ConfirmModal";
import CalcFreight from "./CalcFreight";

import ProceedBtn from "../../Components/Form/Button";

import "./CartPage.css";

//ICONS
import { ReactComponent as EditIcon } from "./imgs/edit-icon.svg";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [valueTotal, setValueTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [changeConfirmed, setChangeConfirmed] = useState(false);
  const [valueFreight, setValueFreight] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [productIds, setProductIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controle de loading

  const storedUserId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3333/carts/${storedUserId}`,
          { headers: { authentication: storedUserId } }
        );

        const fetchedCartProducts = response.data.products;
        const productIdentifiers = fetchedCartProducts.map(
          (productCart) => productCart.productIdentifier
        );
        setProductIds(productIdentifiers);

        // Update the product quantity in the cart based on API data
        const updatedCartProducts = fetchedCartProducts.map((productCart) => {
          const updatedProductQuantity = productCart.productQuantity; // Use API data directly

          return {
            ...productCart,
            productQuantity: updatedProductQuantity,
          };
        });

        setCartProducts(updatedCartProducts);

        const total = response.data.products.reduce((acc, productCart) => {
          const productPrice = parseFloat(
            productCart?.product?.productPrice || "0"
          );
          const productQuantity = productCart?.productQuantity || 1;
          return acc + productPrice * productQuantity;
        }, 0);

        setValueTotal(total);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 10000);

    fetchCartProducts();

    return () => clearTimeout(timeoutId);
  }, []);

  const handleDeleteProduct = (productIdentifier) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter(
        (product) => product.productIdentifier !== productIdentifier
      )
    );
  };

  const productCounts = {};

  cartProducts.forEach((productCart) => {
    const productIdentifier = productCart?.product?._id;
    if (productIdentifier in productCounts) {
      productCounts[productIdentifier]++;
    } else {
      productCounts[productIdentifier] = 1;
    }
  });

  const updateSubtotal = (freightValue) => {
    // Atualiza o subtotal somando o frete ao valor total dos produtos
    setSubtotal(valueTotal + parseFloat(freightValue));
  };

  const handleCepChange = (newCep) => {
    // Atualiza o subtotal quando o CEP muda
    updateSubtotal(valueTotal, valueFreight, newCep);
  };

  const subTotal = parseFloat(valueTotal) + parseFloat(valueFreight);

  const handleProceed = async () => {
    try {
      setIsLoading(true); // Ativar o estado de carregamento

      const response = await axios.patch(
        `http://localhost:3333/carts/${storedUserId}`,
        { valueTotal: valueTotal },
        { headers: { authentication: storedUserId } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Desativar o estado de carregamento, independentemente do resultado
    }
  };

  return (
    <>
      {loading && <LoadingModal />}
      <section id="cart" className="container">
        <h1 className="title2">Seu carrinho</h1>
        <div className="cartContainer">
          <ul className="cartList">
            {cartProducts.length === 0 ? (
              <>
                <p>
                  <h1>Seu carrinho está vazio!</h1>
                  <p>
                    Navegue pelas categorias da loja ou faça uma busca pelo seu
                    produto.
                  </p>
                </p>
              </>
            ) : (
              cartProducts.map((productCart, i) => {
                const product = productCart?.product;
                const productColor = productCart?.productColor;
                const productSize = productCart?.productSize;
                const imgSource = product.productColors?.[productColor][0].img;
                const hexColor =
                  product.productColors?.[productColor][0].colorHex;
                const productIdentifier = productCart?.productIdentifier;

                return (
                  <div className="productCart" key={i}>
                    <div className="cartProductImg">
                      <img src={imgSource} alt="" />
                    </div>
                    <div className="cartProductInfo">
                      <ul className="listCart">
                        <li className="columnCart">
                          <span className="sub-title2">
                            {product.productTitle}
                          </span>
                          <span className="sub-title2">
                            R$ {product.productPriceDemo}
                          </span>
                        </li>
                        <li className="columnCart">
                          <span>
                            <p className="colorCartPreview paragraph1">
                              <span>Cor: {productColor}</span>
                              <span
                                className="colorPreview"
                                style={{ background: `#${hexColor}` }}
                              ></span>
                            </p>
                            <p className="paragraph1">Tamanho: {productSize}</p>
                          </span>
                          <span>
                            <ToggleQuantity
                              userId={storedUserId}
                              initialQuantity={productCart.productQuantity}
                              productIdentifier={productIdentifier}
                            />
                          </span>
                        </li>
                        <li className="columnCart">
                          <span className="paragraph2">
                            Editar <EditIcon />
                          </span>
                          <span>
                            <DeleteProduct
                              confirmModal={changeConfirmed}
                              userId={storedUserId}
                              productIdentifier={productIdentifier}
                              onDelete={handleDeleteProduct}
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            )}
          </ul>
          {cartProducts.length === 0 ? (
            <></>
          ) : (
            <div className="cartInfo">
              <div className="freightContainer">
                <CalcFreight
                  setValueFreight={setValueFreight}
                  updateSubtotal={handleCepChange}
                />
              </div>
              <h1>Resumo do pedido</h1>
              <div className="cartProducts">
                {cartProducts.map((productCart) => {
                  const product = productCart.product;
                  const productCount = productCart.productQuantity;

                  return (
                    <div className="cartProduct" key={product._id}>
                      <span>
                        {product.productTitle}{" "}
                        <span className="">(x{productCount})</span>
                      </span>
                      <span>
                        {/* Use a quantidade atualizada para calcular o preço do produto */}
                        {parseFloat(
                          product.productPrice * productCount
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                  );
                })}
                <p className="freight">
                  <span>Frete</span>
                  <span>
                    {parseFloat(valueFreight).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </p>
              </div>
              <div className="subTotal">
                <span className="sub-title2">Subtotal</span>
                <span className="sub-title1">
                  {subTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <ProceedBtn
                buttonTitle={isLoading ? "Carregando..." : "Prosseguir"}
                btnType="submit"
                disabled={isLoading} // Desabilitar o botão enquanto estiver carregando
                onClick={handleProceed}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
