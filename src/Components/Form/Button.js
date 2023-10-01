import React from "react";
import "./FormStyles.css";

const Button = (props) => {
  return (
    <button className="buttonForm" type={props.btnType}>
      {props.buttonTitle}
    </button>
  );
};

export default Button;
