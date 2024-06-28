import React, { useState } from "react";

import "./CartPage.css";

const CalcFreight = ({ setValueFreight, updateSubtotal }) => {
  const [cep, setCep] = useState("");

  const handleCepChange = (event) => {
    let novoCep = event.target.value;

   
    novoCep = novoCep.replace(/[^\d]/g, "").slice(0, 8);


    if (novoCep.length >= 6) {
      novoCep = novoCep.slice(0, 5) + "-" + novoCep.slice(5);
    }


    if (novoCep.length === 9) {
      setCep(novoCep);
      calcularFrete(novoCep);
    } else {

      setValueFreight(0);
      setCep(novoCep);
    }
  };

  const calcularFrete = (cep) => {

    const valorFrete = Math.random() * 50 + 10;

    setValueFreight(valorFrete.toFixed(2));


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
