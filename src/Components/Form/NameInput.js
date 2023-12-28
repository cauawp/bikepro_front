import React from "react";
import "./FormStyles.css";

const NameInput = ({
  inputTitle,
  inputValue,
  inputChange,
  inputAlert,
  placeHolder,
}) => {
  return (
    <div className="divInput registerNameDiv">
      <p>{inputTitle}</p>
      <label className="labelInput" htmlFor="nameRegister">
        <input
          className="inputAcount"
          type="text"
          name=""
          id="nameRegister"
          placeholder={placeHolder}
          value={inputValue}
          onChange={inputChange}
        />
      </label>
      <p className="inputAlert">{inputAlert}</p>
    </div>
  );
};

export default NameInput;
