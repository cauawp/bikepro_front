import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PasswordInput from "../../Components/Form/PasswordInput";
import EmailInput from "../../Components/Form/EmailInput";
import NameInput from "../../Components/Form/NameInput";
import Button from "../../Components/Form/Button";
import Notify from "../../Components/Notify/Notify";
import NotificationContainer from "../../Components/Notify/NotificationContainer";
import Checkbox from "../../Components/Form/Checkbox";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [remember, setRemember] = useState(false);

  const handleCheckboxChange = (isChecked) => {
    setRemember(isChecked);
  };

  useEffect(() => {
    if (passwordsMatch === false) {
      const timer = setTimeout(() => {
        setPasswordsMatch(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [passwordsMatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (name,
      email,
      password,
      confirmPassword === null || name,
      email,
      password,
      confirmPassword === "" || !name,
      !email,
      !password,
      !confirmPassword)
    ) {
      setNotifications([
        ...notifications,
        { notifyMsg: "Preencha todos os campos", isVisible: true },
      ]);
      return;
    }

    if (confirmPassword !== password) {
      setPasswordsMatch(false);
      setNotifications([
        ...notifications,
        { notifyMsg: "Senhas não coincidem", isVisible: true },
      ]);
      return;
    } else {
      setPasswordsMatch(true);
      setNotifications([]);
    }

    try {
      const response = await axios.post("https://bikepro-api.onrender.com/users", {
        name: name,
        username: email,
        password: password,
      });

      setNotifications([
        ...notifications,
        { notifyMsg: "Conta criada com sucesso!", isVisible: true },
      ]);

      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  const handleNotificationClose = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  return (
    <>
      <h1 className="title1">Olá, bem vindo! Crie sua conta</h1>
      <form onSubmit={handleSubmit}>
        <NameInput
          inputTitle="Insira seu nome"
          inputValue={name}
          placeHolder={"Nome"}
          inputChange={(e) => setName(e.target.value)}
        />
        <EmailInput
          inputTitle="Insira seu email"
          inputValue={email}
          placeHolder={"Email"}
          inputChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          labelClass={passwordsMatch === false ? "error" : ""}
          inputTitle="Crie sua senha"
          placeHolder={"Senha"}
          inputValue={password}
          inputChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          labelClass={passwordsMatch === false ? "error" : ""}
          inputTitle="Confirme sua senha"
          placeHolder={"Senha"}
          inputValue={confirmPassword}
          inputChange={(e) => setConfirmPassword(e.target.value)}
        />
        <NotificationContainer
          notifications={notifications}
          onClose={handleNotificationClose}
        />
        <Checkbox
          inputTitle="Lembrar de mim"
          checkboxCheked={remember}
          checkboxChange={handleCheckboxChange}
        />
        <p className="inputAlert">{props.inputAlert}</p>
        <Button buttonTitle="Criar conta" btnType="submit" />
        <p className="toggleSign paragraph1">
          Já tem conta? <Link to="/login">Clique aqui</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
