import { StyleSheet, Pressable, Text, View, ScrollView } from "react-native";

export default function Tabs(props) {
  const options = ["Pomodoro", "Descanso Corto", "Descanso Largo"];
  const { seleccion, setSeleccion, setTime } = props;

  function cambiarSeleccion(index) {
    setSeleccion(index); // Cambia la pestaña activa

    // Cambia el tiempo base según la opción elegida
    if (index === 0) setTime(25 * 60);      // Pomodoro = 25 minutos
    else if (index === 1) setTime(5 * 60);   // Descanso corto = 5 minutos
    else if (index === 2) setTime(15 * 60);  // Descanso largo = 15 minutos
  }

  return (
    <View style={styles.container}>
      {/* ScrollView para permitir desplazamiento horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((opcion, index) => (
          <Pressable
            key={index} // Clave única para cada pestaña
            style={[
              styles.pressable, // Estilo base del botón
              seleccion === index && styles.seleccionado, // Si está seleccionada, aplica estilo extra
            ]}
            onPress={() => cambiarSeleccion(index)} // Cuando se presiona, cambia la selección
          >
            <Text style={styles.texto}>{opcion}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  pressable: {
    marginRight: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    backgroundColor: "#cfcfcf", // Fondo gris claro

    // Sombra para efecto 3D
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5, // Android
  },
  seleccionado: {
    backgroundColor: "#a4a4a4", // Fondo gris más oscuro cuando se selecciona
  },
  texto: {
    fontSize: 20,
    color: "white", // Texto blanco
    fontWeight: "bold",

    // Simulación de borde negro
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});
