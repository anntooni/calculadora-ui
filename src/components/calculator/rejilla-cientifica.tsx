import { StyleSheet, View } from "react-native";
import Boton from "./boton";

type RejillaCientificaProps = {
  onPress: (texto: string) => void;
};

const filas: Array<Array<[string, string, boolean?]>> = [
  [
    ["sin°", "sin("],
    ["cos°", "cos("],
    ["tan°", "tan("],
    ["log", "log("],
    ["ln", "ln("],
  ],
  [
    ["√", "sqrt("],
    ["x²", "^2"],
    ["xʸ", "^"],
    ["π", "π"],
    ["e", "e"],
    ["n!", "!"],
  ],
  [
    ["(", "("],
    [")", ")"],
    ["[", "["],
    ["]", "]"],
    ["{", "{"],
    ["}", "}"],
  ],
  [
    ["7", "7"],
    ["8", "8"],
    ["9", "9"],
    ["⌫", "⌫"],
    ["÷", "÷"],
  ],
  [
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["C", "C"],
    ["×", "×"],
  ],
  [
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["%", "%"],
    ["−", "−"],
  ],
  [
    ["0", "0", true],
    [".", "."],
    ["±", "±"],
    ["+", "+"],
    ["=", "="],
  ],
];

export default function RejillaCientifica({ onPress }: RejillaCientificaProps) {
  return (
    <View style={estilos.teclado}>
      {filas.map((fila, indiceFila) => (
        <View key={indiceFila} style={estilos.fila}>
          {fila.map(([etiqueta, valor, doble]) => (
            <Boton
              key={etiqueta}
              texto={etiqueta}
              compacto
              doble={doble}
              colorTexto={"+-−×÷^=!%".includes(etiqueta) ? "#70C5CC" : "#50D52D"}
              colorFondo={etiqueta === "=" ? "#30666A" : undefined}
              onPress={() => onPress(valor)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  teclado: {
    gap: 7,
    paddingBottom: 10,
  },
  fila: {
    flexDirection: "row",
    gap: 7,
  },
});