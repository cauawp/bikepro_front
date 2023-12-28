import React from "react";
import "./FormStyles.css";

const CartInput = ({
  inputValue,
  inputChange,
  btnTitle,
  placeholder,
  cartInputTitle,
}) => {
  return (
    <div className="cartInput">
      <p>
        <h1 className="subtitle2">{cartInputTitle}</h1>
      </p>
      <div className="cartInputContainer">
        <label className="labelInput" htmlFor="text">
          <input
            className="inputAcount"
            type="text"
            name=""
            id="text"
            value={inputValue}
            onChange={inputChange}
            placeholder={placeholder}
          />
        </label>
        <button className="btn">{btnTitle}</button>
      </div>
    </div>
  );
};

export default CartInput;
