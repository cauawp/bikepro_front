import React from "react";
import "./FormStyles.css";

const StandartInput = ({
  inputType,
  placeholder,
  inputValue,
  inputChange,
  inputAlert,
  inputClass,
  maxLength,
}) => {
  return (
    <div className={`divInput standartDiv ${inputClass}`}>
      <label className="labelInput" htmlFor="standart">
        <input
          className="inputStandart"
          type={inputType}
          name=""
          id="standart"
          placeholder={placeholder}
          value={inputValue}
          onChange={inputChange}
          autocomplete="off"
          maxLength={maxLength}
        />
      </label>
      <p className="inputAlert">{inputAlert}</p>
    </div>
  );
};

export default StandartInput;
