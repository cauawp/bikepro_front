import React from "react";
import "./FormStyles.css";

const EmailInput = ({ inputTitle, inputValue, inputChange, placeHolder }) => {
  return (
    <div className="divInput emailDiv">
      <p>{inputTitle}</p>
      <label className="labelInput" htmlFor="email">
        <input
          className="inputAcount"
          type="text"
          name=""
          id="email"
          placeholder={placeHolder}
          value={inputValue}
          onChange={inputChange}
        />
      </label>
    </div>
  );
};

export default EmailInput;
