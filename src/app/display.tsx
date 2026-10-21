import { StyleSheet, Text, View } from "react-native";

export default function Display() {
  return (
    <View style={estilos.contenedor}>
      <View style={estilos.operacion}>
        <Text style={estilos.textoOperacion}>
          125 + 75
        </Text>
      </View>

      <View style={estilos.linea} />

      <View style={estilos.resultado}>
        <Text style={estilos.textoResultado}>
          200
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  operacion: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  textoOperacion: {
    color: "#50D52D",
    fontSize: 24,
    opacity: 0.7,
  },
  linea: {
    width: "100%",
    height: 1,
    backgroundColor: "#50D52D",
    opacity: 0.5,
  },
  resultado: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 12,
  },
  textoResultado: {
    color: "#50D52D",
    fontSize: 52,
    fontWeight: "300",
  },
});