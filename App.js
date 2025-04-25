// ...imports
import { Audio } from 'expo-av'; // Asegurate de tener este import
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import Title from './src/components/Title';
import Time from './src/components/Time';
import Buttonc from './src/components/Buttonc';
import Tabs from './src/components/Tabs';
import { useState, useEffect } from 'react';
import playSonido from './src/utility/playSound';
import { enviarNotificacion } from './src/utility/notificaciones';

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [run, setRun] = useState(false);
  const [seleccion, setSeleccion] = useState(0);
  const colores = ["#1baf00", "#a1ba00", "#00cfc3"];

  //solicitar permisos
  const solicitarPermisosNotificaciones = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        console.log("Permiso de notificación denegado");
        return;
      }
    }
    console.log("Permiso de notificación concedido");
  };

  // 🔁 Función que devuelve el tiempo base según la pestaña
  const getTiempoBase = () => {
    if (seleccion === 0) return 25 * 60;
    if (seleccion === 1) return 5 * 60;
    if (seleccion === 2) return 15 * 60;
    return 0;
  };

  useEffect(() => {
    solicitarPermisosNotificaciones();
  }, []);

  useEffect(() => {
    let intervalo = null;

    const sonido = require("./assets/celebracion.mp3")

    if (run) {
      intervalo = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(intervalo);
            setRun(false);         // Detiene el contador
            playSonido(sonido);          // Reproduce sonido
            enviarNotificacion();
            return getTiempoBase(); // ⏱ Reinicia el tiempo base automáticamente
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [run]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[
        styles.container,
        { marginTop: Platform.OS === 'android' ? 25 : 0 },
        { backgroundColor: colores[seleccion] }
      ]}>
        <Title title="Pomodoro App" />
        <Time time={time} />
        <Buttonc run={run} setRun={setRun} />
        <Tabs
          seleccion={seleccion}
          setSeleccion={setSeleccion}
          setTime={setTime}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    justifyContent: 'center',
  },
});