import React from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ResetPass from "./ResetPass";
import SignBg from "./imgs/signBg.png";

import "./Sign.css";

const Sign = () => {
  let location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/cadastro";
  const isResetPage = location.pathname === "/resetar-senha";

  return (
    <section id="signSection">
      <div className="signContainer">
        <div className="signLeft container">
          {isLoginPage && <Login />}
          {isRegisterPage && <Register />}
          {isResetPage && <ResetPass />}
        </div>
        <div className="signRight">
          <div className="imgContainerSign">
            <img src={SignBg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sign;
