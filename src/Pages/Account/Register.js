import React, { useEffect, useState } from "react";
import axios from "axios";
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
      const response = await axios.post("http://localhost:3333/users", {
        name: name,
        username: email,
        password: password,
      });

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
      <h1>Olá, bem vindo! Crie sua conta</h1>
      <form onSubmit={handleSubmit}>
        <NameInput
          inputTitle="Insira seu nome"
          inputValue={name}
          inputChange={(e) => setName(e.target.value)}
        />
        <EmailInput
          inputTitle="Insira seu email"
          inputValue={email}
          inputChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          labelClass={passwordsMatch === false ? "error" : ""}
          inputTitle="Crie sua senha"
          inputValue={password}
          inputChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          labelClass={passwordsMatch === false ? "error" : ""}
          inputTitle="Confirme sua senha"
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
      </form>
    </>
  );
};

export default Register;
