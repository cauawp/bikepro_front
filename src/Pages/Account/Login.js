import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Form/PasswordInput";
import EmailInput from "../../Components/Form/EmailInput";
import Button from "../../Components/Form/Button";
import Checkbox from "../../Components/Form/Checkbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate(); // Obtendo o objeto history

  const handleCheckboxChange = (isChecked) => {
    setRemember(isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3333/sessions", {
        username: email,
        password: password,
      });

      console.log("Resposta do servidor:", response.data);
      const userId = response.data.user._id;

      //FAZER O IF ELSE SESSIONSTORAGE E LOCALSTORAGE DEPOIS
      if (remember === true) {
        localStorage.setItem("userId", userId);
      } else {
        sessionStorage.setItem("userId", userId);
      }

      navigate(`/`);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  return (
    <>
      <h1>Olá, bem vindo! Faça seu login ou crie uma conta</h1>
      <form onSubmit={handleSubmit}>
        <EmailInput
          inputTitle="Insira seu email"
          inputValue={email}
          inputChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          inputTitle="Crie sua senha"
          inputValue={password}
          inputChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox
          inputTitle="Lembrar de mim"
          checkboxCheked={remember}
          checkboxChange={handleCheckboxChange}
        />
        <Button buttonTitle="Entrar" btnType="submit" />
      </form>
    </>
  );
};

export default Login;
