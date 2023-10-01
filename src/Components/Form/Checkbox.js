import React from "react";
import { ReactComponent as CheckIcon } from "./imgs/check-icon.svg";

const Checkbox = (props) => {
  const handleCheckboxChange = () => {
    props.checkboxChange(!props.checkboxCheked);
  };

  return (
    <>
      <div
        className={`divInput checkboxDiv ${
          props.checkboxCheked ? "checked" : ""
        }`}
      >
        <input
          type="checkbox"
          name=""
          id="checkbox"
          value={props.inputValue}
          checked={props.checkboxCheked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox" className="checkboxLabel">
          <span className="checkbox">
            <span className="checkboxIcon">
              <CheckIcon></CheckIcon>
            </span>
          </span>

          {props.inputTitle}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
