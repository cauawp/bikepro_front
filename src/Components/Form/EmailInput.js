import React from "react";
import "./FormStyles.css";

const EmailInput = (props) => {
  return (
    <div className="divInput emailDiv">
      <p>{props.inputTitle}</p>
      <label className="labelInput" htmlFor="email">
        <input
          className="inputAcount"
          type="text"
          name=""
          id="email"
          value={props.inputValue}
          onChange={props.inputChange}
        />
      </label>
    </div>
  );
};

export default EmailInput;
