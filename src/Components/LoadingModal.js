import React from "react";
import "./LoadingModal.css"; // Importe o arquivo de estilo para o Loading

const LoadingModal = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingModal;
