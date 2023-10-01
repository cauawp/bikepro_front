import React from "react";
import "./FormStyles.css";

const NameInput = (props) => {
  return (
    <div className="divInput registerNameDiv">
      <p>{props.inputTitle}</p>
      <label className="labelInput" htmlFor="nameRegister">
        <input
          className="inputAcount"
          type="text"
          name=""
          id="nameRegister"
          placeholder=""
          value={props.inputValue}
          onChange={props.inputChange}
        />
      </label>
      <p className="inputAlert">{props.inputAlert}</p>
    </div>
  );
};

export default NameInput;
