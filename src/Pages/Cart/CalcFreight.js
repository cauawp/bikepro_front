import React, { useState } from "react";

import "./CartPage.css";

const CalcFreight = ({ setValueFreight, updateSubtotal }) => {
  const [cep, setCep] = useState("");

  const handleCepChange = (event) => {
    let novoCep = event.target.value;

    // Remova caracteres não numéricos e limite o comprimento do CEP
    novoCep = novoCep.replace(/[^\d]/g, "").slice(0, 8);

    // Adicione automaticamente o traço (travessão) no sexto caractere
    if (novoCep.length >= 6) {
      novoCep = novoCep.slice(0, 5) + "-" + novoCep.slice(5);
    }

    // Atualiza o estado apenas quando o CEP tem exatamente 8 dígitos
    if (novoCep.length === 9) {
      setCep(novoCep);
      calcularFrete(novoCep);
    } else {
      // Se não tiver 8 dígitos, redefine o valor do frete para 0
      setValueFreight(0);
      setCep(novoCep);
    }
  };

  const calcularFrete = (cep) => {
    // Simulação de cálculo de frete
    // Substitua esta lógica com o cálculo real do frete
    const valorFrete = Math.random() * 50 + 10;

    setValueFreight(valorFrete.toFixed(2));

    // Chama a função para atualizar o subtotal no componente pai (Cart)
    updateSubtotal(valorFrete);
  };

  return (
    <>
      <h1>Calcular frete</h1>
      <input
        className="cep cepInput"
        type="text"
        placeholder="Insira seu CEP"
        value={cep}
        onChange={handleCepChange}
      />
    </>
  );
};

export default CalcFreight;
