import React from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const storedUserId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      sessionStorage.removeItem("userId");
      localStorage.removeItem("userId");

      navigate(0);
    }
  };

  return (
    <>
      {storedUserId !== null ? (
        <button onClick={handleLogout}>SAIR</button>
      ) : (
        <></>
      )}

      <div>{storedUserId}</div>
    </>
  );
};

export default Account;
