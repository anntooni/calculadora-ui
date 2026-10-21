
import { StyleSheet, Text, View } from "react-native";

type BotonProps = {
  texto: string;
  colorTexto?: string;
  colorFondo?: string;
};

export default function Boton({
  texto,
  colorTexto = "#50D52D",
  colorFondo = "#071704",
}: BotonProps) {
  return (
    <View style={[estilos.boton, { backgroundColor: colorFondo }]}>
      <Text style={[estilos.texto, { color: colorTexto }]}>
        {texto}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  boton: {
    flex: 1,
    height: 65,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 28,
  },
});
