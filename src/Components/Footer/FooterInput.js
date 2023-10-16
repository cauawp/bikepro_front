import React from "react";
import "./Footer.css";

import { ReactComponent as SendIcon } from "./imgs/send-icon.svg";

const FooterInput = () => {
  return (
    <>
      <div className="footerInputDiv">
        <label htmlFor="emailFooter">
          <input
            className="footerInput"
            type="text"
            name=""
            id="emailFooter"
            placeholder="Insira seu e-mail"
          />
        </label>
        <button>
          <SendIcon></SendIcon>
        </button>
      </div>
    </>
  );
};

export default FooterInput;
