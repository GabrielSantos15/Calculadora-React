import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const operadores = ["+", "-", "*", "/"];

export default function App() {
  const [valorTela, setValorTela] = useState("");
  const [resultado, setResultado] = useState(0);
  const [operado, setOperado] = useState(false);

  const telaRef = useRef(null);

  useEffect(() => {
    if (telaRef.current) {
      telaRef.current.scrollLeft = telaRef.current.scrollWidth;
    }
  }, [valorTela]);

  const Tela = (valor, res) => {
    return (
      <output className="tela">
        <h2 className="telaOper" ref={telaRef}>
          {valor}
        </h2>
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
      if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }

    const ultimoChar = valorTela.slice(-1);

    if (operadores.includes(d)) {
      if (valorTela === "") return;
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
    if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    setOperado(false);
    setValorTela("");
    setResultado(0);
    return;
  };

  const Operacao = (oper) => {
      if ("vibrate" in navigator) {
      navigator.vibrate(100);
    }
    
    if (oper === "bs") {
      let vtela = valorTela;
      vtela = vtela.substring(0, vtela.length - 1);
      setValorTela(vtela);
      setOperado(false);
      return;
    }

    let expressao = valorTela.trim();

    // Remove último caractere se for operador
    if (operadores.includes(expressao.slice(-1))) {
      expressao = expressao.slice(0, -1);
    }

    try {
      // eslint-disable-next-line no-eval
      const r = eval(expressao) || 0;

      // Deixa o resultado em  notação científica 
      const resultadoFormatado =
        Math.abs(r) >= 1e10 ? r.toExponential(6) : r;

      setResultado(resultadoFormatado);
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
          {btn(
            <FontAwesomeIcon icon={faDeleteLeft} />,
            () => Operacao("bs"),
            "btnOper"
          )}
          {btn("=", () => Operacao("="), "btnResult")}
        </div>
      </div>
    </>
  );
}
