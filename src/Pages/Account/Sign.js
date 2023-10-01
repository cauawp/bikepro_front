import React from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Sign = () => {
  let location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/cadastro";

  return (
    <section id="signSection">
      <div className="signContainer">
        <div className="signLeft">
          {isLoginPage && <Login />}
          {isRegisterPage && <Register />}
        </div>
        <div className="signRight"></div>
      </div>
    </section>
  );
};

export default Sign;
