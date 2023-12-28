import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../Components/ConfirmModal";

const Account = () => {
  const storedUserId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleExit = async () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    try {
      sessionStorage.removeItem("userId");
      localStorage.removeItem("userId");

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
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          msg={"Tem certeza que deseja sair da sua conta?"}
        />
      )}
      {storedUserId !== null ? (
        <button onClick={handleExit}>SAIR</button>
      ) : (
        <></>
      )}

      <div>{storedUserId}</div>
    </>
  );
};

export default Account;
