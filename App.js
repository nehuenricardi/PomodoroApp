import { SafeAreaView, StyleSheet, Text, View, Platform, AppState } from 'react-native';
import Title from './src/components/Title';
import Time from './src/components/Time';
import Buttonc from './src/components/Buttonc';
import Tabs from './src/components/Tabs';
import { useState, useEffect, useRef } from 'react';
import playSonido from './src/utility/playSound';
import { enviarNotificacion } from './src/utility/notificaciones';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [run, setRun] = useState(false);
  const [seleccion, setSeleccion] = useState(0);
  const colores = ["#1baf00", "#a1ba00", "#00cfc3"];

  const appState = useRef(AppState.currentState);
  const lastTimeRef = useRef(null); // ⏱ Marca de tiempo al salir

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
    const sonido = require("./assets/celebracion.mp3");

    if (run) {
      intervalo = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(intervalo);
            setRun(false);
            playSonido(sonido);
            enviarNotificacion();
            return getTiempoBase();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [run]);

  // 🎯 Manejo de AppState (foreground / background)
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === "background") {
        // Se va a segundo plano
        lastTimeRef.current = Date.now();
      }

      if (appState.current.match(/background/) && nextAppState === "active") {
        // Vuelve al primer plano
        if (run && lastTimeRef.current) {
          const now = Date.now();
          const elapsed = Math.floor((now - lastTimeRef.current) / 1000);
          setTime(prev => Math.max(prev - elapsed, 0));
        }
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
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
