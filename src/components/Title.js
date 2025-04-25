import { StyleSheet, Text, View } from "react-native";

export default function Title({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',     // Asegura que el contenido esté en fila
    justifyContent: 'center', // Centra el contenido horizontalmente
  },
  texto: {
    fontSize: 45,
    color: 'white',            // Letras blancas
    fontWeight: "bold",

    // Simulación de borde negro
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1.5,
  }
});
