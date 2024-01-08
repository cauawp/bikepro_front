import React, { useState } from "react";
import axios from "axios";
import EmailInput from "../../Components/Form/EmailInput";
import Button from "../../Components/Form/Button";

const ResetPass = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Chame a API backend para solicitar redefinição de senha usando axios
      const response = await axios.post(
        "http://localhost:3333/reset-password",
        {
          username: email,
        }
      );

      console.log(response.data.message); // ou faça o que for necessário com a resposta
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error.message);
    }
  };

  return (
    <div>
      <h1 className="title1">Redefinir Senha</h1>
      <form onSubmit={handleSubmit}>
        <EmailInput
          inputTitle="Insira seu email"
          inputValue={email}
          inputChange={(e) => setEmail(e.target.value)}
        />
        <Button
          buttonTitle={"Enviar E-mail de Redefinição"}
          btnType={"submit"}
        />
      </form>
    </div>
  );
};

export default ResetPass;
