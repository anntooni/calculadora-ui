
import { StyleSheet, View } from "react-native";
import Boton from "./boton";

type RejillaProps = {
  onPress: (texto: string) => void;
};

export default function Rejilla({ onPress }: RejillaProps) {
  return (
    <View style={estilos.teclado}>
      <View style={estilos.fila}>
        <Boton texto="C" colorTexto="#D93636" onPress={() => onPress("C")} />
        <Boton texto="⌫" onPress={() => onPress("⌫")} />
        <Boton texto="%" onPress={() => onPress("%")} />
        <Boton texto="÷" colorTexto="#70C5CC" onPress={() => onPress("÷")} />
      </View>

      <View style={estilos.fila}>
        <Boton texto="7" onPress={() => onPress("7")} />
        <Boton texto="8" onPress={() => onPress("8")} />
        <Boton texto="9" onPress={() => onPress("9")} />
        <Boton texto="×" colorTexto="#70C5CC" onPress={() => onPress("×")} />
      </View>

      <View style={estilos.fila}>
        <Boton texto="4" onPress={() => onPress("4")} />
        <Boton texto="5" onPress={() => onPress("5")} />
        <Boton texto="6" onPress={() => onPress("6")} />
        <Boton texto="−" colorTexto="#70C5CC" onPress={() => onPress("−")} />
      </View>

      <View style={estilos.fila}>
        <Boton texto="1" onPress={() => onPress("1")} />
        <Boton texto="2" onPress={() => onPress("2")} />
        <Boton texto="3" onPress={() => onPress("3")} />
        <Boton texto="+" colorTexto="#70C5CC" onPress={() => onPress("+")} />
      </View>

      <View style={estilos.fila}>
        <Boton texto="0" doble onPress={() => onPress("0")} />
        <Boton texto="." onPress={() => onPress(".")} />
        <Boton
          texto="="
          colorFondo="#30666A"
          colorTexto="white"
          onPress={() => onPress("=")}
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
