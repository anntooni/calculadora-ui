
import { StyleSheet, Text, View } from "react-native";
import Rejilla from "./components/rejilla";
import Display from "./display";

export default function Index() {
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

      <Display />

      <Rejilla />

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
