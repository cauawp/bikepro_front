import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ onConfirm, onCancel, msg }) => {
  return (
    <div className="confirmModal">
      <div className="confirmContainer">
        <h1>Confirmar alterações?</h1>
        <p>{msg}</p>
        <div className="confirmButtons">
          <button className="btn" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="cancelBtn" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
