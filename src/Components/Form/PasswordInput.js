import React, { useState } from "react";
import "./FormStyles.css";

//ICON
import { ReactComponent as EyeIcon } from "./imgs/eye-icon.svg";

const PasswordInput = ({
  inputTitle,
  labelClass,
  placeHolder,
  inputValue,
  inputChange,
}) => {
  const [typeInput, setTypeInput] = useState(true);

  const changeInput = (e) => {
    e.preventDefault();

    setTypeInput(!typeInput);
  };

  return (
    <div className="divInput registerNameDiv">
      <p>{inputTitle}</p>
      <label className={`labelInput ${labelClass}`} htmlFor="passRegister">
        <input
          className="inputAcount"
          type={typeInput ? "password" : "text"}
          name=""
          id="passRegister"
          placeholder={placeHolder}
          value={inputValue}
          onChange={inputChange}
        />
        <button
          onClick={changeInput}
          className={`toggleShowPassBtn ${!typeInput ? "passwordShow" : ""}`}
        >
          <EyeIcon />
        </button>
      </label>
    </div>
  );
};

export default PasswordInput;
