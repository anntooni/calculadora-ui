import { evaluarExpresion } from "@/lib/evaluarExpresion";
import { useState } from "react";

function formatearNumero(valor: number) {
  if (!Number.isFinite(valor)) return "Error";
  const resultado = Number(valor.toPrecision(12));
  return String(Object.is(resultado, -0) ? 0 : resultado);
}

export function useCalculator() {
  const [valor, setValor] = useState("0");
  const [operacion, setOperacion] = useState("");
  const [expresion, setExpresion] = useState("");
  const [resultadoMostrado, setResultadoMostrado] = useState(false);

  const reiniciar = () => {
    setValor("0");
    setOperacion("");
    setExpresion("");
    setResultadoMostrado(false);
  };

  const actualizarExpresion = (nuevaExpresion: string) => {
    setExpresion(nuevaExpresion);
    setOperacion(nuevaExpresion);
    setResultadoMostrado(false);
  };

  const presionar = (texto: string) => {
    if (/^\d$/.test(texto)) {
      let base = resultadoMostrado ? "" : expresion;
      const multiplicaImplicitamente = /[)\]}πe!%]$/.test(base);
      if (multiplicaImplicitamente) base += "×";
      const iniciaNumero =
        resultadoMostrado ||
        base === "" ||
        /[+−×÷*/^(\[]$/.test(base) ||
        multiplicaImplicitamente;
      actualizarExpresion(base + texto);
      setValor(
        iniciaNumero || valor === "Error"
          ? texto
          : valor === "0"
            ? texto
            : valor + texto,
      );
      return;
    }

    if (texto === ".") {
      let base = resultadoMostrado ? "" : expresion;
      const numeroActual = base.match(/(?:\d+(?:\.\d*)?|\.\d+)$/)?.[0];
      if (numeroActual?.includes(".")) return;
      const multiplicaImplicitamente = /[)\]}πe!%]$/.test(base);
      if (multiplicaImplicitamente) base += "×";
      const iniciaNumero = base === "" || /[+−×÷*/^(\[]$/.test(base);
      actualizarExpresion(base + (iniciaNumero ? "0." : "."));
      setValor(iniciaNumero ? "0." : valor + ".");
      return;
    }

    if (texto === "C") {
      reiniciar();
      return;
    }

    if (texto === "⌫") {
      if (resultadoMostrado) {
        const nuevoValor = valor.slice(0, -1) || "0";
        setValor(nuevoValor);
        setOperacion("");
        setExpresion(nuevoValor === "0" ? "" : nuevoValor);
        setResultadoMostrado(false);
      } else if (valor === "Error") {
        reiniciar();
      } else {
        const nuevaExpresion = /(sin|cos|tan|log|ln|sqrt|abs)\($/.test(expresion)
          ? expresion.replace(/(sin|cos|tan|log|ln|sqrt|abs)\($/, "")
          : expresion.slice(0, -1);
        setExpresion(nuevaExpresion);
        setOperacion(nuevaExpresion);
        setValor(nuevaExpresion.match(/(?:\d+(?:\.\d*)?|\.\d+)$/)?.[0] ?? "0");
      }
      return;
    }

    if (texto === "=" && expresion) {
      try {
        const resultado = formatearNumero(evaluarExpresion(expresion));
        setValor(resultado);
        setOperacion(`${expresion} =`);
      } catch {
        setValor("Error");
        setOperacion(`${expresion} =`);
      }
      setExpresion("");
      setResultadoMostrado(true);
      return;
    }

    if (texto === "±") {
      if (valor !== "0" && valor !== "Error") {
        const nuevoValor = formatearNumero(-Number(valor));
        const base = resultadoMostrado ? "" : expresion;
        const nuevaExpresion = base.replace(/(?:\d+(?:\.\d*)?|\.\d+)$/, nuevoValor);
        actualizarExpresion(nuevaExpresion || nuevoValor);
        setValor(nuevoValor);
      }
      return;
    }

    const esOperador = /^[+−×÷*/^]$/.test(texto);
    let base = resultadoMostrado
      ? esOperador || ["^2", "!", "%"].includes(texto)
        ? valor
        : ""
      : expresion;

    if (resultadoMostrado && !esOperador && !["^2", "!", "%"].includes(texto)) {
      setValor("0");
    }

    const esPrefijo = /^(sin|cos|tan|log|ln|sqrt|abs)\($/.test(texto);
    const abreGrupo = texto === "(" || texto === "[";
    const esConstante = texto === "π" || texto === "e";
    if ((esPrefijo || abreGrupo || esConstante) && /[\d)\]}πe!%]$/.test(base)) {
      base += "×";
    }

    if (esOperador && /[+−×÷*/^]$/.test(base)) {
      base = base.slice(0, -1);
    }

    actualizarExpresion(base + texto);
  };

  return { valor, operacion, presionar };
}