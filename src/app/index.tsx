
import Display from "@/components/calculator/display";
import Rejilla from "@/components/calculator/rejilla";
import RejillaCientifica from "@/components/calculator/rejilla-cientifica";
import { useCalculator } from "@/hooks/useCalculator";
import { useDoublePress } from "@/hooks/useDoublePress";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { valor, operacion, presionar } = useCalculator();
  const abrirJuego = useDoublePress(() => router.push("/flappy-bird"));
  const [modoCientifico, setModoCientifico] = useState(false);
  const vibrar = useHapticFeedback();

  const presionarTecla = (texto: string) => {
    vibrar(texto === "=" ? "success" : texto === "C" ? "error" : "selection");
    presionar(texto);
  };

  const cambiarModo = (cientifico: boolean) => {
    if (cientifico !== modoCientifico) {
      vibrar("selection");
      setModoCientifico(cientifico);
    }
  };

  return (
    <View style={estilos.fondo}>
      <View style={estilos.arriba}>
        <Text style={estilos.icono}>◷</Text>
        <View style={estilos.acciones}>
          <Text style={estilos.icono}>▱</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir juego"
            onPress={abrirJuego}
            style={estilos.botonJuego}
          >
            <Text style={estilos.icono}>☑</Text>
          </Pressable>
        </View>
      </View>

      <Display operacion={operacion} resultado={valor} />

      <View style={estilos.teclado}>
        <View style={estilos.selector}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Teclado normal"
            accessibilityState={{ selected: !modoCientifico }}
            onPress={() => cambiarModo(false)}
            style={[estilos.opcionModo, !modoCientifico && estilos.modoActivo]}
          >
            <Text style={[estilos.textoModo, !modoCientifico && estilos.textoActivo]}>
              123
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Teclado científico"
            accessibilityState={{ selected: modoCientifico }}
            onPress={() => cambiarModo(true)}
            style={[estilos.opcionModo, modoCientifico && estilos.modoActivo]}
          >
            <Text style={[estilos.textoModo, modoCientifico && estilos.textoActivo]}>
              ƒx
            </Text>
          </Pressable>
        </View>
        {modoCientifico ? (
          <RejillaCientifica onPress={presionarTecla} />
        ) : (
          <Rejilla onPress={presionarTecla} />
        )}
      </View>
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
    alignItems: "center",
    paddingHorizontal: 15,
    height: 40,
  },
  acciones: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  botonJuego: {
    minWidth: 32,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icono: {
    color: "#50D52D",
    fontSize: 23,
  },
  teclado: {
    gap: 8,
  },
  selector: {
    alignSelf: "center",
    flexDirection: "row",
    padding: 3,
    borderRadius: 18,
    backgroundColor: "#071704",
  },
  opcionModo: {
    width: 58,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  modoActivo: {
    backgroundColor: "#24551B",
  },
  textoModo: {
    color: "#70C5CC",
    fontSize: 14,
    fontWeight: "700",
  },
  textoActivo: {
    color: "#FFFFFF",
  },
});
