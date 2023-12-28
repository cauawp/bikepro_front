import React from "react";
import "./FormStyles.css";

const Button = ({ disabled, btnType, onClick, buttonTitle }) => {
  return (
    <button
      className={`buttonForm ${disabled ? "disabled" : ""}`}
      type={btnType}
      disabled={disabled}
      onClick={onClick}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
