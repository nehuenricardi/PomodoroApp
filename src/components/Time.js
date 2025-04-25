import { StyleSheet, Text, View } from "react-native";

export default function Time({ time }) {
  // Función para formatear los segundos como mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{formatTime(time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cfcfcf", // Fondo gris más claro
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 15,

    // Sombra para efecto 3D
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, // Android
  },
  texto: {
    fontSize: 50,
    color: "white",             // Letras blancas
    fontWeight: "bold",

    // Simulación de borde negro
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1.5,
  }
});
