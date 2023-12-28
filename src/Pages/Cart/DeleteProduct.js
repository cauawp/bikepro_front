import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../Components/ConfirmModal";

import { ReactComponent as BinIcon } from "./imgs/bin-icon.svg";

const DeleteProduct = ({ userId, productIdentifier, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3333/carts/${userId}/${productIdentifier}`,
        {
          headers: { authentication: userId },
        }
      );

      navigate(0);
    } catch (error) {
      console.log(error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <button className="paragraph2 deleteProductBtn" onClick={handleDelete}>
        Remover
        <BinIcon />
      </button>
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          msg={"Tem certeza que deseja remover o produto do seu carrinho?"}
        />
      )}
    </>
  );
};

export default DeleteProduct;
