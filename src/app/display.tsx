
import { StyleSheet, Text, View } from "react-native";

export default function Display() {
  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.numero}>0</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 25,
    paddingHorizontal: 10,
  },
  numero: {
    color: "#50D52D",
    fontSize: 48,
  },
});
