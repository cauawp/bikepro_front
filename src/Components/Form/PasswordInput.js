import React, { useState } from "react";
import "./FormStyles.css";

const PasswordInput = (props) => {
  const [typeInput, setTypeInput] = useState(true);

  const changeInput = (e) => {
    e.preventDefault();

    setTypeInput(!typeInput);
  };

  return (
    <div className="divInput registerNameDiv">
      <p>{props.inputTitle}</p>
      <label
        className={`labelInput ${props.labelClass}`}
        htmlFor="passRegister"
      >
        <input
          className="inputAcount"
          type={typeInput ? "password" : "text"}
          name=""
          id="passRegister"
          placeholder="Senha"
          value={props.inputValue}
          onChange={props.inputChange}
        />
        <button onClick={changeInput}>EYEICON</button>
      </label>
    </div>
  );
};

export default PasswordInput;
