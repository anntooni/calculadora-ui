import { useFlappyBird } from "@/hooks/useFlappyBird";
import { useRouter } from "expo-router";
import { Fragment, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FlappyBird() {
  const router = useRouter();
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const { game, flap, restart, birdX, birdRadius, pipeWidth, gapHeight } =
    useFlappyBird(bounds.width, bounds.height);
  return (
    <View style={estilos.pantalla}>
      <View style={estilos.encabezado}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver a la calculadora"
          onPress={() => router.back()}
          style={estilos.volver}
        >
          <Text style={estilos.volverTexto}>‹</Text>
        </Pressable>
        <Text style={estilos.titulo}>FLAPPY / CALC</Text>
        <View style={estilos.puntuacion}>
          <Text style={estilos.puntuacionEtiqueta}>SCORE</Text>
          <Text style={estilos.puntuacionValor}>{game.score}</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Toca para hacer volar el pájaro"
        onPress={flap}
        onLayout={(event) =>
          setBounds({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          })
        }
        style={estilos.campo}
      >
        <View style={estilos.rejillaFondo} />
        {bounds.height > 0 && (
          <>
            {game.pipes.map((pipe) => {
              const gapTop = pipe.gapCenter - gapHeight / 2;
              const gapBottom = pipe.gapCenter + gapHeight / 2;
              return (
                <Fragment key={pipe.id}>
                  <View
                    style={[
                      estilos.tubo,
                      { left: pipe.x, width: pipeWidth, top: 0, height: gapTop },
                    ]}
                  >
                    <Text style={estilos.operador}>+</Text>
                  </View>
                  <View
                    style={[
                      estilos.tubo,
                      {
                        left: pipe.x,
                        width: pipeWidth,
                        top: gapBottom,
                        bottom: 0,
                      },
                    ]}
                  >
                    <Text style={estilos.operador}>×</Text>
                  </View>
                </Fragment>
              );
            })}
            <View
              style={[
                estilos.pajaro,
                {
                  left: birdX - birdRadius,
                  top: game.birdY - birdRadius,
                  width: birdRadius * 2,
                  height: birdRadius * 2,
                  borderRadius: birdRadius,
                },
              ]}
            >
              <Text style={estilos.pajaroTexto}>÷</Text>
            </View>
          </>
        )}
        {game.status !== "playing" && (
          <View style={estilos.mensaje}>
            <Text style={estilos.mensajeTitulo}>
              {game.status === "over" ? "FIN DEL JUEGO" : "LISTO?"}
            </Text>
            <Text style={estilos.mensajeAyuda}>
              {game.status === "over" ? "TOCA PARA REINTENTAR" : "TOCA PARA VOLAR"}
            </Text>
          </View>
        )}
        <View style={estilos.base}>
          <Text style={estilos.baseTexto}>0  1  2  3  4  5  6  7  8  9</Text>
        </View>
      </Pressable>

      <View style={estilos.pie}>
        <Text style={estilos.pieTexto}>TAP = +1 IMPULSO</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Reiniciar partida"
          onPress={restart}
          style={estilos.reiniciar}
        >
          <Text style={estilos.reiniciarTexto}>↻</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  encabezado: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  volver: {
    width: 42,
    height: 42,
    justifyContent: "center",
  },
  volverTexto: {
    color: "#50D52D",
    fontSize: 38,
    lineHeight: 42,
  },
  titulo: {
    color: "#50D52D",
    fontSize: 16,
    fontWeight: "700",
  },
  puntuacion: {
    minWidth: 46,
    alignItems: "flex-end",
  },
  puntuacionEtiqueta: {
    color: "#70C5CC",
    fontSize: 9,
    fontWeight: "700",
  },
  puntuacionValor: {
    color: "#50D52D",
    fontSize: 22,
    fontVariant: ["tabular-nums"],
  },
  campo: {
    flex: 1,
    minHeight: 260,
    overflow: "hidden",
    position: "relative",
    borderColor: "#50D52D",
    borderWidth: 1,
    backgroundColor: "#030803",
  },
  rejillaFondo: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "none",
    opacity: 0.12,
    borderColor: "#50D52D",
    borderWidth: 1,
  },
  tubo: {
    position: "absolute",
    pointerEvents: "none",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#071704",
    borderColor: "#50D52D",
    borderWidth: 2,
  },
  operador: {
    color: "#70C5CC",
    fontSize: 20,
    fontWeight: "700",
  },
  pajaro: {
    position: "absolute",
    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#50D52D",
  },
  pajaroTexto: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "900",
  },
  mensaje: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  mensajeTitulo: {
    color: "#50D52D",
    fontSize: 20,
    fontWeight: "700",
  },
  mensajeAyuda: {
    color: "#70C5CC",
    fontSize: 11,
    fontWeight: "600",
  },
  base: {
    position: "absolute",
    pointerEvents: "none",
    left: 0,
    right: 0,
    bottom: 0,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#071704",
  },
  baseTexto: {
    color: "#50D52D",
    fontSize: 10,
    opacity: 0.8,
  },
  pie: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pieTexto: {
    color: "#70C5CC",
    fontSize: 10,
    fontWeight: "700",
  },
  reiniciar: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  reiniciarTexto: {
    color: "#50D52D",
    fontSize: 25,
  },
});