
import { StyleSheet, View } from "react-native";
import Boton from "./boton";

export default function Rejilla() {
  return (
    <View style={estilos.teclado}>
      <View style={estilos.fila}>
        <Boton texto="C" colorTexto="#D93636" />
        <Boton texto="⌫" />
        <Boton texto="%" />
        <Boton texto="÷" colorTexto="#70C5CC" />
      </View>

      <View style={estilos.fila}>
        <Boton texto="7" />
        <Boton texto="8" />
        <Boton texto="9" />
        <Boton texto="×" colorTexto="#70C5CC" />
      </View>

      <View style={estilos.fila}>
        <Boton texto="4" />
        <Boton texto="5" />
        <Boton texto="6" />
        <Boton texto="−" colorTexto="#70C5CC" />
      </View>

      <View style={estilos.fila}>
        <Boton texto="1" />
        <Boton texto="2" />
        <Boton texto="3" />
        <Boton texto="+" colorTexto="#70C5CC" />
      </View>

      <View style={estilos.fila}>
        <Boton texto="()" />
        <Boton texto="0" />
        <Boton texto="." />
        <Boton
          texto="="
          colorFondo="#30666A"
          colorTexto="white"
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  teclado: {
    gap: 12,
    paddingBottom: 10,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
