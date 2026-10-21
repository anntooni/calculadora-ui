import { Pressable, StyleSheet, Text } from "react-native";

type BotonProps = {
  texto: string;
  colorTexto?: string;
  colorFondo?: string;
  onPress?: () => void;
};

export default function Boton({
  texto,
  colorTexto = "#50D52D",
  colorFondo = "#071704",
  onPress,
}: BotonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        estilos.boton,
        {
          backgroundColor: pressed ? "#24551B" : colorFondo,
          transform: [{ scale: pressed ? 0.92 : 1 }],
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={[estilos.texto, { color: colorTexto }]}>
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
  texto: {
    fontSize: 28,
  },
});
