
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Rejilla from "./components/rejilla";
import Display from "./display";

type Operador = "+" | "−" | "×" | "÷";

function formatearNumero(valor: number) {
  if (!Number.isFinite(valor)) return "Error";
  return String(Number(valor.toPrecision(12)));
}

export default function Index() {
  const [valor, setValor] = useState("0");
  const [operacion, setOperacion] = useState("");
  const [valorGuardado, setValorGuardado] = useState<number | null>(null);
  const [operador, setOperador] = useState<Operador | null>(null);
  const [esperandoOperando, setEsperandoOperando] = useState(false);
  const [resultadoMostrado, setResultadoMostrado] = useState(false);

  const reiniciar = () => {
    setValor("0");
    setOperacion("");
    setValorGuardado(null);
    setOperador(null);
    setEsperandoOperando(false);
    setResultadoMostrado(false);
  };

  const calcular = (izquierdo: number, derecho: number, op: Operador) => {
    switch (op) {
      case "+":
        return izquierdo + derecho;
      case "−":
        return izquierdo - derecho;
      case "×":
        return izquierdo * derecho;
      case "÷":
        return derecho === 0 ? NaN : izquierdo / derecho;
    }
  };

  const presionar = (texto: string) => {
    if (/^\d$/.test(texto)) {
      if (valor === "Error" || resultadoMostrado) {
        setValor(texto);
        setOperacion("");
        setValorGuardado(null);
        setOperador(null);
      } else if (esperandoOperando) {
        setValor(texto);
      } else {
        setValor((actual) => (actual === "0" ? texto : actual + texto));
      }
      setEsperandoOperando(false);
      setResultadoMostrado(false);
      return;
    }

    if (texto === ".") {
      if (valor === "Error" || resultadoMostrado || esperandoOperando) {
        setValor("0.");
        setOperacion(resultadoMostrado ? "" : operacion);
        if (resultadoMostrado) {
          setValorGuardado(null);
          setOperador(null);
        }
      } else if (!valor.includes(".")) {
        setValor((actual) => actual + ".");
      }
      setEsperandoOperando(false);
      setResultadoMostrado(false);
      return;
    }

    if (texto === "C") {
      reiniciar();
      return;
    }

    if (texto === "⌫") {
      if (valor === "Error") {
        reiniciar();
      } else {
        setValor((actual) => {
          const nuevo = actual.slice(0, -1);
          return nuevo === "" || nuevo === "-" ? "0" : nuevo;
        });
        setOperacion("");
        setEsperandoOperando(false);
        setResultadoMostrado(false);
      }
      return;
    }

    if (texto === "%") {
      if (valor !== "Error") {
        setValor(formatearNumero(Number(valor) / 100));
        setEsperandoOperando(false);
        setResultadoMostrado(false);
      }
      return;
    }

    if (["+", "−", "×", "÷"].includes(texto)) {
      const nuevoOperador = texto as Operador;
      let nuevoValor = Number(valor);

      if (valor === "Error") {
        reiniciar();
        return;
      }

      if (valorGuardado !== null && operador && !esperandoOperando) {
        const resultado = calcular(valorGuardado, nuevoValor, operador);
        const formateado = formatearNumero(resultado);
        setValor(formateado);
        nuevoValor = Number(formateado);
        setOperacion(`${formateado} ${nuevoOperador}`);
      } else {
        setOperacion(`${valor} ${nuevoOperador}`);
      }

      setValorGuardado(nuevoValor);
      setOperador(nuevoOperador);
      setEsperandoOperando(true);
      setResultadoMostrado(false);
      return;
    }

    if (texto === "=" && valorGuardado !== null && operador && !esperandoOperando) {
      const expresion = `${formatearNumero(valorGuardado)} ${operador} ${valor}`;
      const resultado = formatearNumero(
        calcular(valorGuardado, Number(valor), operador),
      );
      setValor(resultado);
      setOperacion(`${expresion} =`);
      setValorGuardado(null);
      setOperador(null);
      setEsperandoOperando(false);
      setResultadoMostrado(true);
    }
  };

  return (
    <View style={estilos.fondo}>
      <View style={estilos.arriba}>
        <Text style={estilos.icono}>◷</Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}></Text>
        <Text style={estilos.icono}>▱</Text>
        <Text style={estilos.icono}>☑</Text>
      </View>

      <Display operacion={operacion} resultado={valor} />

      <Rejilla onPress={presionar} />

    </View>
  );
}

const estilos = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 45,
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  arriba: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 40,
  },
  icono: {
    color: "#50D52D",
    fontSize: 23,
  },
  barra: {
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  linea: {
    width: 110,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#777777",
  },
});
