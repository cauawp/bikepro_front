import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//ICONS
import { ReactComponent as MoreIcon } from "./imgs/more-icon.svg";
import { ReactComponent as LessIcon } from "./imgs/less-icon.svg";

const ToggleQuantity = ({ userId, initialQuantity, productIdentifier }) => {
  const [productQnt, setProductQnt] = useState(initialQuantity || 1);
  const navigate = useNavigate();

  const handleAddQnt = async () => {
    const newQuantity = productQnt + 1;
    setProductQnt(newQuantity);
    await updateProductQuantity(newQuantity);
  };

  const handleSubQnt = async () => {
    if (productQnt > 1) {
      const newQuantity = productQnt - 1;
      setProductQnt(newQuantity);
      await updateProductQuantity(newQuantity);
    }
  };

  const updateProductQuantity = async (newQuantity) => {
    try {
      const response = await axios.patch(
        `https://bikepro-api.onrender.com/carts/${userId}`,
        {
          productIdentifier: productIdentifier,
          productQuantity: newQuantity,
        },
        { headers: { authentication: userId } }
      );
      navigate(0);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="productQuantityInput">
        <button onClick={handleSubQnt}>
          <LessIcon />
        </button>
        <span>{productQnt}</span>
        <button onClick={handleAddQnt}>
          <MoreIcon />
        </button>
      </div>
    </>
  );
};

export default ToggleQuantity;
