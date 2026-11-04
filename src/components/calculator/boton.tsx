import { Pressable, StyleSheet, Text } from "react-native";

type BotonProps = {
  texto: string;
  colorTexto?: string;
  colorFondo?: string;
  onPress?: () => void;
  doble?: boolean;
  compacto?: boolean;
};

export default function Boton({
  texto,
  colorTexto = "#50D52D",
  colorFondo = "#071704",
  onPress,
  doble = false,
  compacto = false,
}: BotonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        estilos.boton,
        doble && estilos.botonDoble,
        compacto && estilos.botonCompacto,
        {
          backgroundColor: pressed ? "#24551B" : colorFondo,
          transform: [{ scale: pressed ? 0.92 : 1 }],
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text
        style={[
          estilos.texto,
          compacto && estilos.textoCompacto,
          { color: colorTexto },
        ]}
      >
        {texto}
      </Text>
    </Pressable>
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
  botonDoble: {
    flex: 2.12,
  },
  botonCompacto: {
    height: 46,
    borderRadius: 16,
  },
  texto: {
    fontSize: 28,
  },
  textoCompacto: {
    fontSize: 16,
  },
});