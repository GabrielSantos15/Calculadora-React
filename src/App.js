import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [valorTela, setValorTela] = useState("");
  const [resultado, setResultado] = useState(0);
  const [acumulador, setAcumador] = useState(0);
  const [operado, setOperado] = useState(false);

  const Tela = (valor, res) => {
    return (
      <output className="tela">
        <h2 className="telaOper">{valor}</h2>
        <p className="telaRes">{res}</p>
      </output>
    );
  };

  const btn = (label, onClick, classeExtra = "") => {
    return (
      <button className={`btn ${classeExtra}`} onClick={onClick}>
        {label}
      </button>
    );
  };

  // funções
const addDigitoTela = (d) => {
  const operadores = ["+", "-", "*", "/"];
  const ultimoChar = valorTela.slice(-1);

  if (operadores.includes(d)) {
    if (operadores.includes(ultimoChar)) {
      setValorTela(valorTela.slice(0, -1) + d);
      return;
    }
  }

  if (d === "." && valorTela.endsWith(".")) return; 

  if (operadores.includes(d) && operado) {
    setOperado(false);
    setValorTela(resultado + d);
    return;
  }

  if (operado) {
    setValorTela(d);
    setOperado(false);
    return;
  }

  setValorTela(valorTela + d);
};

  const limparMemoria = () => {
    setOperado(false);
    setValorTela("");
    setResultado(0);
    setAcumador(0);
    return;
  };

  const Operacao = (oper) => {
    if (oper === "bs") {
      let vtela = valorTela;
      vtela = vtela.substring(0, vtela.length - 1);
      setValorTela(vtela);
      setOperado(false);
      return;
    }
    try {
      const r = eval(valorTela) || 0; // Realiza o calculo
      setAcumador(r);
      setResultado(r);
      setOperado(true);
    } catch {
      setResultado("ERROR");
    }
  };

  return (
    <>
      <div className="container">
        <h3>Calculadora</h3>
        {Tela(valorTela, resultado)}
        <div className="botoes">
          {btn("AC", limparMemoria, "btnOper")}
          {btn("(", () => addDigitoTela("("), "btnOper")}
          {btn(")", () => addDigitoTela(")"), "btnOper")}
          {btn("/", () => addDigitoTela("/"), "btnOper")}
          {btn("7", () => addDigitoTela("7"))}
          {btn("8", () => addDigitoTela("8"))}
          {btn("9", () => addDigitoTela("9"))}
          {btn("x", () => addDigitoTela("*"), "btnOper")}
          {btn("4", () => addDigitoTela("4"))}
          {btn("5", () => addDigitoTela("5"))}
          {btn("6", () => addDigitoTela("6"))}
          {btn("-", () => addDigitoTela("-"), "btnOper")}
          {btn("1", () => addDigitoTela("1"))}
          {btn("2", () => addDigitoTela("2"))}
          {btn("3", () => addDigitoTela("3"))}
          {btn("+", () => addDigitoTela("+"), "btnOper")}
          {btn("0", () => addDigitoTela("0"))}
          {btn(",", () => addDigitoTela("."))}
          {btn("<", () => Operacao("bs"), "btnOper")}
          {btn("=", () => Operacao("="), "btnResult")}
        </div>
      </div>
    </>
  );
}
