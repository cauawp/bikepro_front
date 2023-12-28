import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Form/PasswordInput";
import EmailInput from "../../Components/Form/EmailInput";
import Button from "../../Components/Form/Button";
import Checkbox from "../../Components/Form/Checkbox";

// ... (importações e código anterior)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controle de loading
  const navigate = useNavigate();

  const handleCheckboxChange = (isChecked) => {
    setRemember(isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Ativar o estado de carregamento

      const response = await axios.post("http://localhost:3333/sessions", {
        username: email,
        password: password,
      });

      console.log("Resposta do servidor:", response.data);
      const userId = response.data.user._id;

      if (remember === true) {
        localStorage.setItem("userId", userId);
      } else {
        sessionStorage.setItem("userId", userId);
      }

      navigate(-1);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    } finally {
      setIsLoading(false); // Desativar o estado de carregamento, independentemente do resultado
    }
  };

  return (
    <>
      <h1 className="title1">
        Olá, bem-vindo! Faça seu login ou crie uma conta
      </h1>
      <form onSubmist={handleSubmit}>
        <EmailInput
          inputTitle="Insira seu email"
          inputValue={email}
          inputChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          inputTitle="Insira sua senha"
          inputValue={password}
          inputChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Checkbox
            inputTitle="Lembrar de mim"
            checkboxCheked={remember}
            checkboxChange={handleCheckboxChange}
          />
          <p>
            Esqueceu sua senha? <Link to="/resetar-senha">Clique aqui</Link>
          </p>
        </div>
        <Button
          buttonTitle={isLoading ? "Carregando..." : "Entrar"}
          btnType="submit"
          disabled={isLoading} // Desabilitar o botão enquanto estiver carregando
        />
      </form>
      <p>
        Não tem conta? <Link to="/cadastro">Crie agora</Link>
      </p>
    </>
  );
};

export default Login;
